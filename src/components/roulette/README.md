# Roulette Components

This directory contains the components for the Circle of Fifths roulette wheel feature.

## Components

### `WheelCanvas`
Visualization of the Circle of Fifths. It renders an SVG with 12 segments corresponding to the keys.
- **Props**:
  - `rotation` (number): Current rotation in degrees.
  - `currentKey` (string): The root note of the active key to highlight.

### `SpinButton`
A central CTA button to trigger rotation.
- **Props**:
  - `onSpin` (function): Handler for click.
  - `isSpinning` (boolean): Disabled state.

### `RouletteContainer`
The smart container that connects to `useAppStore` and manages the physics/animation of the roulette.
- Validates the random key against the 12 Circle of Fifths segments.
- Calculates correct rotation to land on the selected key.
- Uses `framer-motion` for smooth deceleration.

## Usage

```tsx
import { RouletteContainer } from './components/roulette/RouletteContainer';

const App = () => (
  <div>
    <RouletteContainer />
  </div>
);
```

## Logic
Visualizes the 12 keys of the Circle of Fifths.
0° (Top) is aligned to 'C'.
Clockwise segments follow the circle (G, D, A...).
Animation logic calculates the delta required to land the selected segment at 0°.
