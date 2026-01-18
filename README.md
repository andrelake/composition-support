# Composition Support Dashboard
> **Your digital companion for breaking writer's block and simplifying music theory.**

The **Composition Support Dashboard** is a responsive web application designed for composers, songwriters, and musicians. It acts as an instant reference tool and idea generator, effectively removing the friction between your creativity and the theoretical rules of music.

Whether you are staring at a blank page or looking to spice up a progression, this dashboard provides the harmonic context you need—instantly.

---

## 🎵 Key Features

### 1. The Inspiration Roulette
Stuck in a rut? Use our **Circle of Fifths Roulette** to gamify your starting point.
-   **Spin to Decide:** Let the app randomly select a Root Note and Tonality (Major/Minor) for you.
-   **Break Habits:** Forces you out of your comfort zone (e.g., C Major) into exploring new keys (e.g., F# Melodic Minor).

### 2. Comprehensive Harmonic Context
Get a complete view of the harmonic possibilities, not just the basics.
-   **Smart Harmonic Fields:** We display the chords for your **Selected Key** alongside:
    -   **Parallel Key:** Instantly see the parallel Major/Minor for easy modulation.
    -   **Melodic & Harmonic Minor:** Automatically calculated for the current root, perfect for borrowing chords and modal interchange.
-   **Scale Reference:** Visual display of all notes in the scale, properly spelled with sharps and flats.

### 3. Cadence Dictionary
Don't know where to go next?
-   **Instant Progressions:** The app calculates 3 common cadences transposed to your selected key:
    -   **Pop:** The classic I-V-vi-IV.
    -   **Jazz:** The essential ii-V-I.
    -   **Classical:** The foundational I-IV-V-I.

### 4. International Support
-   Fully localized for **English**, **Portuguese (BR)**, and **Spanish**.

---

## 📖 User Manual

### Getting Started
1.  **Launch the App:** Open the dashboard in your browser.
2.  **Spin the Wheel:** Click the main **Spin** button to let the Roulette pick a random key for you.
3.  **Manual Toggle:**
    -   Want to explore the "other side" of the same note?
    -   Click the **"Switch to Minor"** (or Major) button on the Scale Card. This keeps the root (e.g., "D") but flips the tonality, updating all chords and scales immediately.

### Understanding the Data
-   **Harmonic Field Card:** This list shows you 4 rows of chords.
    -   *Selected:* These are your safe, diatonic chords.
    -   *Parallel:* Use these to borrow chords (e.g., borrowing a bVI from the minor while in a major key).
    -   *Harmonic/Melodic:* Use these for more tension and advanced "jazzier" flavors.
-   **Degrees:** The roman numerals (I, ii, V7) above each chord tell you the harmonic function of that chord.

---

## 💻 Development & Technical Setup

This project is built with **React**, **TypeScript**, and **Vite**.

### Prerequisites
-   Node.js (v18+ recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/andrelake/composition-support.git
    cd composition-support/web
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    npm ci
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

### Architecture
-   **State Management:** `zustand` with persistence.
-   **Styling:** `styled-components`.
-   **I18n:** `react-i18next`.
-   **Music Theory Engine:** Custom TypeScript engine in `lib/music-theory/engine.ts`.
