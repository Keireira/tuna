// Body/display dimensions: https://support.apple.com/en-us/121031
// Normalize to a screen width of 1; corner and hardware details are visual approximations.
const screenWidthMm = (1206 / 460) * 25.4;
export const IPHONE_16_PRO = {
	screenHeight: 2622 / 1206,
	bodyWidth: 71.5 / screenWidthMm,
	bodyHeight: 149.6 / screenWidthMm,
	bodyRadius: 0.174,
	screenRadius: 0.154,
	islandWidth: 0.31,
	islandHeight: 0.088,
	islandTop: 0.027
} as const;

export const IPHONE_16_PRO_BUTTONS = [
	{ name: 'action', side: 'left', top: 0.15, height: 0.035 },
	{ name: 'volume-up', side: 'left', top: 0.22, height: 0.066 },
	{ name: 'volume-down', side: 'left', top: 0.305, height: 0.066 },
	{ name: 'power', side: 'right', top: 0.255, height: 0.105 },
	{ name: 'camera', side: 'right', top: 0.61, height: 0.075 }
] as const;
