import styled from 'styled-components';

const Root = styled.section`
	background: #dd94c3;
	--ink: #20251d;
	--line: #80536f;
	color: var(--ink);
	.craft-heading {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 32px;
		align-items: start;
		padding-bottom: 42px;
	}
	.craft-heading .eyebrow {
		padding-top: 8px;
	}
	.craft-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 40px;
	}
	.craft-clip {
		min-width: 0;
	}
	.craft-stage {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 28px;
		background: #f1eadb;
	}
	.craft-clip:nth-child(2) .craft-stage {
		background: #f5a242;
	}
	.craft-phone {
		width: min(100%, 300px);
	}
	.craft-stage video {
		display: block;
	}
	.craft-clip figcaption {
		padding-top: 24px;
	}
	.craft-clip h3 {
		font-size: clamp(28px, 3vw, 40px);
	}
	.craft-clip p {
		margin-top: 12px;
		max-width: 440px;
		font-size: 20px;
		line-height: 1.4;
	}
	@media (max-width: 720px) {
		.craft-heading,
		.craft-grid {
			grid-template-columns: 1fr;
		}
		.craft-heading {
			gap: 20px;
			padding-bottom: 30px;
		}
		.craft-stage {
			padding: 18px;
		}
	}
`;

export default Root;
