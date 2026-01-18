import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KeyConfig, HarmonyResult, Note, Tonality } from '../lib/music-theory/types';
import { calculateHarmony } from '../lib/music-theory/engine';

interface AppState {
  // State
  currentKey: KeyConfig;
  harmonyResult: HarmonyResult;
  isSpinning: boolean;
  userTier: 'BASIC' | 'PRO'; // For future feature gating
  
  // Actions
  setKey: (root: Note, tonality: Tonality) => void;
  spin: () => void; // Trigger for the animation + random selection
  setSpinning: (state: boolean) => void;
  
  // Pro placeholder
  upgradeToPro: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentKey: { root: 'C', tonality: 'Major' },
      harmonyResult: calculateHarmony('C', 'Major'),
      isSpinning: false,
      userTier: 'BASIC',

      setKey: (root, tonality) => {
        set({ 
          currentKey: { root, tonality },
          harmonyResult: calculateHarmony(root, tonality)
        });
      },

      setSpinning: (state) => set({ isSpinning: state }),

      spin: () => {
        // Only trigger the spinning state. The UI (RouletteContainer) handles the random generation and animation,
        // then calls setKey when completely stopped.
        set({ isSpinning: true });
      },
      
      upgradeToPro: () => set({ userTier: 'PRO' })
    }),
    {
      name: 'composition-support-storage', // unique name
      partialize: (state) => ({ currentKey: state.currentKey, userTier: state.userTier }), // specific fields to persist
    }
  )
);
