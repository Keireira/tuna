import styled from 'styled-components';
import { IPHONE_16_PRO as phone } from '@/content/iphone-16-pro';

const IPhoneFrameRoot = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: ${phone.bodyWidth} / ${phone.bodyHeight};
	.iphone-shell {
		position: absolute;
		inset: 0;
		border-radius: ${(phone.bodyRadius / phone.bodyWidth) * 100}% / ${(phone.bodyRadius / phone.bodyHeight) * 100}%;
		background: linear-gradient(115deg, #c8c5bd 0%, #595954 16%, #a8a59c 33%, #777770 70%, #d4d1c9 88%, #64645f 100%);
		box-shadow:
			inset 0 0 0 1px #66665f,
			inset 0 0 0 2px #b0ada5;
	}
	.iphone-shell::after {
		content: '';
		position: absolute;
		inset: 0.45% 0.95%;
		border-radius: 15.5% / 7.35%;
		background: #080909;
	}
	.iphone-display {
		position: absolute;
		left: ${((phone.bodyWidth - 1) / (2 * phone.bodyWidth)) * 100}%;
		top: ${((phone.bodyHeight - phone.screenHeight) / (2 * phone.bodyHeight)) * 100}%;
		width: ${(1 / phone.bodyWidth) * 100}%;
		height: ${(phone.screenHeight / phone.bodyHeight) * 100}%;
		border-radius: ${phone.screenRadius * 100}% / ${(phone.screenRadius / phone.screenHeight) * 100}%;
	}
	.iphone-display > div[data-media-id] {
		width: 100%;
		height: 100%;
		aspect-ratio: auto;
		border: 0;
		border-radius: inherit;
		background: transparent;
	}
	.iphone-island {
		position: absolute;
		z-index: 3;
		left: 50%;
		top: ${(phone.islandTop / phone.screenHeight) * 100}%;
		width: ${phone.islandWidth * 100}%;
		height: ${(phone.islandHeight / phone.screenHeight) * 100}%;
		transform: translateX(-50%);
		border-radius: 999px;
		background: #030405;
		box-shadow: inset 0 0 0 0.5px #151718;
	}
	.iphone-island::after {
		content: '';
		position: absolute;
		right: 9%;
		top: 30%;
		height: 40%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 38%, #132534, #070b12 60%, #020303);
	}
	.iphone-side-button {
		position: absolute;
		width: 0.7%;
		border-radius: 2px;
		background: linear-gradient(90deg, #4d4e49, #aaa79e, #585a53);
	}
	.iphone-side-button[data-side='left'] {
		right: 99.85%;
	}
	.iphone-side-button[data-side='right'] {
		left: 99.85%;
	}
	.iphone-hardware {
		pointer-events: none;
	}
`;
export default IPhoneFrameRoot;
