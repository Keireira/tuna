import { Vector2 } from 'three';

export const uFishPath = {
	nodes: [
		[0.136, 0.64],
		[0.136, 0.34],
		[0.16, 0.17],
		[0.25, 0.095],
		[0.37, 0.072],
		[0.49, 0.103],
		[0.584, 0.2],
		[0.609, 0.4],
		[0.609, 0.64]
	].map(([x, y]) => new Vector2(x, y))
};

type PointT = { x: number; y: number };
type ProjectionT = { x: number; y: number; segment: number; position: number };
const uNodes = uFishPath.nodes;
const uSegments = uNodes.slice(1).map((b, index) => {
	const a = uNodes[index];
	const dx = b.x - a.x,
		dy = b.y - a.y;
	return { a, dx, dy, lengthSquared: dx * dx + dy * dy, length: Math.hypot(dx, dy), start: 0 };
});
let uLength = 0;
for (const segment of uSegments) {
	segment.start = uLength;
	uLength += segment.length;
}
const projectU = (point: PointT, result: ProjectionT): void => {
	let bestDistance = Infinity;
	for (let index = 0; index < uSegments.length; index++) {
		const segment = uSegments[index];
		const t = Math.max(
			0,
			Math.min(1, ((point.x - segment.a.x) * segment.dx + (point.y - segment.a.y) * segment.dy) / segment.lengthSquared)
		);
		const x = segment.a.x + segment.dx * t,
			y = segment.a.y + segment.dy * t;
		const dx = x - point.x,
			dy = y - point.y;
		const distance = dx * dx + dy * dy;
		if (distance >= bestDistance) continue;
		bestDistance = distance;
		result.x = x;
		result.y = y;
		result.segment = index;
		result.position = segment.start + t * segment.length;
	}
};
// Calls are synchronous and have no callbacks; this workspace never escapes.
const uFrom: ProjectionT = { x: 0, y: 0, segment: 0, position: 0 };
const uTo: ProjectionT = { x: 0, y: 0, segment: 0, position: 0 };
const walkURoute = (start: PointT, target: PointT, output: Vector2[] | null): number => {
	projectU(start, uFrom);
	projectU(target, uTo);
	const forward = uTo.position >= uFrom.position;
	const firstNode = forward ? uFrom.segment + 1 : uFrom.segment;
	const lastNode = forward ? uTo.segment : uTo.segment + 1;
	const nodeCount = Math.max(0, forward ? lastNode - firstNode + 1 : firstNode - lastNode + 1);
	let rawX = 0,
		rawY = 0,
		keptX = start.x,
		keptY = start.y,
		length = 0;
	for (let step = 0; step < nodeCount + 2; step++) {
		const point =
			step === 0 ? uFrom : step === nodeCount + 1 ? uTo : uNodes[firstNode + (step - 1) * (forward ? 1 : -1)];
		const dx = point.x - rawX,
			dy = point.y - rawY;
		// Match routeFish's existing adjacent-point filter, including near a joint.
		if (step === 0 || dx * dx + dy * dy > 0.000001) {
			length += Math.hypot(point.x - keptX, point.y - keptY);
			keptX = point.x;
			keptY = point.y;
			if (output) output.push(new Vector2(point.x, point.y));
		}
		rawX = point.x;
		rawY = point.y;
	}
	return length;
};

/** Route along the U's open centerline without a graph search. */
export const routeFish = (start: Vector2, target: Vector2): Vector2[] => {
	const result: Vector2[] = [];
	walkURoute(start, target, result);
	return result;
};

/** Evaluate food candidates without allocating routes or temporary vectors. */
export const fishRouteDistance = (start: PointT, target: PointT): number => walkURoute(start, target, null);
