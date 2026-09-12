import { css } from 'styled-components';

export const siteChrome = css`
	.landing-header {
		width: calc(100% - 48px);
		max-width: 1320px;
		margin: auto;
		padding-block: 20px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 24px;
		position: relative;
		z-index: 50;
	}

	.brand-lockup {
		position: relative;
		min-width: 0;
		max-width: calc(100% - 136px);
		flex: 0 1 auto;
	}
	.brand {
		display: inline-flex;
		max-width: 100%;
		align-items: center;
		gap: 12px;
		font-size: 26px;
		font-weight: 850;
		letter-spacing: 0.025em;
		line-height: 1;
	}
	.brand img {
		width: 44px;
		height: auto;
		flex-shrink: 0;
	}
	.brand-type {
		display: flex;
		min-width: 0;
		flex-direction: column;
		gap: 7px;
	}
	.brand-caption {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}
	.footer-brand {
		display: flex;
		gap: 16px;
		align-items: center;
	}

	.site-nav {
		--nav-gap: 22px;
		position: relative;
		flex: 1 1 112px;
		min-width: 112px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		align-items: center;
		gap: var(--nav-gap);
	}
	.site-nav > a,
	.site-nav-measure-row > span {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		line-height: 1.25;
		white-space: nowrap;
		padding-block: 10px;
		font-size: 16px;
		font-weight: 600;
		text-underline-offset: 6px;
	}
	.site-nav > a[hidden] {
		display: none;
	}
	.site-nav-measure {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
		visibility: hidden;
		pointer-events: none;
	}
	.site-nav-measure-row {
		display: flex;
		gap: var(--nav-gap);
		width: max-content;
	}
	.site-nav .nav-unlimited {
		padding-inline: 8px;
		font-weight: 850;
	}
	.nav-unlimited span {
		position: relative;
		isolation: isolate;
		padding: 3px 7px 5px;
		margin-inline: -4px;
		color: #161a15;
	}
	.nav-unlimited span::before {
		content: '';
		position: absolute;
		inset: 0 -3px;
		z-index: -1;
		background: #e6ee91;
		transform: rotate(-2deg);
		clip-path: polygon(1% 7%, 98% 0, 100% 89%, 3% 100%, 0 73%);
	}
	.site-nav a:hover {
		text-decoration: underline;
	}
	.nav-actions {
		flex: 0 0 auto;
		max-width: 100%;
		margin-inline-start: auto;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 16px;
	}
	.effects-switch,
	.locale-picker summary {
		min-height: 46px;
		padding: 10px 14px;
		border: 2px solid var(--ink);
		font-size: 16px;
		font-weight: 750;
		line-height: 1.25;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.effects-switch {
		background: var(--ink);
		color: #f1eadb;
	}
	.effects-switch:hover {
		background: #353e33;
	}
	.effects-indicator {
		width: 10px;
		height: 10px;
		flex-shrink: 0;
		background: #dbe696;
		border: 1px solid currentColor;
	}
	.effects-switch[aria-pressed='true'] .effects-indicator {
		background: transparent;
	}
	.locale-picker {
		position: relative;
	}
	.locale-picker summary {
		cursor: pointer;
		list-style: none;
		background: transparent;
	}
	.locale-picker summary::-webkit-details-marker {
		display: none;
	}
	.locale-picker[open] summary {
		background: #f1eadb;
	}
	.locale-picker-chevron {
		display: block;
		width: 18px;
		height: 18px;
		flex: 0 0 18px;
		transform-origin: center;
		transition: transform 160ms ease;
	}
	.locale-picker[open] .locale-picker-chevron {
		transform: rotate(180deg);
	}
	@media (prefers-reduced-motion: reduce) {
		.locale-picker-chevron {
			transition: none;
		}
	}
	.locale-picker > div {
		position: absolute;
		right: 0;
		top: calc(100% + 8px);
		border: 2px solid var(--ink);
		background: #f1eadb;
		width: 238px;
	}
	.locale-picker a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		min-height: 48px;
		padding: 10px 16px;
		font-weight: 600;
	}
	.locale-picker a + a {
		border-top: 1px solid #20231d38;
	}
	.locale-picker a > span {
		font-size: 16px;
	}
	.locale-picker a:hover {
		background: #dcd9cb;
	}
	.locale-picker a[aria-current] {
		font-weight: 850;
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.skip-link {
		position: fixed;
		top: 10px;
		left: 10px;
		transform: translateY(-160%);
		padding: 12px 18px;
		background: #fff;
		color: #111;
		z-index: 100;
	}
	.skip-link:focus {
		transform: none;
	}
	.landing-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 25px;
		padding: 26px 0;
	}
	.landing-footer > p {
		flex: 1 1 220px;
		font-size: 16px;
	}
	.landing-footer nav {
		display: flex;
		gap: 18px;
		flex-wrap: wrap;
		margin-left: auto;
	}
	.landing-footer nav a {
		font-size: 16px;
	}
	@media (max-width: 720px) {
		.landing-header {
			width: calc(100% - 28px);
			padding-block: 14px;
			gap: 8px 14px;
		}
		.brand {
			font-size: 26px;
		}
		.brand img {
			width: 38px;
		}
		.nav-actions {
			flex-basis: 100%;
			width: 100%;
			align-items: stretch;
		}
		.nav-actions > * {
			flex: 1 1 0;
			min-width: 0;
		}
		.locale-picker summary {
			height: 100%;
		}
		.effects-switch,
		.locale-picker summary {
			padding-inline: 10px;
		}
		.site-nav {
			--nav-gap: 14px;
		}
		.landing-footer {
			gap: 18px;
			padding-bottom: calc(28px + env(safe-area-inset-bottom));
		}
		.landing-footer > p {
			font-size: 16px;
		}
		.landing-footer nav {
			margin: 0;
			gap: 18px 25px;
		}
	}
	@media (max-width: 480px) {
		.landing-header .brand-caption {
			display: none;
		}
	}
`;
