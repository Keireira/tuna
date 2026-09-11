'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 200 1000;
    font-display: swap;
    src: url('/assets/fonts/nunito-variable.ttf') format('truetype');
  }

  :root {
    --font-rounded: ui-rounded, 'Nunito', 'Hiragino Maru Gothic ProN', system-ui, sans-serif;
  }

  html:lang(ja) {
    --font-rounded: 'Hiragino Maru Gothic ProN', ui-rounded, 'Nunito', system-ui, sans-serif;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-rounded);
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    line-height: 1.6;
    font-variant-ligatures: none;
    font-feature-settings: 'liga' 0, 'clig' 0;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  main a,
  main button,
  main input,
  main select,
  main textarea,
  main [role="button"] {
    pointer-events: auto;
  }

  ::selection {
    background: ${({ theme }) => theme.accentLight};
    color: ${({ theme }) => theme.accent};
  }
`;

export default GlobalStyles;
