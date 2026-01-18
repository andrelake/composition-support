import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { KeyConfig, HarmonyResult, Note, Tonality } from '../lib/music-theory/types';
import { calculateHarmony, getRandomKey } from '../lib/music-theory/engine';

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
        // Logic for spinning is often partly in UI (animation) and Logic (result).
        // Here we just set the result instant, but UI might delay showing it.
        // Or we can let the UI call setKey after the animation 'lands'.
        // For simplicity/SoC: The UI calls `getRandomKey` then `setKey`.
        // This store action might just be strictly for 'triggering' if we wanted side-effects.
        // Let's implement a random setter here for convenience.
        const newKey = getRandomKey();
        set({ 
            currentKey: newKey,
            harmonyResult: calculateHarmony(newKey.root, newKey.tonality)
        });
      },
      
      upgradeToPro: () => set({ userTier: 'PRO' })
    }),
    {
      name: 'composition-support-storage', // unique name
      partialize: (state) => ({ currentKey: state.currentKey, userTier: state.userTier }), // specific fields to persist
    }
  )
);
