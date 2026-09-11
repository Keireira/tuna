import { CanvasTexture, SRGBColorSpace } from 'three';

type ServiceT = 'music' | 'video' | 'cloud' | 'games' | 'books' | 'recurring';

const SERVICES: readonly { service: ServiceT; color: string }[] = [
	{ service: 'music', color: '#b4e678' },
	{ service: 'video', color: '#ff98bd' },
	{ service: 'cloud', color: '#80d9f4' },
	{ service: 'games', color: '#cab1ff' },
	{ service: 'books', color: '#ffcb62' },
	{ service: 'recurring', color: '#f1ead9' }
];
const INK = '#18231f';

const drawArrow = (context: CanvasRenderingContext2D, x: number, y: number, down: boolean): void => {
	const direction = down ? 1 : -1;
	context.beginPath();
	context.moveTo(x - 8, y - direction * 8);
	context.lineTo(x, y);
	context.lineTo(x + 8, y - direction * 8);
	context.stroke();
};

const drawService = (context: CanvasRenderingContext2D, service: ServiceT): void => {
	context.lineWidth = 8;
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.strokeStyle = INK;
	context.fillStyle = INK;
	context.beginPath();
	switch (service) {
		case 'music':
			context.moveTo(54, 80);
			context.lineTo(54, 40);
			context.lineTo(91, 32);
			context.lineTo(91, 72);
			context.moveTo(54, 51);
			context.lineTo(91, 43);
			context.stroke();
			context.beginPath();
			context.ellipse(44, 84, 13, 10, -0.3, 0, Math.PI * 2);
			context.fill();
			context.beginPath();
			context.ellipse(81, 76, 13, 10, -0.3, 0, Math.PI * 2);
			context.fill();
			break;
		case 'video':
			context.moveTo(46, 33);
			context.lineTo(94, 64);
			context.lineTo(46, 95);
			context.closePath();
			context.fill();
			break;
		case 'cloud':
			context.moveTo(38, 89);
			context.bezierCurveTo(13, 88, 18, 58, 38, 57);
			context.bezierCurveTo(36, 23, 82, 24, 86, 51);
			context.bezierCurveTo(115, 51, 115, 89, 91, 89);
			context.closePath();
			context.stroke();
			break;
		case 'games':
			context.moveTo(43, 46);
			context.lineTo(85, 46);
			context.bezierCurveTo(99, 44, 108, 80, 98, 89);
			context.bezierCurveTo(91, 95, 85, 76, 77, 76);
			context.lineTo(51, 76);
			context.bezierCurveTo(43, 76, 37, 95, 30, 89);
			context.bezierCurveTo(20, 80, 29, 44, 43, 46);
			context.stroke();
			context.beginPath();
			context.lineWidth = 6;
			context.moveTo(37, 62);
			context.lineTo(51, 62);
			context.moveTo(44, 55);
			context.lineTo(44, 69);
			context.stroke();
			context.beginPath();
			context.arc(85, 57, 4, 0, Math.PI * 2);
			context.fill();
			context.beginPath();
			context.arc(93, 66, 4, 0, Math.PI * 2);
			context.fill();
			break;
		case 'books':
			context.moveTo(64, 91);
			context.bezierCurveTo(53, 83, 41, 80, 25, 82);
			context.lineTo(25, 36);
			context.bezierCurveTo(40, 33, 55, 38, 64, 45);
			context.bezierCurveTo(73, 38, 88, 33, 103, 36);
			context.lineTo(103, 82);
			context.bezierCurveTo(87, 80, 75, 83, 64, 91);
			context.moveTo(64, 45);
			context.lineTo(64, 91);
			context.stroke();
			break;
		case 'recurring':
			context.arc(64, 64, 28, Math.PI * 1.12, Math.PI * 1.95);
			context.stroke();
			drawArrow(context, 92, 60, true);
			context.beginPath();
			context.arc(64, 64, 28, Math.PI * 0.12, Math.PI * 0.95);
			context.stroke();
			drawArrow(context, 36, 68, false);
			break;
	}
};

const createFace = (service: ServiceT, color: string): CanvasTexture => {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 156;
	const context = canvas.getContext('2d');
	if (!context) throw new Error('Subscription tile canvas is unavailable');

	// A fully opaque face participates in the letters' transmission buffer.
	context.fillStyle = '#f5edce';
	context.fillRect(0, 0, 128, 156);
	context.fillStyle = color;
	context.fillRect(5, 5, 118, 146);
	drawService(context, service);
	context.fillStyle = INK;
	context.fillRect(23, 115, 82, 5);
	context.fillRect(23, 130, 49, 5);
	// A small repeated-payment mark makes all six cards part of one family.
	context.strokeStyle = INK;
	context.lineWidth = 4;
	context.beginPath();
	context.arc(96, 135, 7, Math.PI * 0.25, Math.PI * 1.8);
	context.stroke();
	context.beginPath();
	context.moveTo(99, 126);
	context.lineTo(103, 131);
	context.lineTo(96, 132);
	context.stroke();

	const texture = new CanvasTexture(canvas);
	texture.colorSpace = SRGBColorSpace;
	return texture;
};

export const createSubscriptionFaces = () =>
	SERVICES.map(({ service, color }) => ({ service, texture: createFace(service, color) }));
