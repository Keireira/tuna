import { CanvasTexture, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, Scene, SRGBColorSpace } from 'three';
import { tapeDuration, tapeJunction, tapeOpacity, type WordmarkTapeT } from '@/content/wordmark-tapes';

type DisposableT = { dispose: () => void };

export const createWordmarkBackdrop = (
	scene: Scene,
	resources: DisposableT[],
	definitions: readonly WordmarkTapeT[]
) => {
	const backdropMaterial = new MeshBasicMaterial({ color: '#fd553a', toneMapped: false });
	const backdropGeometry = new PlaneGeometry(1, 1);
	resources.push(backdropMaterial, backdropGeometry);
	const backdropPlane = new Mesh(backdropGeometry, backdropMaterial);
	backdropPlane.position.z = -150;
	scene.add(backdropPlane);
	const tapes = definitions.map((tape, index) => {
		const tile = document.createElement('canvas');
		const context = tile.getContext('2d');
		if (!context) throw new Error('Tape drawing is unavailable');
		const texture = new CanvasTexture(tile);
		texture.colorSpace = SRGBColorSpace;
		texture.wrapS = RepeatWrapping;
		const tapeMaterial = new MeshBasicMaterial({
			map: texture,
			toneMapped: false
		});
		const mesh = new Mesh(backdropGeometry, tapeMaterial);
		mesh.position.z = -149 + index;
		mesh.rotation.z = (-tape.angle * Math.PI) / 180;
		scene.add(mesh);
		resources.push(texture, tapeMaterial);
		return { ...tape, tile, context, texture, mesh };
	});
	return {
		update: (elapsed: number): void => {
			for (const tape of tapes)
				tape.texture.offset.x = -tape.texture.repeat.x / 2 + (elapsed / tapeDuration) * tape.direction;
		},
		resize: (width: number, height: number, pageColor: string): void => {
			backdropMaterial.color.set(pageColor);
			const tapeSize = Math.max(16, Math.min(22, width * 0.018));
			tapes.forEach((tape) => {
				const { context, tile, texture, mesh } = tape;
				context.font = `800 ${tapeSize}px Nunito`;
				const tileWidth = Math.ceil(context.measureText(tape.text).width);
				const tileHeight = tapeSize * 1.9;
				tile.width = tileWidth * 2;
				tile.height = Math.ceil(tileHeight * 2);
				context.setTransform(2, 0, 0, 2, 0, 0);
				context.fillStyle = pageColor;
				context.fillRect(0, 0, tileWidth, tileHeight);
				context.globalAlpha = tapeOpacity;
				context.fillStyle = tape.color;
				context.fillRect(0, 0, tileWidth, tileHeight);
				context.font = `800 ${tapeSize}px Nunito`;
				context.textBaseline = 'middle';
				context.fillStyle = '#161a15';
				context.fillText(tape.text, 0, tileHeight / 2);
				context.globalAlpha = 1;
				texture.repeat.x = (width * 2) / tileWidth;
				texture.needsUpdate = true;
				mesh.scale.set(width * 2, tileHeight, 1);
				mesh.position.x = width * (tapeJunction.x - 0.5);
				mesh.position.y = height * (0.5 - tapeJunction.y);
			});
			backdropPlane.scale.set(width, height, 1);
		}
	};
};
