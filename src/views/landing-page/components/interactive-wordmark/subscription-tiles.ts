import { BoxGeometry, Color, Float32BufferAttribute, Group, Mesh, MeshBasicMaterial } from 'three';
import { SUBSCRIPTION_CAPACITY } from './subscription-drift';
import { createSubscriptionFaces } from './subscription-artwork';

type DisposableT = { dispose: () => void };
export type SubscriptionTileT = { group: Group; setFade: (opacity: number) => void };

/** One volume per card shares geometry and artwork; fading stays independent. */
export const createSubscriptionTiles = (resources: DisposableT[]): SubscriptionTileT[] => {
	const geometry = new BoxGeometry(0.048, 0.058, 0.006);
	const normals = geometry.attributes.normal;
	const faces = new Float32Array(normals.count);
	for (let i = 0; i < normals.count; i++) faces[i] = Math.abs(normals.getZ(i));
	geometry.setAttribute('cardFace', new Float32BufferAttribute(faces, 1));
	const artwork = createSubscriptionFaces();
	resources.push(geometry, ...artwork.map(({ texture }) => texture));
	const ink = new Color('#18231f').toArray().join(', ');

	return Array.from({ length: SUBSCRIPTION_CAPACITY }, (_, index) => {
		const { service, texture } = artwork[index % artwork.length];
		const material = new MeshBasicMaterial({ map: texture, toneMapped: false, alphaHash: true, transparent: false });
		material.onBeforeCompile = (shader) => {
			shader.vertexShader = shader.vertexShader
				.replace('#include <common>', '#include <common>\nattribute float cardFace;\nvarying float vCardFace;')
				.replace('#include <begin_vertex>', '#include <begin_vertex>\nvCardFace = cardFace;');
			shader.fragmentShader = shader.fragmentShader
				.replace('#include <common>', '#include <common>\nvarying float vCardFace;')
				.replace(
					'#include <map_fragment>',
					`#include <map_fragment>\ndiffuseColor.rgb = mix(vec3(${ink}), diffuseColor.rgb, vCardFace);`
				);
		};
		material.customProgramCacheKey = () => 'uha-subscription-volume-v1';
		resources.push(material);
		const group = new Group();
		group.name = `subscription-${service}-${index}`;
		group.visible = false;
		group.add(new Mesh(geometry, material));
		return {
			group,
			setFade: (opacity: number): void => {
				material.opacity = Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 0;
			}
		};
	});
};
