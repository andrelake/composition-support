# Dashboard Components

This directory contains the core UI components for displaying music theory data derived from the `useAppStore`.

## Components

### 1. `ScaleRefCard.tsx`
Displays the notes of the selected scale (Current Key).
- **Features**: Highlights the root note.

### 2. `HarmonicFieldCard.tsx`
Displays the diatonic chords available in the current key.
- **Layout**: Grid based.
- **Data**: Shows chord name and degree (I, ii, etc.).

### 3. `CadenceCard.tsx`
Lists common chord progressions for the current key.
- **Types**: Pop, Jazz, Classical (based on `constants.ts`).

### 4. `Dashboard.tsx`
The main composition container that organizes the above cards.
- **Responsiveness**: Stacks vertically on mobile, optional grid on larger screens.

## Usage

```tsx
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return <Dashboard />;
}
```
