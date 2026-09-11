import styled from 'styled-components';
import { siteChrome } from '@/components/site-chrome/site-chrome.styles';

const Root = styled.div`
	${siteChrome}
	--page: #fd553a;
	--ink: #161a15;
	--paper: #f1eadb;
	color: var(--ink);
	background: var(--page);
	min-height: 100svh;
	font: 500 20px / 1.6 var(--font-rounded);
	font-variant-ligatures: none;
	font-feature-settings:
		'liga' 0,
		'clig' 0;
	.section-width {
		width: calc(100% - 48px);
		max-width: 1320px;
		margin-inline: auto;
	}
	a,
	button,
	summary {
		-webkit-tap-highlight-color: transparent;
	}
	:focus-visible {
		outline: 3px solid currentColor;
		outline-offset: 5px;
	}
	::selection {
		color: var(--paper);
		background: var(--ink);
	}
	.info-hero {
		padding-block: clamp(48px, 7vw, 100px) 56px;
	}
	h1,
	h2 {
		font-weight: 800;
		letter-spacing: -0.04em;
		text-wrap: balance;
		overflow-wrap: anywhere;
	}
	h1 {
		font-size: clamp(56px, 9vw, 124px);
		line-height: 0.98;
		max-width: 1120px;
	}
	.info-intro {
		display: grid;
		grid-template-columns: minmax(200px, 0.7fr) minmax(0, 2fr);
		gap: 28px 64px;
		margin-top: 40px;
		padding-top: 24px;
		border-top: 1px solid #762e20;
	}
	.info-updated {
		font-size: 18px;
		line-height: 1.5;
		max-width: 220px;
	}
	.info-lead {
		grid-column: 2;
		max-width: 850px;
		font-size: clamp(22px, 2.3vw, 28px);
		line-height: 1.4;
		letter-spacing: -0.02em;
	}
	.info-lead a,
	.info-article a {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
		overflow-wrap: anywhere;
	}
	.info-lead a:hover,
	.info-article a:hover {
		text-decoration-thickness: 2px;
	}
	.info-contact {
		display: inline-block;
		margin-top: 24px;
		font-size: clamp(24px, 3vw, 36px);
		font-weight: 800;
	}
	.info-paper {
		background: var(--paper);
	}
	.reading-grid {
		display: grid;
		grid-template-columns: minmax(200px, 0.7fr) minmax(0, 2fr);
		gap: 64px;
		padding-block: 52px 76px;
	}
	.info-contents {
		position: sticky;
		top: 24px;
		align-self: start;
		display: flex;
		flex-direction: column;
		font-size: 18px;
		line-height: 1.35;
	}
	.info-contents a {
		padding-block: 12px;
		border-bottom: 1px solid #161a1530;
	}
	.info-contents a:first-child {
		padding-top: 0;
	}
	.info-contents a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.info-article {
		min-width: 0;
	}
	.info-article section {
		scroll-margin-top: 28px;
	}
	.info-article section + section {
		margin-top: 44px;
		padding-top: 36px;
		border-top: 1px solid #161a1538;
	}
	.info-article h2 {
		font-size: clamp(30px, 3.2vw, 44px);
		line-height: 1.08;
		margin-bottom: 20px;
		text-wrap: pretty;
	}
	.info-article p,
	.info-article li {
		text-wrap: pretty;
	}
	.info-article p + p,
	.info-article ul + p {
		margin-top: 18px;
	}
	.info-article ul {
		padding-left: 1.15em;
		margin-top: 18px;
	}
	.info-article li + li {
		margin-top: 14px;
	}
	.endpoint-block {
		background: var(--ink);
		color: var(--paper);
		padding: clamp(20px, 3vw, 32px);
	}
	.endpoint-block code {
		display: block;
		font-size: clamp(18px, 2.4vw, 28px);
		line-height: 1.5;
		overflow-wrap: anywhere;
		user-select: all;
	}
	.copy-endpoint {
		color: inherit;
		font: 750 18px / 1.4 var(--font-rounded);
		border-bottom: 2px solid currentColor;
		border-radius: 0;
		min-height: 44px;
		margin-top: 20px;
		padding-block: 8px;
	}
	.copy-status {
		font-size: 18px;
		min-height: 1.5em;
		margin-top: 12px;
	}
	.protocol-note {
		margin-top: 18px;
		font-size: 18px;
	}
	.tool-list > div {
		padding-block: 20px;
		border-bottom: 1px solid #161a1538;
	}
	.tool-list > div:first-child {
		padding-top: 0;
	}
	.tool-list dt {
		font-size: 18px;
		font-weight: 750;
		overflow-wrap: anywhere;
	}
	.tool-list dd {
		margin-top: 8px;
	}
	.landing-footer nav a:hover,
	.landing-footer nav a[aria-current] {
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	@media (max-width: 900px) {
		.info-intro,
		.reading-grid {
			grid-template-columns: minmax(160px, 0.7fr) minmax(0, 2fr);
			gap: 32px;
		}
	}
	@media (max-width: 720px) {
		.section-width {
			width: calc(100% - 32px);
		}
		.landing-header {
			width: calc(100% - 32px);
		}
		.nav-actions {
			grid-row: 1;
			grid-column: 2;
			width: auto;
		}
		.site-nav {
			grid-row: 2;
		}
		.brand-caption {
			display: none;
		}
		.brand {
			gap: 8px;
		}
		.locale-picker > div {
			width: min(238px, calc(100vw - 32px));
		}
		.info-hero {
			padding-block: 44px 36px;
		}
		h1 {
			font-size: clamp(48px, 11.5vw, 82px);
		}
		.info-intro,
		.reading-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 26px;
		}
		.info-intro {
			margin-top: 28px;
		}
		.info-lead {
			grid-column: 1;
		}
		.info-updated {
			max-width: none;
		}
		.reading-grid {
			padding-block: 28px 48px;
			gap: 40px;
		}
		.info-contents {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0 24px;
		}
		.info-contents a,
		.info-contents a:first-child {
			padding-block: 10px;
		}
		.info-article section + section {
			margin-top: 32px;
			padding-top: 28px;
		}
	}
`;

export default Root;
