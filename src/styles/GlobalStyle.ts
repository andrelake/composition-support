import { createGlobalStyle } from 'styled-components';

export const theme = {
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

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontBody};
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  /* Scrollbar for webkit */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background}; 
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border}; 
    border-radius: 3px;
  }
`;
