import styled from 'styled-components';
import { siteChrome } from '@/components/site-chrome/site-chrome.styles';

const Root = styled.div`
	${siteChrome}
	--page: #fd553a;
	--ink: #161a15;
	--muted: #392015;
	--accent: #f1eadb;
	--line: #762e20;
	color: var(--ink);
	background: var(--page);
	min-height: 100svh;
	font-family: var(--font-rounded);
	font-size: 18px;
	font-weight: 500;
	font-variant-ligatures: none;
	font-feature-settings:
		'liga' 0,
		'clig' 0;
	overflow: clip;
	button,
	a,
	summary {
		-webkit-tap-highlight-color: transparent;
	}
	button {
		color: inherit;
		font: inherit;
	}
	:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 5px;
	}
	.section-width {
		max-width: 1320px;
		width: calc(100% - 48px);
		margin-inline: auto;
	}
	[id] {
		scroll-margin-top: 95px;
	}
	p {
		text-wrap: pretty;
	}
	h1,
	h2,
	h3 {
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.02;
		overflow-wrap: anywhere;
	}
	h2 {
		white-space: pre-line;
		font-size: clamp(44px, 6vw, 80px);
	}
	.eyebrow,
	.hero-edition,
	.purchase-note,
	.explore-link,
	.nav-actions,
	.effects-switch,
	.chapter-index,
	.row-number,
	.fine-print,
	.showcase-topline,
	.gallery-switcher,
	figcaption,
	.detail-index,
	.media-code,
	.media-status,
	.media-placeholder small,
	.landing-footer nav,
	.closing > p {
		font-family: inherit;
		font-weight: 400;
		letter-spacing: 0;
	}
	.eyebrow {
		font-size: 16px;
		line-height: 1.6;
	}
	.glass {
		background: #e9e5dce6;
		border: 1px solid #fff8;
		border-radius: 30px;
		box-shadow:
			inset 0 1px 1px #fff9,
			inset 0 -1px 2px #46342e33,
			0 4px 12px #48231522;
	}
	@supports (backdrop-filter: blur(16px)) {
		.glass {
			background: #efeee5a8;
			backdrop-filter: blur(20px) saturate(1.3);
			-webkit-backdrop-filter: blur(20px) saturate(1.3);
		}
	}
	.hero {
		padding: 28px 0 0;
	}
	.hero-heading {
		padding: 16px 0 24px;
	}
	.hero h1 {
		font-size: clamp(32px, 4.8vw, 66px);
		line-height: 1.06;
		letter-spacing: -0.035em;
		font-weight: 800;
	}
	.hero-wordmark {
		position: relative;
		container-type: inline-size;
		font-family: 'Nunito', ui-rounded, sans-serif;
		font-kerning: none;
		text-align: center;
		color: var(--ink);
		font-size: clamp(170px, 37vw, 500px);
		font-weight: 850;
		line-height: 0.9;
		letter-spacing: 0.015em;
		padding: clamp(32px, 4.5vw, 64px) 0 24px;
		isolation: isolate;
		touch-action: pan-y pinch-zoom;
	}
	.wordmark-fallback {
		color: rgb(255 240 217 / 56%);
		position: relative;
		z-index: 1;
		display: inline-block;
		pointer-events: none;
	}
	.wordmark-baseline {
		display: inline-block;
		width: 0;
		height: 0;
		vertical-align: baseline;
	}
	.wordmark-canvas {
		position: absolute;
		top: 0;
		left: calc(50% - 50vw);
		width: 100vw;
		height: 100%;
		visibility: hidden;
		pointer-events: none;
		z-index: 2;
	}
	.hero-wordmark[data-wordmark-state='ready'] {
		user-select: none;
	}
	.hero-wordmark[data-wordmark-state='ready'] .wordmark-fallback {
		opacity: 0;
	}
	.hero-wordmark[data-wordmark-state='ready'] .wordmark-backdrop {
		visibility: hidden;
	}
	.hero-wordmark[data-wordmark-state='ready'] .wordmark-canvas {
		visibility: visible;
	}
	.hero-wordmark[data-active-letter],
	.hero-wordmark[role='button']:focus-visible {
		cursor: pointer;
	}
	.wordmark-backdrop {
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(50% - 50vw);
		width: 100vw;
		container-type: inline-size;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}
	.wordmark-tape {
		position: absolute;
		top: var(--tape-y);
		left: calc(var(--tape-x) - 100%);
		width: 200%;
		transform-origin: center;
		transform: translateY(-50%) rotate(var(--tape-angle));
		font:
			800 clamp(16px, 1.8cqw, 22px) / 1.9 'Nunito',
			sans-serif;
		letter-spacing: 0;
		white-space: pre;
		text-align: center;
		color: #161a15;
		opacity: var(--tape-opacity);
		background: var(--tape-color);
	}

	.wordmark-tape span {
		position: relative;
		left: 50%;
		display: block;
		width: max-content;
		animation: tape-drift var(--tape-duration) linear infinite var(--tape-direction);
		animation-play-state: paused;
	}
	.hero-wordmark[data-wordmark-visible='true']:not([data-wordmark-state='ready']) .wordmark-tape span {
		animation-play-state: running;
	}
	@keyframes tape-drift {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(calc(-50% - var(--tape-step)));
		}
	}

	.hero-intro {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 50px;
		border-top: 1px solid #963c29;
		padding: 20px 0 28px;
	}
	.hero-intro .hero-description {
		max-width: 440px;
	}
	.hero-copy {
		min-width: 250px;
	}
	.hero-copy .download-button {
		margin-top: 0;
	}
	.hero-description {
		font-size: 22px;
		line-height: 1.4;
		letter-spacing: -0.025em;
		max-width: 440px;
	}
	.download-button {
		display: inline-flex;
		gap: 22px;
		align-items: center;
		padding: 8px 0;
		border-bottom: 1px solid currentColor;
		font-size: 18px;
		font-weight: 750;
		line-height: 1.4;
		text-wrap: balance;
	}
	.download-button:hover {
		border-bottom-width: 2px;
		padding-bottom: 7px;
	}
	.download-button > span {
		font-size: 24px;
		line-height: 1;
	}
	.purchase-note {
		font-size: 16px;
		margin-top: 14px;
		line-height: 1.6;
	}

	.explore-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid var(--line);
		padding-top: 14px;
		margin-top: 22px;
		font-size: 16px;
	}
	.explore-link span {
		font-size: 21px;
	}
	.showcase {
		--view-color: #f5a146;
		position: relative;
	}
	.showcase[data-view='feed'] {
		--view-color: #e9e6cd;
	}
	.showcase[data-view='glance'] {
		--view-color: #db94c3;
	}
	.showcase[data-view='year'] {
		--view-color: #a5b1e4;
	}
	.showcase-topline {
		display: flex;
		justify-content: space-between;
		gap: 15px;
		width: 100%;
		font-size: 16px;
		padding: 13px 0;
		border-top: 1px solid var(--line);
	}
	.showcase-accordion {
		--view-ribbon-width: 84px;
		--feed-size: 0fr;
		--glance-size: 0fr;
		--month-size: 1fr;
		--year-size: 0fr;
		container-type: inline-size;
		display: grid;
		grid-template-columns:
			var(--view-ribbon-width) minmax(0, var(--feed-size))
			var(--view-ribbon-width) minmax(0, var(--glance-size))
			var(--view-ribbon-width) minmax(0, var(--month-size))
			var(--view-ribbon-width) minmax(0, var(--year-size));
		grid-template-rows: minmax(0, 1fr);
		height: 585px;
		border: 2px solid #22261e;
		overflow: hidden;
		transition: grid-template-columns 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.showcase[data-view='feed'] .showcase-accordion {
		--feed-size: 1fr;
		--month-size: 0fr;
	}
	.showcase[data-view='glance'] .showcase-accordion {
		--glance-size: 1fr;
		--month-size: 0fr;
	}
	.showcase[data-view='year'] .showcase-accordion {
		--year-size: 1fr;
		--month-size: 0fr;
	}
	.view-ribbon {
		grid-row: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		min-width: 0;
		padding: 21px 8px 17px;
		border-right: 2px solid #22261e;
		color: #1d241d;
		border-radius: 0;
	}
	.view-ribbon > span:first-child {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		font-size: 56px;
		font-weight: 750;
		letter-spacing: -0.045em;
		line-height: 1;
	}
	.view-ribbon > span:last-child {
		font-size: 61px;
		font-weight: 800;
		letter-spacing: -0.065em;
		line-height: 1;
	}
	.view-ribbon[aria-pressed='true'] {
		box-shadow: inset 0 0 0 2px #ffffff77;
	}
	.view-ribbon:hover {
		filter: brightness(1.045);
	}
	.view-feed {
		background: #e9e6cd;
	}
	.view-glance {
		background: #db94c3;
	}
	.view-month {
		background: #f5a146;
	}
	.view-year {
		background: #a5b1e4;
	}
	.view-panel,
	.view-active-content {
		grid-row: 1;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
	}
	.view-content-layout {
		/* Keep the copy and canvas at their final size while the track opens. */
		width: calc(100cqw - var(--view-ribbon-width) * 4);
		height: 100%;
		padding: 25px 25px 0;
		border-right: 2px solid #22261e;
		display: grid;
		grid-template-columns: minmax(130px, 0.8fr) minmax(210px, 1fr);
		/* The phone can extend below the panel without pushing the caption out. */
		grid-template-rows: minmax(0, 1fr);
		gap: 18px;
		overflow: hidden;
	}
	.view-caption {
		display: flex;
		min-width: 0;
		min-height: 0;
		flex-direction: column;
		align-self: stretch;
		padding-bottom: 24px;
	}
	.view-caption strong {
		font-size: clamp(24px, 3.3vw, 43px);
		letter-spacing: -0.035em;
		font-weight: 750;
		line-height: 1.02;
		animation: view-title-in 180ms ease-out;
	}
	@keyframes view-title-in {
		from {
			opacity: 0.45;
			transform: translateX(8px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	.view-caption p {
		margin-top: auto;
		padding-top: 25px;
		font-size: 17px;
		line-height: 1.32;
	}
	.showcase-stage {
		min-width: 0;
		min-height: 0;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		position: relative;
	}
	.showcase-screen {
		position: relative;
		width: 100%;
		max-width: 295px;
		align-self: flex-start;
	}
	.showcase-screen .media-status {
		top: 6px;
		bottom: auto;
		left: 6px;
		right: 6px;
		font-size: 16px;
		padding: 5px 3px;
		z-index: 2;
	}
	.media-image-button {
		position: relative;
		z-index: 2;
		cursor: zoom-in;
	}
	.media-image-button:focus-visible {
		outline: 2px solid #f6e7c0;
		outline-offset: -6px;
	}
	.chapter-index {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-bottom: 1px solid var(--line);
	}
	.chapter-index a {
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 16px;
		padding: 20px;
		transition: background-color 140ms ease;
	}
	.chapter-index a[data-chapter='search'] {
		--chapter-color: #f5a242;
	}
	.chapter-index a[data-chapter='analytics'],
	.chapter-index a[data-chapter='timeline'] {
		--chapter-color: #cfdb8c;
	}
	.chapter-index a[data-chapter='filters'] {
		--chapter-color: #aaaee4;
	}
	.chapter-index a:active {
		background: var(--chapter-color);
	}
	@media (hover: hover) {
		.chapter-index a:hover {
			background: var(--chapter-color);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.chapter-index a {
			transition: none;
		}
	}
	.chapter-index a + a {
		border-left: 1px solid var(--line);
	}
	.chapter-index a span:last-child {
		margin-left: auto;
	}
	.story-section {
		padding-block: 75px;
	}
	.section-intro {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 20px 75px;
		margin-bottom: 40px;
	}
	.section-intro .eyebrow {
		grid-column: 1 / -1;
	}
	.section-description {
		font-size: 23px;
		line-height: 1.4;
		max-width: 460px;
	}
	.discovery-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 75px;
		align-items: center;
	}
	.search-visual > div,
	.filter-visual > div {
		border-radius: 0;
		border-color: #272923;
	}
	.search-visual > div {
		aspect-ratio: 4 / 3;
	}
	.search-visual figcaption,
	.filter-visual figcaption {
		display: flex;
		justify-content: space-between;
		padding-top: 12px;
		font-size: 16px;
	}
	.search-notes > div + div {
		margin-top: 30px;
	}
	.search-notes h3 {
		font-size: 25px;
		font-weight: 750;
		line-height: 1.15;
		letter-spacing: -0.025em;
		margin-bottom: 8px;
	}
	.search-notes p {
		font-size: 18px;
		line-height: 1.5;
		max-width: 420px;
	}

	.fine-print {
		color: var(--muted);
		font-size: 16px !important;
		line-height: 1.7;
		margin-top: 20px;
	}
	.media-disclosure {
		margin-top: 28px;
	}
	.media-disclosure summary {
		width: fit-content;
		padding-block: 8px;
		cursor: pointer;
		list-style: none;
		font-size: 16px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	.media-disclosure summary::-webkit-details-marker {
		display: none;
	}
	.media-disclosure summary > span {
		font-size: 22px;
	}
	.media-disclosure[open] summary > span {
		transform: rotate(45deg);
	}

	.recording-slot {
		width: min(100%, 300px);
		margin: 10px auto 25px;
	}
	.analytics {
		background: #eae4d3;
		--ink: #20251d;
		--muted: #5f6157;
		--line: #797d6b;
		color: var(--ink);
	}
	.analytics-heading {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 50px;
		margin-bottom: 40px;
	}
	.analytics-heading .eyebrow {
		margin-bottom: 24px;
	}
	.analytics-heading .section-description {
		max-width: 310px;
		font-size: 21px;
	}
	.analytics-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 36px;
	}
	.analytics .phone-preview {
		position: relative;
		aspect-ratio: 3 / 4;
		background: #cfdb8c;
	}
	.analytics .phone-preview .iphone-frame {
		position: absolute;
		left: 50%;
		top: 50%;
		width: auto;
		height: calc(100% - 48px);
		max-height: 660px;
		transform: translate(-50%, -50%);
	}
	.analytics .breakdown .phone-preview {
		background: #aaaee4;
	}
	.gallery-switcher {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 28px;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--line);
	}
	.gallery-switcher button {
		padding: 10px 0 12px;
		font-size: 18px;
		font-weight: 700;
		border-radius: 0;
		border-bottom: 3px solid transparent;
		margin-bottom: -1px;
	}
	.gallery-switcher button[aria-pressed='true'] {
		border-bottom-color: currentColor;
	}
	.gallery-switcher button:hover {
		border-bottom-color: currentColor;
	}

	.media-gallery > div[data-media-id],
	.breakdown > div[data-media-id] {
		border-radius: 0;
	}
	.gallery-caption {
		font-size: 19px;
		line-height: 1.45;
		margin-top: 17px;
		min-height: 64px;
		max-width: 460px;
	}
	.breakdown {
		padding-top: 0;
	}
	.breakdown > .eyebrow {
		min-height: 46px;
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--line);
	}
	.analytics-note {
		padding-top: 18px;
		border-top: 1px solid var(--line);
	}
	.filters {
		background: #aaaee4;
		--ink: #20251d;
		--muted: #3e4158;
		color: var(--ink);
	}
	.filter-story {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 70px;
		align-items: center;
	}
	.filter-copy h2 {
		margin-block: 24px;
		white-space: pre-line;
	}
	.timeline {
		background: #cfdb8c;
		--ink: #20251d;
		--muted: #4c5435;
		color: var(--ink);
	}
	.timeline-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 65px;
		align-items: center;
	}
	.timeline-visual {
		width: min(100%, 340px);
		justify-self: center;
	}
	.timeline-visual figcaption {
		font-size: 16px;
		line-height: 1.4;
		margin-top: 20px;
	}
	.timeline h2 {
		margin-top: 24px;
	}
	.timeline-copy {
		padding-top: 39px;
	}
	.timeline-events {
		font-size: 20px;
		line-height: 1.4;
		margin-top: 22px;
	}
	.everyday {
		background: var(--page);
	}
	.everyday h2 {
		margin-top: 25px;
	}
	.everyday-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.75fr;
		gap: 100px;
		margin-top: 45px;
	}
	.detail-list > div {
		padding-block: 22px;
		border-top: 1px solid var(--line);
	}
	.detail-list dt {
		font-size: 32px;
		font-weight: 750;
		letter-spacing: -0.035em;
		line-height: 1.05;
	}
	.detail-list dd {
		font-size: 20px;
		line-height: 1.4;
		margin-top: 10px;
		max-width: 420px;
	}
	.appearance {
		max-width: 300px;
		width: 100%;
		justify-self: center;
	}
	.appearance .gallery-switcher {
		margin-inline: auto;
		gap: 12px 20px;
	}
	.appearance .gallery-switcher button {
		font-size: 16px;
		padding-inline: 0;
	}
	.appearance h3 {
		font-size: 31px;
		margin-top: 22px;
		font-weight: 750;
	}
	.appearance > p {
		font-size: 20px;
		margin-top: 12px;
		line-height: 1.4;
	}
	.pricing {
		background: #22261f;
		--ink: #ecebdc;
		--muted: #aaa99b;
		--line: #878d79;
		color: var(--ink);
	}
	.pricing-intro h2 {
		margin-top: 25px;
	}
	.pricing-intro > p:last-child {
		margin-top: 25px;
		font-size: 22px;
		line-height: 1.4;
		max-width: 720px;
		color: #c2c3b3;
	}
	.pricing-table {
		width: 100%;
		margin-top: 50px;
		border-collapse: collapse;
		table-layout: fixed;
		text-align: left;
	}
	.pricing-feature-column {
		width: 34%;
	}
	.pricing-table thead th {
		padding: 0 24px 24px;
		border-bottom: 1px solid var(--line);
		font-size: 36px;
		font-weight: 750;
		letter-spacing: -0.035em;
		line-height: 1.15;
		vertical-align: top;
	}
	.pricing-table thead th:last-child {
		color: #fb8057;
	}
	.pricing-table th small {
		display: block;
		margin-top: 10px;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		color: #c2c3b3;
		letter-spacing: 0;
	}
	.pricing-price {
		position: relative;
		isolation: isolate;
		display: inline-block;
		margin-top: 10px;
		padding: 4px 9px 6px;
		background: transparent;
		color: #161a15;
		font-size: clamp(20px, 2.5vw, 32px);
		font-weight: 850;
		line-height: 1.15;
		white-space: nowrap;
	}
	.pricing-price::before {
		content: '';
		position: absolute;
		inset: 0 -3px;
		z-index: -1;
		background: #e6ee91;
		transform: rotate(-2deg);
		clip-path: polygon(1% 7%, 98% 0, 100% 89%, 3% 100%, 0 73%);
	}
	.pricing-price sup {
		font-size: 0.55em;
		vertical-align: super;
		margin-left: 2px;
	}
	#pricing-region-note {
		margin-bottom: 10px;
	}
	.pricing-table tbody th,
	.pricing-table tbody td {
		border-bottom: 1px solid var(--line);
		padding: 22px 24px;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.45;
		vertical-align: top;
		overflow-wrap: anywhere;
	}
	.pricing-table tbody th {
		color: #c2c3b3;
	}
	.pricing-table tbody td {
		font-weight: 650;
	}
	.pricing-table th:first-child {
		padding-left: 0;
	}
	.pricing-table th:last-child,
	.pricing-table td:last-child {
		padding-right: 0;
	}
	.pricing-bottom {
		margin-top: 26px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 36px;
	}
	.pricing-bottom p {
		font-size: 16px;
		max-width: 390px;
		color: #c2c3b3;
		line-height: 1.6;
	}
	.pricing-bottom .download-button {
		margin: 0;
		flex-shrink: 0;
	}
	.pricing-support {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: 24px 60px;
		margin-top: 44px;
		padding-top: 30px;
		border-top: 1px solid var(--line);
	}
	.pricing-support h3 {
		font-size: clamp(26px, 3vw, 36px);
		line-height: 1.1;
		color: #e6ee91;
		text-wrap: balance;
	}
	.pricing-support p {
		max-width: 60ch;
		font-size: 20px;
		line-height: 1.5;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.closing {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
		padding-block: 70px;
	}
	.closing h2 {
		font-size: clamp(55px, 7.2vw, 100px);
	}
	.closing-links {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 24px 48px;
	}
	.closing-links > a {
		justify-self: start;
		font-size: 21px;
		display: flex;
		align-items: center;
		gap: 25px;
		border-bottom: 1px solid var(--ink);
		padding-bottom: 6px;
	}
	@media (min-width: 721px) {
		&[lang='ja'] .view-ribbon > span:first-child {
			transform: none;
			text-orientation: upright;
			letter-spacing: 0;
		}
	}

	@media (max-width: 1050px) {
		.hero h1 {
			font-size: 6vw;
		}
		.hero-description {
			font-size: 19px;
		}
		.showcase-accordion {
			--view-ribbon-width: 63px;
		}
		.view-ribbon > span:first-child {
			font-size: 50px;
		}
		.view-ribbon > span:last-child {
			font-size: 49px;
		}
		.view-content-layout {
			grid-template-columns: 1fr;
			grid-template-rows: auto minmax(0, 1fr);
			padding: 22px 20px 0;
			gap: 22px;
		}
		.view-caption {
			flex-direction: row;
			gap: 25px;
			padding-bottom: 0;
		}
		.view-caption strong {
			font-size: 31px;
			width: 45%;
		}
		.view-caption p {
			margin: 0;
			padding: 0;
			font-size: 16px;
			width: 55%;
		}
		.showcase-screen {
			max-width: 245px;
		}
		.section-intro,
		.discovery-grid,
		.analytics-grid,
		.timeline-grid,
		.filter-story {
			gap: 35px;
		}
		.everyday-grid {
			gap: 55px;
		}
		.section-description {
			font-size: 21px;
		}
	}
	@media (max-width: 720px) {
		.section-width {
			width: calc(100% - 28px);
		}

		.hero {
			padding-top: 28px;
		}
		.hero-heading {
			padding-block: 8px 24px;
		}
		.hero-wordmark {
			font-size: 38vw;
			line-height: 0.9;
			letter-spacing: 0.015em;
			padding-block: 28px 16px;
		}

		.hero-intro {
			flex-direction: column;
			gap: 22px;
			padding-top: 17px;
		}
		.hero-intro .hero-description {
			max-width: 360px;
			font-size: 20px;
		}
		.eyebrow {
			font-size: 16px;
		}
		.hero-edition {
			font-size: 16px;
		}
		.hero h1 {
			font-size: 8.5vw;
			line-height: 1.06;
		}
		.hero-copy {
			margin: 0;
			min-width: 0;
		}
		.hero-description {
			max-width: 335px;
			font-size: 22px;
		}
		.hero .download-button {
			font-size: 17px;
		}
		.purchase-note {
			font-size: 16px;
		}
		.explore-link {
			margin-top: 18px;
			padding-top: 13px;
			font-size: 16px;
		}
		.showcase-topline {
			font-size: 16px;
		}
		.showcase-accordion {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			grid-template-rows: auto auto;
			height: auto;
		}
		.view-panel {
			display: none;
		}
		.view-ribbon {
			grid-column: auto !important;
			padding: 12px 6px 10px;
			gap: 12px;
			min-width: 0;
		}
		.view-ribbon > span:first-child {
			writing-mode: horizontal-tb;
			transform: none;
			font-size: 20px;
		}
		.view-ribbon > span:last-child {
			font-size: 18px;
		}
		.view-active-content {
			grid-row: 2;
			grid-column: 1 / -1 !important;
			background: var(--view-color);
			border-top: 2px solid #22261e;
		}
		.view-content-layout {
			width: 100%;
			border-right: 0;
			padding: 20px 18px 0;
			height: 615px;
			grid-template-rows: auto minmax(0, 1fr);
		}
		.view-caption strong {
			font-size: 28px;
		}
		.view-caption p {
			font-size: 16px;
		}
		.showcase-screen {
			max-width: 278px;
		}
		.chapter-index {
			grid-template-columns: 1fr;
		}
		.chapter-index a {
			padding-block: 17px;
		}
		.chapter-index a + a {
			border-left: 0;
			border-top: 1px solid var(--line);
		}
		.chapter-index a span:last-child {
			margin-right: 0;
		}
		.story-section {
			padding-block: 55px;
		}
		h2 {
			font-size: 45px;
		}
		.section-intro,
		.discovery-grid,
		.analytics-grid,
		.timeline-grid,
		.filter-story,
		.everyday-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.section-description {
			font-size: 22px;
		}
		.section-intro {
			margin-bottom: 30px;
		}
		.search-notes h3 {
			font-size: 25px;
		}
		.search-notes p {
			font-size: 18px;
		}
		.analytics-heading {
			display: block;
		}
		.analytics-heading .section-description {
			margin-top: 25px;
			max-width: none;
		}
		.timeline-copy {
			padding-top: 0;
		}
		.detail-list dt {
			font-size: 29px;
		}
		.appearance {
			margin-top: 10px;
			max-width: 295px;
		}
		.pricing-table {
			margin-top: 36px;
		}
		.pricing-feature-column {
			width: 32%;
		}
		.pricing-table thead th {
			font-size: clamp(20px, 5.6vw, 30px);
			padding: 0 8px 20px;
		}
		.pricing-table th small {
			font-size: 16px;
			line-height: 1.4;
		}
		.pricing-table tbody th,
		.pricing-table tbody td {
			font-size: 16px;
			padding: 18px 8px;
		}
		.pricing-table th:first-child {
			padding-left: 0;
		}
		.pricing-table th:last-child,
		.pricing-table td:last-child {
			padding-right: 0;
		}
		.pricing-bottom {
			flex-direction: column;
			gap: 20px;
		}
		.pricing-bottom .download-button {
			font-size: 17px;
		}
		.pricing-support {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.pricing-support p {
			font-size: 18px;
		}

		.closing {
			grid-template-columns: 1fr;
			gap: 18px 20px;
			padding-block: 55px;
		}
		.closing h2 {
			font-size: clamp(32px, 9.5vw, 48px);
		}
		.closing > a {
			grid-column: 1;
			font-size: 17px;
		}
		&[lang='ru'] h1,
		&[lang='kk'] h1,
		&[lang='es'] h1 {
			font-size: 9vw;
		}
		&[lang='ja'] h1 {
			font-size: 9vw;
		}
		&[lang='ja'] h2 {
			font-size: 39px;
		}
	}
	@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
		.glass {
			background: #ede9de;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}
	}
	@media (prefers-contrast: more) {
		--muted: #392015;
		--line: #3a2318;
		.fine-print {
			color: var(--ink);
		}
	}
	&[data-simple='true'] .glass {
		background: #ede9de;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}

	&[data-simple='true'] *,
	&[data-simple='true'] *::before,
	&[data-simple='true'] *::after {
		transition: none !important;
		animation: none !important;
	}
`;
export default Root;
