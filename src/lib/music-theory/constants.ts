import { Note } from './types';

export const CHROMATIC_SCALE: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// Flat equivalents for display/theory correctness (simplified for MVP, can be expanded)
export const CHROMATIC_SCALE_FLATS: Note[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const CIRCLE_OF_FIFTHS: Note[] = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'
];

// Semitone intervals from root
export const INTERVALS = {
  MAJOR: [0, 2, 4, 5, 7, 9, 11],
  MINOR: [0, 2, 3, 5, 7, 8, 10], // Natural Minor
};

export const CHORD_PATTERNS = {
  // Intervals within the scale degree to build chords (Root, 3rd, 5th, 7th)
  TRIAD: [0, 2, 4], 
  SEVENTH: [0, 2, 4, 6]
};

// Common Cadences (Degrees usually 0-indexed in code: 0=I, 1=ii, 4=V, 5=vi)
// Represented as indices of the diatonic chords array
export const CADENCES = {
  POP: [0, 4, 5, 3],  // I-V-vi-IV
  JAZZ: [1, 4, 0],    // ii-V-I
  BASIC: [0, 3, 4, 0] // I-IV-V-I
};

// I18N Keys (Logic returns these, UI translates them)
export const I18N_KEYS = {
  TONALITY: {
    MAJOR: 'tonality.major',
    MINOR: 'tonality.minor'
  },
  QUALITIES: {
    MAJOR: 'quality.major',
    MINOR: 'quality.minor',
    DIMINISHED: 'quality.diminished',
    AUGMENTED: 'quality.augmented'
  }
};
