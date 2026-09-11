import styled from 'styled-components';

export const MediaFrame = styled.div<{ $ratio: string; $crop: boolean; $focalPoint: string }>`
	position: relative;
	width: 100%;
	aspect-ratio: ${({ $ratio, $crop }) => ($crop ? '3 / 4' : $ratio)};
	background: #22211f;
	border: 1px solid #48443f;
	border-radius: 26px;
	overflow: hidden;
	.media-image-button {
		display: block;
		width: 100%;
		height: 100%;
		text-align: left;
	}
	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: ${({ $crop }) => ($crop ? 'cover' : 'contain')};
		object-position: ${({ $focalPoint }) => $focalPoint};
	}
	.media-status {
		position: absolute;
		bottom: 12px;
		left: 12px;
		right: 12px;
		padding: 7px 10px;
		border-radius: 5px;
		color: #f7e9c8;
		background: #40341c;
		font-size: 16px;
		text-align: center;
		pointer-events: none;
	}
	.media-placeholder {
		position: absolute;
		inset: 0;
		padding: clamp(20px, 5vw, 36px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 30px;
		background: #22211f;
	}
	.media-index {
		color: #5a5550;
		font-size: clamp(34px, 5vw, 58px);
		letter-spacing: -0.06em;
		line-height: 1;
	}
	.media-code {
		color: #df9d71;
		font-size: 16px;
		letter-spacing: 0.12em;
		overflow-wrap: anywhere;
	}
	.media-placeholder p {
		color: #ece7df;
		margin: 10px 0;
		font-size: clamp(17px, 2vw, 23px);
		line-height: 1.35;
	}
	.media-placeholder small {
		color: #aaa49c;
		font-size: 16px;
	}
`;

export const MediaDialog = styled.dialog`
	position: fixed;
	inset: 0;
	margin: auto;
	padding: 0;
	width: min(calc(100vw - 32px), 720px);
	max-width: none;
	max-height: calc(100dvh - 32px);
	background: #f1eadb;
	color: #161a15;
	border: 0;
	border-radius: 0;
	box-shadow: none;
	overscroll-behavior: contain;
	z-index: 2000;
	&::backdrop {
		background: rgb(22 26 21 / 0.68);
	}
	.media-dialog-toolbar {
		position: sticky;
		top: 0;
		z-index: 1;
		padding: 14px 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		background: #fd553a;
	}
	.media-dialog-toolbar strong {
		font-size: clamp(20px, 2.5vw, 25px);
		font-weight: 800;
		letter-spacing: -0.025em;
		line-height: 1.15;
	}
	form {
		flex-shrink: 0;
	}
	.media-dialog-close {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 48px;
		padding: 10px 14px;
		color: #161a15;
		background: transparent;
		border: 0;
		border-radius: 0;
		font-size: 18px;
		font-weight: 750;
		line-height: 1.25;
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	.media-dialog-close:hover {
		color: #161a15;
		background: #f1eadb;
	}
	.media-dialog-close:focus-visible {
		outline: 2px solid #161a15;
		outline-offset: 3px;
	}
	.media-dialog-close svg {
		flex-shrink: 0;
	}
	.media-dialog-body {
		padding: 16px;
	}
	.media-dialog-body img {
		width: 100%;
		height: auto;
		object-fit: contain;
		border: 0;
		border-radius: 0;
	}
	p {
		padding-top: 14px;
		font-size: 18px;
		line-height: 1.4;
	}
	@media (max-width: 600px) {
		.media-dialog-toolbar {
			align-items: flex-start;
			flex-direction: column;
			padding: 14px;
			gap: 12px;
		}
		form,
		.media-dialog-close {
			width: 100%;
		}
		.media-dialog-body {
			padding: 10px;
		}
	}
`;
