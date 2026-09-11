import {
	BufferAttribute,
	Color,
	DoubleSide,
	ExtrudeGeometry,
	Group,
	Matrix3,
	Mesh,
	MeshPhysicalMaterial,
	Uniform,
	Uint16BufferAttribute,
	Vector3
} from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { TessellateModifier } from 'three/addons/modifiers/TessellateModifier.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createFishMotion } from './fish-motion';
import { finishFishMaterial, setFishFlapRotation } from './fish-material';
import type { FishLocomotionT } from './fish-motion';
import type { BufferGeometry, ShapePath } from 'three';

type DisposableT = { dispose: () => void };
export type FishModelT = {
	group: Group;
	update: (dt: number, locomotion: FishLocomotionT) => void;
	isReady: () => boolean;
};
const BOX = { x: 410, y: 130, width: 410, height: 990 };
const PART_IDS = ['body', 'tail-left', 'tail-right', 'fin-left', 'fin-right'] as const;
type PartT = { hinge: Vector3; rotation: Uniform<Matrix3>; tail: boolean; phase: number };
type BatchT = { group: Group; part: PartT | undefined; fills: BufferGeometry[]; rims: BufferGeometry[] };
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isContour = (path: ShapePath): boolean => {
	const node = path.userData.node;
	const style = path.userData.style;
	return (
		node instanceof Element &&
		!node.closest('mask, defs, clipPath') &&
		isRecord(style) &&
		typeof style.fill === 'string' &&
		style.fill !== 'none'
	);
};

const reverseWinding = (geometry: BufferGeometry): void => {
	const index = geometry.getIndex();
	if (index) {
		for (let i = 0; i < index.count; i += 3) {
			const middle = index.getX(i + 1);
			index.setX(i + 1, index.getX(i + 2));
			index.setX(i + 2, middle);
		}
		index.needsUpdate = true;
		return;
	}
	for (const attribute of Object.values(geometry.attributes)) {
		if (!(attribute instanceof BufferAttribute)) throw new Error('Unexpected fish vertex layout');
		for (let i = 0; i < attribute.count; i += 3) {
			for (let component = 0; component < attribute.itemSize; component++) {
				const middle = attribute.getComponent(i + 1, component);
				attribute.setComponent(i + 1, component, attribute.getComponent(i + 2, component));
				attribute.setComponent(i + 2, component, middle);
			}
		}
		attribute.needsUpdate = true;
	}
};

/** Original tessellated surfaces, batched by articulated part and fill/rim material. */
export const createFishModel = (resources: DisposableT[]): FishModelT => {
	const group = new Group();
	group.name = 'uha-volumetric-fish';
	group.visible = false;
	const parts: PartT[] = [];
	const owned: DisposableT[] = [];
	const pendingGeometry = new Set<BufferGeometry>();
	const own = <T extends DisposableT>(value: T): T => {
		owned.push(value);
		return value;
	};
	const controller = new AbortController();
	const motion = createFishMotion();
	const spine = new Uniform(motion.frames);
	const tessellate = new TessellateModifier(0.035, 5);
	let alive = true,
		ready = false;
	const dispose = (): void => {
		if (!alive) return;
		alive = false;
		ready = false;
		controller.abort();
		group.visible = false;
		group.removeFromParent();
		pendingGeometry.forEach((geometry) => geometry.dispose());
		pendingGeometry.clear();
		owned.forEach((value) => value.dispose());
		owned.length = 0;
		group.clear();
		parts.length = 0;
	};
	resources.push({ dispose });

	// Source geometry is temporary: dispose in finally, never retain its CPU buffers.
	const prepareGeometry = (geometry: BufferGeometry, color: Color): BufferGeometry => {
		try {
			geometry.translate(-BOX.x - BOX.width / 2, -BOX.y - BOX.height / 2, 0);
			geometry.scale(1 / BOX.height, -1 / BOX.height, 1 / BOX.height);
			reverseWinding(geometry);
			const flexible = tessellate.modify(geometry);
			pendingGeometry.add(flexible);
			const positions = flexible.getAttribute('position');
			// No material samples a UV map. Replace unused UVs with 16-bit linear colors:
			// 6 bytes per vertex instead of 8, with <= 1 / 131070 channel error.
			flexible.deleteAttribute('uv');
			const colors = new Uint16Array(positions.count * 3);
			for (let i = 0; i < positions.count; i++) {
				colors[i * 3] = Math.round(color.r * 65535);
				colors[i * 3 + 1] = Math.round(color.g * 65535);
				colors[i * 3 + 2] = Math.round(color.b * 65535);
			}
			flexible.setAttribute('color', new Uint16BufferAttribute(colors, 3, true));
			return flexible;
		} finally {
			geometry.dispose();
		}
	};

	const finishBatch = (batch: BatchT, rim: boolean): void => {
		const geometries = rim ? batch.rims : batch.fills;
		if (!geometries.length) return;
		const merged = mergeGeometries(geometries, false);
		if (!merged) throw new Error('Incompatible fish vertex attributes');
		own(merged);
		for (const geometry of geometries) {
			geometry.dispose();
			pendingGeometry.delete(geometry);
		}
		geometries.length = 0;
		const material = own(
			new MeshPhysicalMaterial(
				rim
					? {
							color: 0xffffff,
							emissive: 0xffffff,
							emissiveIntensity: 0.12,
							vertexColors: true,
							roughness: 0.42,
							metalness: 0,
							specularIntensity: 0.15,
							envMapIntensity: 0.2,
							toneMapped: false,
							side: DoubleSide
						}
					: {
							color: 0xffffff,
							emissive: 0xffffff,
							emissiveIntensity: 0.18,
							vertexColors: true,
							roughness: 0.36,
							metalness: 0,
							clearcoat: 0.1,
							clearcoatRoughness: 0.35,
							specularIntensity: 0.18,
							envMapIntensity: 0.25,
							toneMapped: false
						}
			)
		);
		finishFishMaterial(
			material,
			batch.part ? { spine, hinge: batch.part.hinge, rotation: batch.part.rotation } : { spine }
		);
		const mesh = new Mesh(merged, material);
		mesh.name = rim ? 'rims' : 'fills';
		mesh.frustumCulled = false;
		batch.group.add(mesh);
	};

	const load = async (): Promise<void> => {
		const response = await fetch('/assets/icons/fish-only.svg', { signal: controller.signal });
		if (!response.ok) throw new Error(`Fish SVG failed: ${response.status}`);
		const source = await response.text();
		if (!alive) return;
		const parsed = new SVGLoader().parse(source);
		const contours = parsed.paths.filter(isContour);
		const seen = new Set<string>();
		const targets = new Map<string, BatchT>();
		for (const id of PART_IDS) {
			const element = parsed.xml.querySelector(`[id="${id}"]`);
			if (!element) throw new Error(`Missing fish part: ${id}`);
			const target = new Group();
			target.name = id;
			let part: PartT | undefined;
			if (id !== 'body') {
				const x = Number(element.getAttribute('data-pivot-x'));
				const y = Number(element.getAttribute('data-pivot-y'));
				if (!x || !y || !Number.isFinite(x + y)) throw new Error('Invalid fish hinge');
				part = {
					hinge: new Vector3((x - BOX.x - BOX.width / 2) / BOX.height, -(y - BOX.y - BOX.height / 2) / BOX.height, 0),
					rotation: new Uniform(new Matrix3()),
					tail: id.startsWith('tail'),
					phase: id.endsWith('left') ? 0 : 0.6
				};
				parts.push(part);
			}
			group.add(target);
			targets.set(id, { group: target, part, fills: [], rims: [] });
		}
		for (const path of contours) {
			const node = path.userData.node;
			if (!(node instanceof Element)) throw new Error('Invalid fish contour');
			const id = node.closest('g[id]')?.id;
			const target = id && targets.get(id);
			if (!id || !target) throw new Error('Unassigned fish contour');
			seen.add(id);
			const depth = id === 'body' ? 65 : 12;
			const bevel = id === 'body' ? 12 : 3;
			const shapes = path.toShapes();
			if (!shapes.length) throw new Error('Fish contour has no solid shape');
			for (const shape of shapes) {
				const geometry = new ExtrudeGeometry(shape, {
					depth,
					bevelEnabled: true,
					bevelSize: 2.5,
					bevelThickness: bevel,
					bevelSegments: 3,
					curveSegments: 18,
					steps: 2
				});
				geometry.translate(0, 0, -depth / 2);
				target.fills.push(prepareGeometry(geometry, path.color));
			}
			const style = path.userData.style;
			if (!isRecord(style) || typeof style.stroke !== 'string' || style.stroke === 'none') continue;
			const strokeColor = new Color(style.stroke);
			const strokeStyle = SVGLoader.getStrokeStyle(
				typeof style.strokeWidth === 'number' ? style.strokeWidth : 9,
				style.stroke,
				'round',
				'round',
				4
			);
			for (const subpath of path.subPaths) {
				for (const face of [-1, 1]) {
					const geometry = SVGLoader.pointsToStroke(subpath.getPoints(32), strokeStyle);
					if (!geometry) continue;
					geometry.translate(0, 0, face * (depth / 2 + bevel + 0.6));
					target.rims.push(prepareGeometry(geometry, strokeColor));
				}
			}
		}
		if (seen.size !== PART_IDS.length) throw new Error('Fish contour set incomplete');
		for (const batch of targets.values()) {
			finishBatch(batch, false);
			finishBatch(batch, true);
		}
		if (!alive) return;
		ready = true;
		group.visible = true;
	};
	void load().catch(dispose);
	return {
		group,
		isReady: () => alive && ready,
		update: (dt: number, locomotion: FishLocomotionT): void => {
			if (!alive || !ready) return;
			motion.update(dt, locomotion);
			const { phase, effort } = motion.state;
			for (const part of parts) {
				const beat = phase - (part.tail ? 4.8 : 2.1) - part.phase;
				setFishFlapRotation(
					part.rotation.value,
					Math.sin(beat - 0.45) * (part.tail ? 0.16 + effort * 0.14 : 0.26 + effort * 0.16),
					Math.sin(beat) * (part.tail ? 0.07 + effort * 0.08 : 0.06)
				);
			}
		}
	};
};
