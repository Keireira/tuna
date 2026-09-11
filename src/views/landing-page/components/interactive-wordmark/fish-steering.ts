const TAU = Math.PI * 2;
const MAX_TURN_RATE = 1.9;
const MAX_TURN_ACCELERATION = 6;
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));
const angleDifference = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

export const createFishSteering = (initialHeading: number) => {
	const state = { heading: initialHeading, turnRate: 0, speed: 0 };
	let reversalDirection = 0;

	return {
		state,
		update: (dt: number, targetHeading: number, cruiseSpeed: number): void => {
			if (dt <= 0) return;
			let difference = angleDifference(targetHeading - state.heading);
			// Keep one direction through a U-turn, even if a moving target crosses ±π.
			if (!reversalDirection && Math.abs(difference) > Math.PI * 0.8) {
				reversalDirection = Math.abs(state.turnRate) > 0.15 ? Math.sign(state.turnRate) : Math.sign(difference);
			}
			if (reversalDirection) {
				if (Math.abs(difference) < Math.PI / 2) reversalDirection = 0;
				else if (Math.sign(difference) !== reversalDirection) difference += reversalDirection * TAU;
			}
			const acceleration = clamp(difference * 10 - state.turnRate * 6.5, -MAX_TURN_ACCELERATION, MAX_TURN_ACCELERATION);
			state.turnRate = clamp(state.turnRate + acceleration * dt, -MAX_TURN_RATE, MAX_TURN_RATE);
			state.heading += state.turnRate * dt;
			const alignment = Math.max(0, Math.cos(targetHeading - state.heading));
			state.speed += (cruiseSpeed * alignment - state.speed) * (1 - Math.exp(-6 * dt));
		},
		// Heading can point at nearby food while the route points elsewhere. Check
		// the actual route tangent so the fish never translates backward or sideways.
		travelFactor: (course: number): number => {
			const t = clamp((Math.cos(course - state.heading) - 0.25) / 0.65, 0, 1);
			return t * t * (3 - 2 * t);
		}
	};
};
