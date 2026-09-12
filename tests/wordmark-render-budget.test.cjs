const assert = require('node:assert/strict');
const { test } = require('node:test');
const { getWordmarkPixelRatio } = require('../src/views/landing-page/components/interactive-wordmark/render-budget.ts');

test('wordmark preserves the current resolution on ordinary desktop displays', () => {
	assert.equal(getWordmarkPixelRatio(1440, 538, 1), 1);
	assert.equal(getWordmarkPixelRatio(1440, 538, 2), 1.5);
});

test('wordmark bounds physical pixels and both buffer sides on large displays', () => {
	for (const [width, height, dpr] of [
		[3840, 538, 2],
		[7680, 538, 3],
		[12000, 100, 2],
		[100, 12000, 2]
	]) {
		const ratio = getWordmarkPixelRatio(width, height, dpr);
		const physicalWidth = Math.floor(width * ratio);
		const physicalHeight = Math.floor(height * ratio);
		assert.ok(ratio > 0 && ratio <= dpr);
		assert.ok(physicalWidth * physicalHeight <= 2_000_000);
		assert.ok(physicalWidth <= 4096 && physicalHeight <= 4096);
	}
});
