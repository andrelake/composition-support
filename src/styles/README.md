# Styles

This directory contains the global styling foundations for the application.

## Files

*   **`GlobalStyle.ts`**: Contains the global CSS reset and base styles (body, scrollbars).
*   **`theme.ts`**: Defines the `theme` object (colors, typography, breakpoints) used by styled-components theme provider.

## Usage

The `theme` object should be passed to the `<ThemeProvider>` at the root of the application (usually in `App.tsx` or `main.tsx`).

```typescript
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* App Content */}
    </ThemeProvider>
  );
}
```
