import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animate, useMotionValue } from 'framer-motion';
import { WheelCanvas } from './WheelCanvas';
import { SpinButton } from './SpinButton';
import { useAppStore } from '../../store/useAppStore';
import { CIRCLE_OF_FIFTHS } from '../../lib/music-theory/constants';
import type { Note } from '../../lib/music-theory/types';

/**
 * RouletteContainer
 * 
 * Manages the logic for the Circle of Fifths roulette.
 * Connects to store for spin actions and state.
 * Handles the physics-based animation mapping.
 */

const Container = styled.div`
  position: relative;
  width: 300px; /* Default size, responsive via parent usually */
  height: 300px;
  margin: 0 auto;
`;

const Pointer = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid ${({ theme }) => theme.colors.text || '#333'};
  z-index: 20;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
`;

// Map enharmonics to standard Circle of Fifths keys
const normalizeKey = (key: string): string => {
   const map: Record<string, string> = {
       'C#': 'Db',
       'G#': 'Ab',
       'D#': 'Eb',
       'A#': 'Bb',
       'Gb': 'F#', // Wait, CIRCLE_OF_FIFTHS has F#. 
       // Check if C# or Db is in array. Array: Db.
   };
   // Double check standard constants.
   // Array: C, G, D, A, E, B, F#, Db, Ab, Eb, Bb, F
   // If key is C#, return Db.
   // If key is F#, return F# (already there).
   // If key is Gb, return F#? No, Db is flat, F# is sharp? 
   // Usually standard CoF uses F# / Gb on same slot.
   // My SVG just renders what's in array. 
   // So I need to map incoming key to one of the array items.
   
   if (CIRCLE_OF_FIFTHS.includes(key as Note)) return key;
   return map[key] || key;
};

export const RouletteContainer: React.FC = () => {
    const { spin, isSpinning, setSpinning, currentKey } = useAppStore();
    
    // Motion value for rotation
    const rotation = useMotionValue(0);

    // Keep track of total rotation to ensure continuous spinning
    const totalRotationRef = useRef(0);

    const handleSpin = () => {
       if (isSpinning) return;

       setSpinning(true);
       
       // Trigger logic - this updates store 'currentKey' immediately
       spin();
    };

    // React to change in currentKey IF we are spinning
    // Problem: `spin()` updates `currentKey` synchronously.
    // So we need to calculate target rot immediately after `spin()`.
    // But `handleSpin` calls `spin()`. Better to put animation logic in `useEffect` monitoring `currentKey`?
    // No, `currentKey` might change from other sources (manual set).
    // We only want to ANIMATE if `isSpinning` became true.
    // Actually, `handleSpin` calls `setSpinning(true)` then `spin()`.
    // We can just calculate here. `currentKey` will be the OLD key?
    // Store updates are usually sync in Zustand unless async action.
    // Let's assume sync.

    // Better approach: use `useEffect` on `currentKey`.
    // If key changes:
    // Check if `isSpinning` is true. If so, animate to it.
    
    // However, `spin()` is setting the key. We need to grab the NEW key.
    // Zustand's `spin` is an action.
    // Let's modify logic: The `handleSpin` gets the key from store AFTER calling spin?
    // Or we just fetch `useAppStore.getState().currentKey` after spin.
    
    useEffect(() => {
        if (isSpinning) {
            // Spinning just started or is in progress.
            // We need the target key.
            const targetKeyObj = useAppStore.getState().currentKey;
            const targetRoot = normalizeKey(targetKeyObj.root);
            
            // Find index
            const index = CIRCLE_OF_FIFTHS.indexOf(targetRoot as Note);
            
            if (index !== -1) {
                // Calculate target rotation
                // Segment i is at (i * 30). We want it at 0 (Top).
                // Target Angle = - (i * 30).
                const targetAngleSlot = - (index * 30);
                
                // Add spins. Minimum 5 spins (1800 deg).
                // We want to land on targetAngleSlot.
                // Current rotation might be large (e.g. 5000).
                // We want next > current.
                // Formula: T = current + min_spin + diff
                
                const current = totalRotationRef.current;
                const minSpins = 5 * 360;
                
                // Effective target relative to circle
                // We want (T % 360) === (targetAngleSlot % 360)
                // Diff needed
                
                // Math: 
                // We want End % 360 == targetAngleSlot % 360.
                // (current + x) % 360 = targetAngleSlot.
                // x = (targetAngleSlot - current) modulo 360... 
                // Ensure x is positive and >= minSpins?
                
                // Simpler:
                // Just add 360 until we are greater than current + minSpins
                // and (Value % 360) == targetAngleSlot (normalized).
                
                // Let's map targetAngleSlot to positive equivalent 0..360 if needed.
                // -30 -> 330.
                let normalizedTarget = (targetAngleSlot % 360);
                if (normalizedTarget < 0) normalizedTarget += 360;
                
                // Current normalized
                // let normalizedCurrent = (current % 360); 
                // We just want to find next integer K such that:
                // K * 360 + normalizedTarget > current + minSpins
                
                // Actually, just find the next matching angle.
                // Target Absolute = current + minSpins + (something to align).
                
                const roughTarget = current + minSpins;
                const roughRemainder = roughTarget % 360; // 0..359 approx
                // We want remainer to be `normalizedTarget`.
                const diff = normalizedTarget - roughRemainder;
                
                // If diff > 0, we add it. 
                // If diff < 0, we add it (reducing spin slightly? No, prefer strictly > minSpins)
                // If we want STRICTLY > minSpins, and diff < 0, add 360.
                
                let adjustment = diff;
                if (adjustment < 0) adjustment += 360; // Ensure we always add forward rotation
                
                const finalTarget = roughTarget + adjustment;
                totalRotationRef.current = finalTarget;

                // Animate
                animate(rotation, finalTarget, {
                    duration: 4,
                    ease: [0.25, 0.1, 0.25, 1], // cubic-bezier look-alike or 'easeOut'
                    onComplete: () => {
                        setSpinning(false);
                    }
                });
            } else {
                // Should not happen if data is consistent
                setSpinning(false);
            }
        }
    }, [isSpinning, currentKey, rotation, setSpinning]); // Depend on IS_SPINNING transition. 
    // Wait. `currentKey` changes -> Effect runs.
    
    return (
        <Container>
            <Pointer />
            <WheelCanvas 
                rotation={rotation} 
                currentKey={normalizeKey(currentKey.root)}
            />
            <SpinButton 
                onSpin={handleSpin} 
                isSpinning={isSpinning} 
            />
        </Container>
    );
};
