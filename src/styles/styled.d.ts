import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      surfaceHover: string;
      primary: string;
      primaryLight: string;
      text: string;
      textSecondary: string;
      border: string;
      warm: string;
      cool: string;
    };
    typography: {
      fontBody: string;
      fontMono: string;
    };
    breakpoints: {
      mobile: string;
    };
  }
}
