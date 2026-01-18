# Layout Components

This directory contains components responsible for the macro-structure of the application.

## `MainLayout`

The primary shell of the application. It enforces the "Header -> Content -> Footer" flow and the responsive Grid/Stack behavior specified in the design docs.

### Responsive Behavior
The `<Content>` section uses a CSS Grid approach:
*   **Mobile (< 768px):** Flex Column. Items stack vertically.
*   **Desktop (>= 768px):** Grid with `350px 1fr` columns. The first child (Controller/Roulette) takes the fixed left column, the second child (Data Deck) takes the remaining space.

### Usage

```tsx
import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <MainLayout
      header={<div>My Logo</div>}
      footer={<div>© 2026</div>}
    >
      {/* First Child: Left Column / Top on Mobile */}
      <section id="controller">
        <Roulette />
      </section>

      {/* Second Child: Right Column / Bottom on Mobile */}
      <section id="data-deck">
        <InfoCards />
      </section>
    </MainLayout>
  );
}
```
