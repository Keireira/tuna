import {
	ACESFilmicToneMapping,
	DirectionalLight,
	DoubleSide,
	MeshBasicMaterial,
	ShapeGeometry,
	ExtrudeGeometry,
	Group,
	Float32BufferAttribute,
	Mesh,
	OrthographicCamera,
	PMREMGenerator,
	Raycaster,
	Scene,
	SRGBColorSpace,
	Vector2,
	Vector3,
	WebGLRenderer
} from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import typeface from '@/content/uha-rounded-typeface.json';
import type { WordmarkTapeT } from '@/content/wordmark-tapes';
import { createWordmarkBackdrop } from './wordmark-backdrop';
import { createWordmarkMaterial } from './wordmark-material';
import { createWordmarkFish } from './wordmark-fish';
import { createAnimationClock } from './animation-clock';
import { getWordmarkPixelRatio } from './render-budget';

type CallbacksT = { onReady: () => void; onFallback: () => void };
type DisposableT = { dispose: () => void };

export const createWordmarkScene = (host: HTMLDivElement, callbacks: CallbacksT, tapes: readonly WordmarkTapeT[]) => {
	const canvas = document.createElement('canvas');
	canvas.className = 'wordmark-canvas';
	canvas.setAttribute('aria-hidden', 'true');
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true,
		powerPreference: 'low-power',
		// Keep the HTML wordmark when the browser cannot provide a usable GPU context.
		failIfMajorPerformanceCaveat: true
	});
	const resources: DisposableT[] = [];
	const removeListeners: (() => void)[] = [];
	let disposed = false,
		failed = false,
		active = false,
		warmed = false,
		ready = false,
		frameId = 0;
	const clock = createAnimationClock(30);
	const stop = () => {
		cancelAnimationFrame(frameId);
		frameId = 0;
		clock.reset();
	};
	const dispose = () => {
		if (disposed) return;
		disposed = true;
		stop();
		removeListeners.forEach((remove) => remove());
		resources.forEach((resource) => resource.dispose());
		renderer.dispose();
		renderer.forceContextLoss();
		canvas.remove();
		delete host.dataset.activeLetter;
		delete host.dataset.wordmarkMotion;
		delete host.dataset.fishLetter;
		delete host.dataset.fishMotion;
		delete host.dataset.foodCount;
		delete host.dataset.foodCaught;
		delete host.dataset.foodMissed;
		delete host.dataset.foodBatches;
		host.dataset.wordmarkState = 'fallback';
	};
	const fallback = () => {
		if (failed || disposed) return;
		failed = true;
		stop();
		host.dataset.wordmarkState = 'fallback';
		callbacks.onFallback();
		queueMicrotask(dispose);
	};
	try {
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.85;
		renderer.transmissionResolutionScale = 1;
		renderer.debug.onShaderError = fallback;
		const scene = new Scene();
		const backdrop = createWordmarkBackdrop(scene, resources, tapes);
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 5000);
		camera.position.z = 2000;
		const room = new RoomEnvironment();
		const pmrem = new PMREMGenerator(renderer);
		try {
			const environment = pmrem.fromScene(room, 0.04);
			resources.push(environment);
			scene.environment = environment.texture;
		} finally {
			room.dispose();
			pmrem.dispose();
		}
		const key = new DirectionalLight(0xfff7e8, 1.1);
		key.position.set(-3, 5, 8);
		scene.add(key);
		const rim = new DirectionalLight(0xccefff, 0.7);
		rim.position.set(4, -1, 3);
		scene.add(rim);
		const { material, flagTime } = createWordmarkMaterial();
		resources.push(material);
		const font = new FontLoader().parse(typeface);
		const group = new Group();
		const interaction = new Group();
		interaction.add(group);
		scene.add(interaction);
		const fish = createWordmarkFish(resources);
		const followTarget = new Vector2();
		const hitMaterial = new MeshBasicMaterial({ side: DoubleSide });
		resources.push(hitMaterial);
		const letters = [...'UHA'].map((character) => {
			const shapes = font.generateShapes(character, 1);
			const geometry = new ExtrudeGeometry(shapes, {
				depth: 0.075,
				bevelEnabled: true,
				bevelSize: 0.014,
				bevelThickness: 0.018,
				bevelSegments: 4,
				curveSegments: 14,
				steps: 1
			});
			resources.push(geometry);
			geometry.computeBoundingBox();
			const center = geometry.boundingBox!.getCenter(new Vector3());
			geometry.translate(-center.x, -center.y, -center.z);
			geometry.setAttribute(
				'flagUv',
				new Float32BufferAttribute(new Float32Array(geometry.attributes.position.count * 2), 2)
			);
			const mesh = new Mesh(geometry, material);
			group.add(mesh);
			// Raycast only the front outline, not every bevel and back-face triangle.
			const hitGeometry = new ShapeGeometry(shapes, 14);
			hitGeometry.translate(-center.x, -center.y, -center.z + 0.075);
			resources.push(hitGeometry);
			const hitMesh = new Mesh(hitGeometry, hitMaterial);
			hitMesh.visible = false;
			mesh.add(hitMesh);
			return { character, mesh, hitMesh, center, targetX: 0, targetY: 0, kick: 0, velocity: 0 };
		});
		fish.setHabitat(letters[0].mesh, letters[0].center, font.generateShapes('U', 1)[0].getPoints(48));
		const hitMeshes = letters.map((letter) => letter.hitMesh);
		const letterMeshes = letters.map((letter) => letter.mesh);
		const raycaster = new Raycaster();
		const pointer = new Vector2(2, 2);
		const updateData = (key: string, value: string): void => {
			if (host.dataset[key] !== value) host.dataset[key] = value;
		};
		let elapsed = 0;
		let hovered = -1;
		let hitPoint: Vector3 | undefined;
		let pointerY = 0;
		let queuedPointer: { clientX: number; clientY: number } | null = null;
		const requestRender = () => {
			if (!frameId && warmed && active && !document.hidden && !disposed && !failed)
				frameId = requestAnimationFrame(render);
		};
		const render = (time: number) => {
			frameId = 0;
			if (!active || document.hidden || disposed || failed) return;
			const dt = clock.tick(time);
			if (dt === null) {
				requestRender();
				return;
			}
			if (queuedPointer) {
				updatePointer(queuedPointer);
				queuedPointer = null;
			}
			elapsed += dt;
			flagTime.value += dt * 0.26;
			backdrop.update(elapsed);
			const ease = 1 - Math.exp(-14 * dt);
			interaction.rotation.x += (-followTarget.y * 0.16 - interaction.rotation.x) * ease;
			interaction.rotation.y += (followTarget.x * 0.24 - interaction.rotation.y) * ease;
			interaction.position.x += (followTarget.x * 16 - interaction.position.x) * ease;
			interaction.position.y += (followTarget.y * 10 - interaction.position.y) * ease;
			let moving =
				Math.abs(followTarget.x * 16 - interaction.position.x) +
					Math.abs(followTarget.y * 10 - interaction.position.y) >
				0.01;
			letters.forEach((letter) => {
				letter.velocity += (-160 * letter.kick - 13 * letter.velocity) * dt;
				letter.kick += letter.velocity * dt;
				letter.mesh.rotation.x += (letter.targetX - letter.mesh.rotation.x) * ease;
				letter.mesh.rotation.y += (letter.targetY - letter.mesh.rotation.y) * ease;
				letter.mesh.rotation.z = letter.kick * 0.7;
				letter.mesh.position.z = letter.kick * 0.35;
				moving ||=
					Math.abs(letter.targetX - letter.mesh.rotation.x) +
						Math.abs(letter.targetY - letter.mesh.rotation.y) +
						Math.abs(letter.velocity) +
						Math.abs(letter.kick) >
					0.0005;
			});
			const fishState = fish.update(elapsed, dt);
			if (fishState) {
				updateData('fishLetter', fishState.letter);
				updateData('fishMotion', fishState.motion);
				updateData('foodCount', String(fishState.food));
				updateData('foodCaught', String(fishState.caught));
				updateData('foodMissed', String(fishState.missed));
				updateData('foodBatches', String(fishState.batches));
			}
			try {
				renderer.render(scene, camera);
				if (failed || renderer.getContext().isContextLost()) {
					fallback();
					return;
				}
				if (!ready) {
					ready = true;
					host.dataset.wordmarkState = 'ready';
					callbacks.onReady();
				}
				updateData('wordmarkMotion', moving ? 'moving' : 'shimmer');
			} catch {
				fallback();
				return;
			}
			requestRender();
		};
		let lastWidth = 0,
			lastHeight = 0,
			lastPixelRatio = 0;
		const resize = () => {
			if (disposed || failed || !host.clientWidth || !host.clientHeight) return;
			const width = document.documentElement.clientWidth,
				height = host.clientHeight;
			const pixelRatio = getWordmarkPixelRatio(width, height, window.devicePixelRatio);
			if (width === lastWidth && height === lastHeight && pixelRatio === lastPixelRatio) return;
			lastWidth = width;
			lastHeight = height;
			lastPixelRatio = pixelRatio;
			const style = getComputedStyle(host);
			const fontSize = Number.parseFloat(style.fontSize);
			const spacing = (Number.parseFloat(style.letterSpacing) || 0) / fontSize;
			let advance = 0;
			const wordWidth = 2.287 + spacing * 2;
			letters.forEach((letter) => {
				letter.mesh.position.set(advance + letter.center.x, letter.center.y, 0);
				const positions = letter.mesh.geometry.attributes.position;
				const uvs = letter.mesh.geometry.attributes.flagUv;
				for (let i = 0; i < positions.count; i++) {
					uvs.setXY(
						i,
						(positions.getX(i) + letter.center.x + advance) / wordWidth,
						(positions.getY(i) + letter.center.y) / 0.714
					);
				}
				uvs.needsUpdate = true;
				advance += font.data.glyphs[letter.character].ha / font.data.resolution + spacing;
			});
			// Match the HTML line box and font bearings instead of fitting to arbitrary scene margins.
			const hostBox = host.getBoundingClientRect();
			const fallbackBox = host.querySelector('.wordmark-fallback')!.getBoundingClientRect();
			const baseline = host.querySelector('.wordmark-baseline')!.getBoundingClientRect().top - hostBox.top;
			group.scale.setScalar(fontSize);
			group.position.set(-width / 2 + fallbackBox.left, height / 2 - baseline, 0);

			camera.left = -width / 2;
			camera.right = width / 2;
			camera.top = height / 2;
			camera.bottom = -height / 2;
			camera.updateProjectionMatrix();
			renderer.setDrawingBufferSize(width, height, pixelRatio);
			backdrop.resize(width, height, style.getPropertyValue('--page').trim());
			requestRender();
		};
		const hit = (event: { clientX: number; clientY: number }, precise = false) => {
			const box = canvas.getBoundingClientRect();
			pointer.set(((event.clientX - box.left) / box.width) * 2 - 1, 1 - ((event.clientY - box.top) / box.height) * 2);
			pointerY = pointer.y;
			raycaster.setFromCamera(pointer, camera);
			const found =
				raycaster.intersectObjects(hitMeshes, false)[0] ??
				(precise ? raycaster.intersectObjects(letterMeshes, false)[0] : undefined);
			const index = found
				? letters.findIndex((letter) => letter.hitMesh === found.object || letter.mesh === found.object)
				: -1;
			hitPoint =
				index < 0 ? undefined : letters[index].mesh.worldToLocal(found.point.clone()).add(letters[index].center);
			return index;
		};
		const updatePointer = (event: { clientX: number; clientY: number }) => {
			hovered = hit(event);
			followTarget.copy(pointer);
			letters.forEach((letter, index) => {
				const influence = index === hovered ? 1 : 0.3;
				letter.targetX = -pointer.y * 0.28 * influence;
				letter.targetY = pointer.x * 0.34 * influence;
			});
			if (hovered < 0) delete host.dataset.activeLetter;
			else host.dataset.activeLetter = letters[hovered].character;
			requestRender();
		};
		const move = (event: PointerEvent) => {
			if (!ready || failed || event.pointerType === 'touch') return;
			queuedPointer = { clientX: event.clientX, clientY: event.clientY };
			requestRender();
		};
		const leave = () => {
			queuedPointer = null;
			hovered = -1;
			followTarget.set(0, 0);
			delete host.dataset.activeLetter;
			letters.forEach((letter) => {
				letter.targetX = 0;
				letter.targetY = 0;
			});
			requestRender();
		};
		const press = (event: PointerEvent) => {
			if (!ready || failed) return;
			const index = hit(event, true);
			if (index < 0) return;
			if (hitPoint) fish.feed(index, hitPoint);
			letters[index].velocity = pointerY > 0 ? -5 : 5;
			host.dataset.activeLetter = letters[index].character;
			requestRender();
		};
		let keyboardHorn = 0;
		const keyboard = (event: KeyboardEvent) => {
			if (!ready || failed || (event.key !== 'Enter' && event.key !== ' ')) return;
			event.preventDefault();
			const targets = [new Vector3(0.136, 0.6, 0), new Vector3(0.609, 0.6, 0)];
			fish.feed(0, targets[keyboardHorn]);
			keyboardHorn = (keyboardHorn + 1) % targets.length;
			letters[0].velocity = -5;
			requestRender();
		};
		const visibility = () => {
			if (document.hidden) stop();
			else requestRender();
		};
		const contextLost = (event: Event) => {
			event.preventDefault();
			fallback();
		};
		host.addEventListener('pointermove', move);
		host.addEventListener('pointerleave', leave);
		host.addEventListener('pointercancel', leave);
		host.addEventListener('pointerdown', press);
		host.addEventListener('keydown', keyboard);
		host.addEventListener('blur', leave);
		canvas.addEventListener('webglcontextlost', contextLost);
		document.addEventListener('visibilitychange', visibility);
		const observer = new ResizeObserver(resize);
		observer.observe(host);
		removeListeners.push(() => {
			observer.disconnect();
			host.removeEventListener('pointermove', move);
			host.removeEventListener('pointerleave', leave);
			host.removeEventListener('pointercancel', leave);
			host.removeEventListener('pointerdown', press);
			host.removeEventListener('keydown', keyboard);
			host.removeEventListener('blur', leave);
			canvas.removeEventListener('webglcontextlost', contextLost);
			document.removeEventListener('visibilitychange', visibility);
		});
		host.append(canvas);
		resize();
		// Keep the light HTML wordmark visible while the GPU compiles the glass.
		void renderer
			.compileAsync(scene, camera)
			.then(() => {
				if (disposed || failed) return;
				warmed = true;
				requestRender();
			})
			.catch(fallback);
		return {
			setActive: (value: boolean) => {
				active = value;
				if (active) requestRender();
				else stop();
			},
			dispose
		};
	} catch (error) {
		dispose();
		throw error;
	}
};

export type WordmarkSceneT = ReturnType<typeof createWordmarkScene>;
