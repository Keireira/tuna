type PointT = { x: number; y: number };
export type GlyphBoundsT = {
	readonly state: { readonly floor: number; readonly ceiling: number };
	read: (x: number) => boolean;
	bounds: (x: number) => [number, number] | null;
};

/** Exact vertical bounds of a polygon, inset to contain a rectangular object. */
export const createGlyphBounds = (outline: readonly PointT[], halfWidth: number, halfHeight: number): GlyphBoundsT => {
	// Polygon edges only change at vertex X coordinates. Each band stores its
	// active edges, preserving the exact original [minX, maxX) intersection rule.
	type EdgeT = { x: number; y: number; dx: number; dy: number };
	type EventT = { add: EdgeT[]; remove: EdgeT[] };
	const events = new Map<number, EventT>();
	const eventAt = (x: number): EventT => {
		let event = events.get(x);
		if (!event) {
			event = { add: [], remove: [] };
			events.set(x, event);
		}
		return event;
	};
	for (let i = 0; i < outline.length; i++) {
		const a = outline[i],
			b = outline[(i + 1) % outline.length];
		if (a.x === b.x) continue;
		const edge = { x: a.x, y: a.y, dx: b.x - a.x, dy: b.y - a.y };
		eventAt(Math.min(a.x, b.x)).add.push(edge);
		eventAt(Math.max(a.x, b.x)).remove.push(edge);
	}
	const breaks = [...events.keys()].sort((a, b) => a - b);
	const bands: EdgeT[][] = [];
	const activeEdges = new Set<EdgeT>();
	for (let i = 0; i < breaks.length - 1; i++) {
		const event = events.get(breaks[i])!;
		for (const edge of event.remove) activeEdges.delete(edge);
		for (const edge of event.add) activeEdges.add(edge);
		bands.push([...activeEdges]);
	}
	let sliceFloor = 0,
		sliceCeiling = 0;
	const readSlice = (x: number): boolean => {
		if (breaks.length < 2 || x < breaks[0] || x >= breaks[breaks.length - 1]) return false;
		let low = 0,
			high = breaks.length - 1;
		while (low + 1 < high) {
			const middle = (low + high) >>> 1;
			if (x < breaks[middle]) high = middle;
			else low = middle;
		}
		const edges = bands[low];
		if (edges.length < 2) return false;
		sliceFloor = Infinity;
		sliceCeiling = -Infinity;
		for (const edge of edges) {
			const y = edge.y + edge.dy * ((x - edge.x) / edge.dx);
			if (y < sliceFloor) sliceFloor = y;
			if (y > sliceCeiling) sliceCeiling = y;
		}
		return true;
	};
	const state = { floor: 0, ceiling: 0 };
	const read = (x: number): boolean => {
		state.floor = -Infinity;
		state.ceiling = Infinity;
		for (let offset = -1; offset <= 1; offset++) {
			if (!readSlice(x + offset * halfWidth)) return false;
			state.floor = Math.max(state.floor, sliceFloor + halfHeight);
			state.ceiling = Math.min(state.ceiling, sliceCeiling - halfHeight);
		}
		return state.floor <= state.ceiling;
	};
	// Public callers receive their own tuple; frame updates reuse scalar scratch.
	const bounds = (x: number): [number, number] | null => (read(x) ? [state.floor, state.ceiling] : null);
	return { state, read, bounds };
};
