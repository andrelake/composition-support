import type { Note, Tonality, Chord, KeyConfig, HarmonyResult } from './types';
import { CHROMATIC_SCALE, CHROMATIC_SCALE_FLATS, CIRCLE_OF_FIFTHS, INTERVALS, CADENCES, I18N_KEYS } from './constants';

/**
 * Helper to get efficient chromatic index
 */
const getNoteIndex = (note: Note): number => {
  let idx = CHROMATIC_SCALE.indexOf(note);
  if (idx === -1) idx = CHROMATIC_SCALE_FLATS.indexOf(note);
  return idx;
};

/**
 * Returns the correct note name for the key context (simple sharp/flat handler)
 * For MVP: We mostly stick to the circle definitions. 
 * Improvements: logic to detecting if a key needs sharps or flats specifically.
 */
const getNoteAtInterval = (rootIndex: number, semitones: number, useFlats: boolean): Note => {
  const normalizedIndex = (rootIndex + semitones) % 12;
  return useFlats ? CHROMATIC_SCALE_FLATS[normalizedIndex] : CHROMATIC_SCALE[normalizedIndex];
};

/**
 * Determins if we should utilize flats based on the root note
 * Heuristic: F, Bb, Eb, Ab, Db, Gb use flats. Others sharps.
 */
const shouldUseFlats = (root: Note): boolean => {
    return ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'].includes(root);
};

export const getScale = (root: Note, tonality: Tonality): Note[] => {
  const rootIdx = getNoteIndex(root);
  // Default Minor to flats if C minor or "flatter"? For now, stick to major logic + minor relative.
  // Simple heuristic for MVP:
  const flatKeys = shouldUseFlats(root); // Broad simplification
  
  let intervals = INTERVALS.MAJOR;
  if (tonality === 'Minor') intervals = INTERVALS.MINOR;
  else if (tonality === 'Harmonic Minor') intervals = INTERVALS.HARMONIC_MINOR;
  else if (tonality === 'Melodic Minor') intervals = INTERVALS.MELODIC_MINOR;
  
  return intervals.map(interval => getNoteAtInterval(rootIdx, interval, flatKeys));
};


export const getDiatonicChords = (scale: Note[], tonality: Tonality): Chord[] => {
  // Pattern of qualities for Diatonic Chords
  // Major Key: I(Maj), ii(min), iii(min), IV(Maj), V(Maj), vi(min), vii(dim)
  // Minor Key: i(min), ii(dim), III(Maj), iv(min), v(min), VI(Maj), VII(Maj) 
  
  const qualitiesMajor = [
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'I' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'ii' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'iii' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'IV' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'V' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'vi' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'vii°' }
  ];

  const qualitiesMinor = [
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'i' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'ii°' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'III' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'iv' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'v' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'VI' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'VII' }
  ];

  const qualitiesHarmonic = [
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'i' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'ii°' },
    { type: 'aug', i18n: I18N_KEYS.QUALITIES.AUGMENTED, degree: 'III+' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'iv' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'V' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'VI' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'vii°' }
  ];

  const qualitiesMelodic = [
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'i' },
    { type: 'min', i18n: I18N_KEYS.QUALITIES.MINOR, degree: 'ii' },
    { type: 'aug', i18n: I18N_KEYS.QUALITIES.AUGMENTED, degree: 'III+' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'IV' },
    { type: 'Maj', i18n: I18N_KEYS.QUALITIES.MAJOR, degree: 'V' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'vi°' },
    { type: 'dim', i18n: I18N_KEYS.QUALITIES.DIMINISHED, degree: 'vii°' }
  ];

  let qualities = qualitiesMajor;
  if (tonality === 'Minor') qualities = qualitiesMinor;
  else if (tonality === 'Harmonic Minor') qualities = qualitiesHarmonic;
  else if (tonality === 'Melodic Minor') qualities = qualitiesMelodic;

  return scale.map((rootNote, index) => {
    const q = qualities[index];
    // Build triad: Root, 3rd, 5th
    // In a diatonic scale, these are simply index, index+2, index+4 (wrapping around scale length 7)
    const triad = [
      scale[index],
      scale[(index + 2) % 7],
      scale[(index + 4) % 7]
    ];

    let chordName = rootNote;
    if (q.type === 'min') chordName += 'm';
    if (q.type === 'dim') chordName += '°';
    if (q.type === 'aug') chordName += '+';
    // Major usually has no suffix for triad

    return {
      name: chordName,
      root: rootNote,
      quality: q.i18n, // Returns the key (e.g., 'quality.minor')
      notes: triad,
      degree: q.degree
    };
  });
};

export const getCadences = (chords: Chord[]): Chord[][] => {
  // Map the indices from constants to actual chord objects
  return [
    CADENCES.POP.map(i => chords[i]),
    CADENCES.JAZZ.map(i => chords[i]),
    CADENCES.BASIC.map(i => chords[i])
  ];
};

/**
 * Main Public API
 */
export const calculateHarmony = (root: Note, tonality: Tonality): HarmonyResult => {
  const scale = getScale(root, tonality);
  const chords = getDiatonicChords(scale, tonality);
  const cadences = getCadences(chords);

  return {
    key: { root, tonality },
    scale,
    chords,
    cadences
  };
};

export const getRandomKey = (): KeyConfig => {
  const root = CIRCLE_OF_FIFTHS[Math.floor(Math.random() * CIRCLE_OF_FIFTHS.length)];
  const tonality = Math.random() > 0.5 ? 'Major' : 'Minor';
  return { root, tonality };
};
