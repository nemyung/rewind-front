import { createGlobalStyle } from 'styled-components';

export const theme = {};

export const media = {};

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing:border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }
`;
