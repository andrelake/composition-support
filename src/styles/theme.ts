import type { DefaultTheme } from 'styled-components';

/**
 * Standard Studio Dark theme palette.
 * Matches values extracted from GlobalStyle.ts for consistency.
 */
export const theme: DefaultTheme = {
  colors: {
    background: '#121214',
    surface: '#202024',
    surfaceHover: '#29292e',
    primary: '#8257e6',
    primaryLight: '#996DFF',
    text: '#e1e1e6',
    textSecondary: '#a8a8b3',
    border: '#323238',
    
    // Tonality specific
    warm: '#F59E0B', // Amber for Major
    cool: '#3B82F6', // Blue for Minor
  },
  typography: {
    fontBody: '"Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
  },
  breakpoints: {
    mobile: '768px',
  }
};

/**
 * Type definition for the theme to be used with styled-components.
 * This can be extended in styled-components.d.ts
 */
export type Theme = typeof theme;
