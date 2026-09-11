import { createGlyphBounds } from './glyph-bounds';

type PointT = { x: number; y: number };
export const MAX_SUBSCRIPTION_BATCHES = 10;
export const MAX_SUBSCRIPTIONS_PER_BATCH = 5;
export const SUBSCRIPTION_CAPACITY = MAX_SUBSCRIPTION_BATCHES * MAX_SUBSCRIPTIONS_PER_BATCH;
export type SubscriptionDropT = {
	readonly batchId: number;
	x: number;
	y: number;
	z: number;
	originX: number;
	phase: number;
	age: number;
	delay: number;
	speed: number;
	opacity: number;
	floor: number;
	state: 'hidden' | 'falling' | 'caught' | 'missed';
};
// Include the small visual tilt, not just the unrotated card rectangle.
const HALF_WIDTH = 0.029;
const HALF_HEIGHT = 0.034;

/** The actual U outline determines the floor, including the curved bottom. */
export const createSubscriptionDrift = (outline: readonly PointT[], random: () => number = Math.random) => {
	const items: SubscriptionDropT[] = Array.from({ length: SUBSCRIPTION_CAPACITY }, (_, index) => ({
		batchId: Math.floor(index / MAX_SUBSCRIPTIONS_PER_BATCH),
		x: 0,
		y: 0,
		z: 0,
		originX: 0,
		phase: 0,
		age: 0,
		delay: 0,
		speed: 0,
		opacity: 0,
		floor: 0,
		state: 'hidden'
	}));
	let caught = 0,
		missed = 0;
	// A slot stays occupied through the final catch/miss fade, not just the fall.
	const batchIsActive = (batch: number): boolean => {
		const start = batch * MAX_SUBSCRIPTIONS_PER_BATCH;
		for (let offset = 0; offset < MAX_SUBSCRIPTIONS_PER_BATCH; offset++) {
			if (items[start + offset].state !== 'hidden') return true;
		}
		return false;
	};
	const geometry = createGlyphBounds(outline, HALF_WIDTH, HALF_HEIGHT);
	const { bounds } = geometry;
	const spawnPoint = (target: PointT): PointT => {
		let best = { x: 0.136, y: 0.5 },
			distance = Infinity;
		for (let step = -28; step <= 28; step++) {
			const x = target.x + step * 0.005;
			if (!geometry.read(x)) continue;
			const y = Math.max(geometry.state.floor + 0.003, Math.min(geometry.state.ceiling, target.y));
			const candidate = (x - target.x) ** 2 + (y - target.y) ** 2;
			if (candidate < distance) {
				best = { x, y };
				distance = candidate;
			}
		}
		return best;
	};
	return {
		items,
		bounds,
		stats: () => {
			let batches = 0;
			for (let batch = 0; batch < MAX_SUBSCRIPTION_BATCHES; batch++) {
				if (batchIsActive(batch)) batches++;
			}
			return { caught, missed, batches };
		},
		drop: (point: PointT): number => {
			let batch = 0;
			while (batch < MAX_SUBSCRIPTION_BATCHES && batchIsActive(batch)) batch++;
			if (batch === MAX_SUBSCRIPTION_BATCHES) return 0;
			const count = 2 + Math.floor(random() * 4);
			const start = batch * MAX_SUBSCRIPTIONS_PER_BATCH;
			for (let index = 0; index < count; index++) {
				const item = items[start + index];
				const position = spawnPoint({ x: point.x + (random() - 0.5) * 0.09, y: point.y + index * 0.018 });
				Object.assign(item, position, {
					originX: position.x,
					z: 0.028 - random() * 0.05,
					phase: random() * Math.PI * 2,
					age: 0,
					delay: index * 0.12,
					speed: 0.028 + random() * 0.016,
					opacity: 1,
					floor: geometry.read(position.x) ? geometry.state.floor : 0.03,
					state: 'falling'
				});
			}
			return count;
		},
		catch: (item: SubscriptionDropT): void => {
			if (item.state !== 'falling' || item.age < item.delay) return;
			item.state = 'caught';
			caught++;
		},
		update: (dt: number): void => {
			for (const item of items) {
				if (item.state === 'hidden') continue;
				if (item.state !== 'falling') {
					item.opacity = Math.max(0, item.opacity - dt / (item.state === 'caught' ? 0.16 : 0.28));
					if (!item.opacity) item.state = 'hidden';
					continue;
				}
				item.age += dt;
				if (item.age < item.delay) continue;
				const age = item.age - item.delay;
				const x = item.originX + Math.sin(age * 1.4 + item.phase) * Math.min(age, 1) * 0.008;
				if (geometry.read(x) && item.y <= geometry.state.ceiling) {
					item.x = x;
					item.floor = geometry.state.floor;
				}
				item.z = Math.sin(age * 0.8 + item.phase) * 0.033;
				item.speed = Math.min(0.086, item.speed + dt * 0.009);
				item.y -= item.speed * dt;
				if (item.y <= item.floor) {
					item.y = item.floor;
					item.state = 'missed';
					missed++;
				}
			}
		}
	};
};
