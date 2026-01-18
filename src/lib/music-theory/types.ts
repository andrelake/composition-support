export type Note = 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export type Tonality = 'Major' | 'Minor';

export interface KeyConfig {
  root: Note;
  tonality: Tonality;
}

export interface Scale {
  root: Note;
  notes: Note[];
  tonality: Tonality;
}

export interface Chord {
  name: string;        // e.g., "Cmaj7"
  root: Note;
  quality: string;     // e.g., "Major", "Minor", "Diminished"
  notes: Note[];       // The constituent notes
  degree: string;      // Roman numeral: I, ii, V7, etc.
}

export interface HarmonyResult {
  key: KeyConfig;
  scale: Note[];
  chords: Chord[];     // The 7 diatonic chords
  cadences: Chord[][]; // The 3 suggested cadences
}
