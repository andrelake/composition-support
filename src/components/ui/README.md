# UI Atoms

This directory contains the basic building blocks (atoms) of the User Interface.
These components are designed to be dumb, presentational components that can be composed to build more complex features.

## Components

### `Card`
A generic container with background, border, and shadow. Used to wrap distinct sections of the application.

```tsx
import { Card } from './components/ui/Card';

<Card>
  <Content />
</Card>
```

### `Button`
Primary and Secondary interaction buttons.

```tsx
import { Button } from './components/ui/Button';

// Primary
<Button onClick={handleClick}>Spin</Button>

// Secondary
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
```

### `Typography`
Standardized text components to ensure consistency across the app.

*   `Title`: Large section headings (h2).
*   `Subtitle`: Smaller sub-headings (h3).
*   `NoteText`: Helper text or descriptions (p).
*   `MonoText`: Monospace span for musical notation.

```tsx
import { Title, NoteText } from './components/ui/Typography';

<Title>Harmonic Field</Title>
<NoteText>Select a key to see results</NoteText>
```
