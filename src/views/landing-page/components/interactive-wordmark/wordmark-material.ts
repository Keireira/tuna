import { MeshPhysicalMaterial, Uniform } from 'three';

/** Shared glass material; one palette clock for all three letters. */
export const createWordmarkMaterial = () => {
	const material = new MeshPhysicalMaterial({
		color: 0xffffff,
		transmission: 0.93,
		toneMapped: false,
		thickness: 0.14,
		ior: 1.43,
		roughness: 0.018,
		metalness: 0,
		clearcoat: 0,
		clearcoatRoughness: 0.18,
		specularIntensity: 0.5,
		envMapIntensity: 0.65,
		dispersion: 0.025
	});
	const flagTime = new Uniform(0.4);
	material.onBeforeCompile = (shader) => {
		shader.uniforms.flagTime = flagTime;
		shader.vertexShader = shader.vertexShader
			.replace(
				'#include <common>',
				`
		#include <common>
		attribute vec2 flagUv;
		varying vec2 vFlagUv;
		`
			)
			.replace(
				'#include <begin_vertex>',
				`
		#include <begin_vertex>
		vFlagUv = flagUv;
		`
			);
		shader.fragmentShader = shader.fragmentShader
			.replace(
				'#include <common>',
				`
		#include <common>
		uniform float flagTime;
		varying vec2 vFlagUv;
		`
			)
			.replace(
				'#include <color_fragment>',
				`
		#include <color_fragment>
		float band = clamp(1.0 - vFlagUv.y + sin(flagTime * 0.7 + vFlagUv.x * 3.0) * 0.13, 0.0, 1.0);
		vec3 nb = mix(vec3(1.0, 0.957, 0.188), vec3(1.0), smoothstep(0.15, 0.4, band));
		nb = mix(nb, vec3(0.612, 0.349, 0.82), smoothstep(0.4, 0.68, band));
		nb = mix(nb, vec3(0.42, 0.4, 0.49), smoothstep(0.93, 1.0, band));
		float mirrored = abs(band - 0.5) * 2.0;
		vec3 trans = mix(vec3(1.0), vec3(0.961, 0.663, 0.722), smoothstep(0.1, 0.45, mirrored));
		trans = mix(trans, vec3(0.357, 0.808, 0.98), smoothstep(0.58, 0.93, mirrored));
		float blend = 0.5 + 0.5 * sin(flagTime + vFlagUv.x * 3.4);
		vec3 flagTint = mix(nb, trans, blend);
		flagTint = mix(flagTint, vec3(1.0), 0.4 * 4.0 * blend * (1.0 - blend));
		diffuseColor.rgb *= mix(vec3(1.0), pow(flagTint, vec3(2.2)), 0.52);
		`
			);
	};

	const colorShader = material.onBeforeCompile;
	material.onBeforeCompile = (shader, activeRenderer) => {
		colorShader.call(material, shader, activeRenderer);
		shader.fragmentShader = shader.fragmentShader
			.replace(
				'#include <emissivemap_fragment>',
				`
		#include <emissivemap_fragment>
		float glowRim = pow(1.0 - abs(normal.z), 1.65);
		vec3 glowTint = mix(pow(flagTint, vec3(2.2)), vec3(1.0), 0.3);
		totalEmissiveRadiance += glowTint * (0.012 + glowRim * 0.7);
		`
			)
			.replace(
				'#include <opaque_fragment>',
				`
		// Bound studio reflections independently of the transmitted backdrop.
		outgoingLight = totalDiffuse + totalEmissiveRadiance + min(totalSpecular, vec3(0.012 + glowRim * 0.14));
		#include <opaque_fragment>
		`
			);
	};

	return { material, flagTime };
};
