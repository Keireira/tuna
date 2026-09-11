import { Group, Vector2, Vector3, type Object3D } from 'three';
import { uFishPath, fishRouteDistance, routeFish } from './fish-paths';
import { createFishModel } from './fish-model';
import { createFishSteering } from './fish-steering';
import { createSubscriptionTiles } from './subscription-tiles';
import { createSubscriptionDrift, type SubscriptionDropT } from './subscription-drift';

type DisposableT = { dispose: () => void };
const FISH_FORWARD = Math.PI / 2;
const FISH_SIZE = 0.17;
const HUNT_SPEED = 0.3;

/** One U-shaped habitat. No jumps, cross-letter parenting, or hover chasing. */
export const createWordmarkFish = (resources: DisposableT[]) => {
	let disposed = false;
	let habitat: { mesh: Object3D; center: Vector3 } | null = null;
	let drift: ReturnType<typeof createSubscriptionDrift> | null = null;
	let target: SubscriptionDropT | null = null;
	let routeAge = 0,
		roaming = 0;
	let heading = -Math.PI / 2;
	const steering = createFishSteering(heading);
	let route: Vector2[] = [];
	const location = new Vector2(0.136, 0.55);
	const fishPivot = new Group();
	fishPivot.rotation.z = heading - FISH_FORWARD;
	const model = createFishModel(resources);
	model.group.scale.setScalar(FISH_SIZE);
	fishPivot.add(model.group);
	fishPivot.visible = false;
	const tiles = createSubscriptionTiles(resources);
	const aimPoint = new Vector2();
	const direction = new Vector2();
	const pickTarget = (): SubscriptionDropT | null => {
		let best: SubscriptionDropT | null = null,
			bestScore = Infinity;
		for (const item of drift?.items ?? []) {
			if (item.state !== 'falling' || item.age < item.delay) continue;
			const travel = fishRouteDistance(location, item) / HUNT_SPEED;
			const remaining = (item.y - item.floor) / Math.max(item.speed, 0.05);
			const score = travel + (travel > remaining ? 10 : 0);
			if (score < bestScore) {
				best = item;
				bestScore = score;
			}
		}
		return best;
	};
	const dispose = (): void => {
		if (disposed) return;
		disposed = true;
		fishPivot.removeFromParent();
		tiles.forEach((tile) => tile.group.removeFromParent());
		drift = null;
	};
	resources.push({ dispose });

	return {
		setHabitat: (mesh: Object3D, center: Vector3, outline: Vector2[]): void => {
			habitat = { mesh, center };
			drift = createSubscriptionDrift(outline);
			mesh.add(fishPivot, ...tiles.map((tile) => tile.group));
		},
		feed: (index: number, point: Vector3): void => {
			if (disposed || index !== 0 || !drift) return;
			if (!drift.drop(point)) return;
			if (target?.state !== 'falling') {
				target = null;
				routeAge = 1;
				route = [];
			}
		},
		update: (elapsed: number, dt: number) => {
			if (disposed || !habitat || !drift) return null;
			drift.update(dt);
			const ready = model.isReady();
			if (ready) {
				if (target?.state !== 'falling') {
					target = pickTarget();
					routeAge = 1;
				}
				routeAge += dt;
				if (target && routeAge >= 0.16) {
					// Aim the nose ahead of the body and lead the slowly sinking tile.
					aimPoint.set(target.x, Math.max(target.floor, target.y - target.speed * 0.3));
					const distance = aimPoint.distanceTo(location);
					direction.copy(aimPoint).sub(location).normalize();
					aimPoint.addScaledVector(direction, -Math.min(0.066, distance));
					route = routeFish(location, aimPoint);
					routeAge = 0;
				}
				if (!target && !route.length) {
					const path = uFishPath;
					roaming = roaming === 0 ? path.nodes.length - 1 : 0;
					route = routeFish(location, path.nodes[roaming]);
				}
				while (route.length && route[0].distanceToSquared(location) <= 0.000001) route.shift();
				const next = route[0];
				const aim = target && (target.x - location.x) ** 2 + (target.y - location.y) ** 2 < 0.14 ** 2 ? target : next;
				if (aim) heading = Math.atan2(aim.y - location.y, aim.x - location.x);
				steering.update(dt, heading, target ? HUNT_SPEED : 0.11);
				fishPivot.rotation.z = steering.state.heading - FISH_FORWARD;
				const previousX = location.x,
					previousY = location.y;
				let remaining = dt * steering.state.speed;
				while (route.length && remaining > 0) {
					const dx = route[0].x - location.x,
						dy = route[0].y - location.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					if (distance < 0.000001) {
						route.shift();
						continue;
					}
					const forward = steering.travelFactor(Math.atan2(dy, dx));
					if (forward < 0.000001) break;
					if (distance <= remaining * forward) {
						location.copy(route.shift()!);
						remaining -= distance / forward;
					} else {
						const travel = (remaining * forward) / distance;
						location.x += dx * travel;
						location.y += dy * travel;
						remaining = 0;
					}
				}
				fishPivot.position.set(location.x - habitat.center.x, location.y - habitat.center.y, 0.026);
				model.update(dt, {
					speed: Math.hypot(location.x - previousX, location.y - previousY) / Math.max(dt, 0.001),
					turnRate: steering.state.turnRate
				});
				const mouthX = location.x - Math.sin(fishPivot.rotation.z) * FISH_SIZE * 0.485;
				const mouthY = location.y + Math.cos(fishPivot.rotation.z) * FISH_SIZE * 0.485;
				for (const item of drift.items) {
					if (
						item.state === 'falling' &&
						item.age >= item.delay &&
						(mouthX - item.x) ** 2 + (mouthY - item.y) ** 2 < 0.032 ** 2
					) {
						drift.catch(item);
					}
				}
				fishPivot.visible = true;
			}
			const center = habitat.center;
			let food = 0;
			for (let index = 0; index < drift.items.length; index++) {
				const item = drift.items[index];
				const tile = tiles[index];
				if (item.state === 'falling') food++;
				tile.group.visible = item.state !== 'hidden' && item.age >= item.delay;
				if (!tile.group.visible) continue;
				tile.group.position.set(item.x - center.x, item.y - center.y, item.z);
				tile.group.rotation.set(
					Math.sin(elapsed * 1.1 + item.phase) * 0.15,
					Math.sin(elapsed + item.phase) * 0.3,
					Math.sin(elapsed * 0.8 + item.phase) * 0.13
				);
				tile.group.scale.setScalar(item.state === 'caught' ? Math.max(0.01, item.opacity) : 1);
				tile.setFade(item.opacity);
			}
			return ready ? { letter: 'U', motion: food ? 'feed' : 'swim', food, ...drift.stats() } : null;
		},
		dispose
	};
};
