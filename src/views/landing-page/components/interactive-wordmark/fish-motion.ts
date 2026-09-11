import { Vector4 } from 'three';

export type FishLocomotionT = { speed: number; turnRate: number };
export const FISH_SPINE_STEPS = 16;
export const FISH_AXIS_X = 13 / 990;

/** Arc-length spine: the head leads, with a traveling wave growing toward the tail. */
export const createFishMotion = () => {
	const frames = Array.from(
		{ length: FISH_SPINE_STEPS + 1 },
		(_, i) => new Vector4(FISH_AXIS_X, 0.5 - i / FISH_SPINE_STEPS, 0, 0)
	);
	const state = { phase: 0, effort: 0, turn: 0 };
	const angleAt = (along: number): number => {
		const t = Math.max(0, Math.min(1, (along - 0.19) / 0.81));
		const envelope = t * t * (3 - 2 * t);
		const wave = Math.sin(state.phase - along * 5.5) * (0.12 + state.effort * 0.27);
		const frontWeight = (1 - along) * (1 - along);
		const front = Math.sin(state.phase + 0.8 - along * 3) * (0.075 + state.effort * 0.055);
		return envelope * (wave + state.turn * 0.23) + frontWeight * (front - state.turn * 0.08);
	};
	return {
		frames,
		state,
		update: (dt: number, locomotion: FishLocomotionT): void => {
			const ease = 1 - Math.exp(-5 * dt);
			state.effort += (Math.max(0, Math.min(1, locomotion.speed / 0.3)) - state.effort) * ease;
			state.turn += (Math.max(-1, Math.min(1, locomotion.turnRate / 2.5)) - state.turn) * ease;
			state.phase = (state.phase + dt * (3.2 + 6.4 * Math.sqrt(state.effort))) % (Math.PI * 2);
			// A small counter-motion brings the head and shoulders into the same swim cycle.
			frames[0].set(FISH_AXIS_X + Math.sin(state.phase + 0.8) * (0.006 + state.effort * 0.009), 0.5, 0, angleAt(0));
			for (let i = 1; i <= FISH_SPINE_STEPS; i++) {
				const along = i / FISH_SPINE_STEPS;
				const tangent = angleAt((i - 0.5) / FISH_SPINE_STEPS);
				const previous = frames[i - 1];
				frames[i].set(
					previous.x + Math.sin(tangent) / FISH_SPINE_STEPS,
					previous.y - Math.cos(tangent) / FISH_SPINE_STEPS,
					0,
					angleAt(along)
				);
			}
		}
	};
};
