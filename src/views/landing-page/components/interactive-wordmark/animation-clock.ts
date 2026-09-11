/** Deadline pacing avoids dropping to 20 fps when a 60 Hz frame arrives just early. */
export const createAnimationClock = (fps: number) => {
	const interval = 1000 / fps;
	let previous: number | null = null;
	let deadline = 0;
	return {
		reset: (): void => {
			previous = null;
			deadline = 0;
		},
		tick: (time: number): number | null => {
			if (previous !== null && time + 0.5 < deadline) return null;
			const dt = previous === null ? 1 / fps : Math.min((time - previous) / 1000, 0.05);
			deadline = previous === null ? time + interval : deadline + interval;
			if (deadline < time) deadline = time + interval;
			previous = time;
			return dt;
		}
	};
};
