const MAX_DRAWING_PIXELS = 2_000_000;
const MAX_DRAWING_SIDE = 4096;
const MAX_PIXEL_RATIO = 1.5;

/** Keep the glass buffers bounded on ultrawide and high-density displays. */
export const getWordmarkPixelRatio = (width: number, height: number, devicePixelRatio: number): number =>
	Math.min(
		devicePixelRatio,
		MAX_PIXEL_RATIO,
		Math.sqrt(MAX_DRAWING_PIXELS / (width * height)),
		MAX_DRAWING_SIDE / width,
		MAX_DRAWING_SIDE / height
	);
