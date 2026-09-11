// Shared coordinates keep the HTML backdrop aligned with its refracted WebGL copy.
const noSlopText = 'NO SLOP APP   /   NO SLOP HERE   /   ';
export const tapeJunction = { x: 0.18, y: 0.5 } as const;
export const tapeRepeatCount = 24;
const wordmarkTapes = [
	{ id: 'no-slop-up', angle: -8, color: '#ece6d6', direction: 1, text: noSlopText },
	{ id: 'no-slop-down', angle: 7, color: '#cfdb8c', direction: -1, text: noSlopText },
	{
		id: 'fuck-subscriptions',
		angle: -2,
		color: '#f2bed8',
		direction: 1,
		text: 'FUCK SUBSCRIPTIONS   /   FUCK SUBSCRIPTIONS   /   '
	}
] as const;
export type WordmarkTapeT = Omit<(typeof wordmarkTapes)[number], 'text'> & { text: string };
export const createWordmarkTapes = (slogan: string): WordmarkTapeT[] =>
	wordmarkTapes.map((tape, index) => (index === 0 ? { ...tape, text: `${slogan.trim().toUpperCase()}   /   ` } : tape));
export const tapeOpacity = 0.28;
export const tapeDuration = 70;
