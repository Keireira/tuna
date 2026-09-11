import { Matrix3, Uniform, Vector3 } from 'three';
import type { MeshPhysicalMaterial, Vector4 } from 'three';
import { FISH_AXIS_X, FISH_SPINE_STEPS } from './fish-motion';

type FishMaterialOptionsT = {
	spine: Uniform<Vector4[]>;
	hinge?: Vector3;
	rotation?: Uniform<Matrix3>;
};

/** Rz * Ry, matching the original two GLSL mat2 rotations exactly. */
export const setFishFlapRotation = (matrix: Matrix3, y: number, z: number): void => {
	const cy = Math.cos(y),
		sy = Math.sin(y),
		cz = Math.cos(z),
		sz = Math.sin(z);
	matrix.set(cz * cy, -sz, cz * sy, sz * cy, cz, sz * sy, -sy, 0, cy);
};

const deformationShader = `
	uniform vec4 fishSpine[${FISH_SPINE_STEPS + 1}];
	uniform vec3 fishHinge;
	uniform mat3 fishFlapRotation;
	uniform float fishBody;
	void fishVertex(vec3 source, vec3 sourceNormal, out vec3 deformed, out vec3 deformedNormal) {
		vec3 rest = fishFlapRotation * (source - fishHinge) + fishHinge;
		vec3 rotatedNormal = fishFlapRotation * sourceNormal;
		float along = (0.5 - rest.y) * ${FISH_SPINE_STEPS}.0;
		int segment = int(clamp(floor(along), 0.0, ${FISH_SPINE_STEPS - 1}.0));
		vec4 first = fishSpine[segment];
		vec4 delta = fishSpine[segment + 1] - first;
		vec4 frame = first + delta * (along - float(segment));
		vec4 frameDy = delta * -${FISH_SPINE_STEPS}.0;
		float crossBody = rest.x - ${FISH_AXIS_X};
		float sine = sin(frame.w), cosine = cos(frame.w);
		float widthRatio = crossBody / 0.13;
		float dome = max(0.0, 1.0 - widthRatio * widthRatio) * 0.018 * fishBody;
		float domeDx = abs(crossBody) < 0.13 ? -2.0 * crossBody * (0.018 / (0.13 * 0.13)) * fishBody : 0.0;
		float inverseThickness = inversesqrt(rest.z * rest.z + 0.0001);
		float profile = rest.z * inverseThickness;
		float profileDz = 0.0001 * inverseThickness * inverseThickness * inverseThickness;
		deformed = frame.xyz + vec3(cosine * crossBody, sine * crossBody, rest.z + profile * dome);
		// Columns of the exact piecewise Jacobian in the rotated rest frame.
		vec3 dx = vec3(cosine, sine, profile * domeDx);
		vec3 dy = frameDy.xyz + vec3(-sine * crossBody * frameDy.w, cosine * crossBody * frameDy.w, 0.0);
		vec3 dz = vec3(0.0, 0.0, 1.0 + profileDz * dome);
		// The cofactor is inverse-transpose up to a scalar removed by normalize.
		deformedNormal = normalize(cross(dy, dz) * rotatedNormal.x + cross(dz, dx) * rotatedNormal.y + cross(dx, dy) * rotatedNormal.z);
	}
`;

/** Same palette/light treatment as before, with one vertex evaluation instead of seven. */
export const finishFishMaterial = (
	material: MeshPhysicalMaterial,
	options: FishMaterialOptionsT
): MeshPhysicalMaterial => {
	const hinge = new Uniform(options.hinge ?? new Vector3());
	const rotation = options.rotation ?? new Uniform(new Matrix3());
	const body = new Uniform(options.hinge ? 0 : 1);
	material.onBeforeCompile = (shader) => {
		shader.fragmentShader = shader.fragmentShader.replace(
			'#include <opaque_fragment>',
			`
			float tileLight = 0.7 + 0.3 * max(dot(normal, normalize(vec3(-0.3, 0.4, 1.0))), 0.0);
			outgoingLight = diffuseColor.rgb * tileLight + min(totalSpecular, vec3(0.012));
			#include <opaque_fragment>
			`
		);
		shader.uniforms.fishSpine = options.spine;
		shader.uniforms.fishHinge = hinge;
		shader.uniforms.fishFlapRotation = rotation;
		shader.uniforms.fishBody = body;
		shader.vertexShader = shader.vertexShader
			.replace('#include <common>', `#include <common>\n${deformationShader}`)
			.replace(
				'#include <beginnormal_vertex>',
				`
				#include <beginnormal_vertex>
				vec3 fishPosition, fishNormal;
				fishVertex(position, objectNormal, fishPosition, fishNormal);
				objectNormal = fishNormal;
			`
			)
			.replace(
				'#include <begin_vertex>',
				`
				#include <begin_vertex>
				transformed = fishPosition;
			`
			);
	};
	material.customProgramCacheKey = () => 'uha-spine-analytic-vertex-colors-v1';
	return material;
};
