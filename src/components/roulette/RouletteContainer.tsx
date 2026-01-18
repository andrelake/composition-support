import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { animate, useMotionValue } from 'framer-motion';
import { WheelCanvas } from './WheelCanvas';
import { SpinButton } from './SpinButton';
import { useAppStore } from '../../store/useAppStore';
import { CIRCLE_OF_FIFTHS } from '../../lib/music-theory/constants';
import { getRandomKey } from '../../lib/music-theory/engine';
import type { Note, KeyConfig } from '../../lib/music-theory/types';

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
    const { spin, isSpinning, setSpinning, currentKey, setKey } = useAppStore();
    
    // Motion value for rotation
    const rotation = useMotionValue(0);

    // Keep track of total rotation to ensure continuous spinning
    const totalRotationRef = useRef(0);
    
    // Ref to hold the target key during the spin, to update store only at the end
    const targetKeyRef = useRef<KeyConfig | null>(null);

    const handleSpin = () => {
       if (isSpinning) return;
       
       // Generate the random result locally
       const result = getRandomKey();
       targetKeyRef.current = result;

       // Start spinning state
       spin(); // This sets isSpinning = true in store
    };

    const handleSegmentClick = (note: string) => {
        if (isSpinning) return;
        // Immediate update for click interaction
        // Use current tonality or default
        setKey(note as Note, currentKey.tonality);
    };

    // Effect for Spinning Animation
    useEffect(() => {
        if (isSpinning && targetKeyRef.current) {
            const targetRoot = normalizeKey(targetKeyRef.current.root);
            const index = CIRCLE_OF_FIFTHS.indexOf(targetRoot as Note);
            
            if (index !== -1) {
                const targetAngleSlot = - (index * 30);
                const minSpins = 5 * 360;
                const current = totalRotationRef.current;
                
                let normalizedTarget = (targetAngleSlot % 360);
                if (normalizedTarget < 0) normalizedTarget += 360;

                const roughTarget = current + minSpins;
                const roughRemainder = roughTarget % 360;
                const diff = normalizedTarget - roughRemainder;
                
                let adjustment = diff;
                if (adjustment < 0) adjustment += 360;
                
                const finalTarget = roughTarget + adjustment;
                totalRotationRef.current = finalTarget;

                animate(rotation, finalTarget, {
                    duration: 4,
                    ease: [0.25, 0.1, 0.25, 1],
                    onComplete: () => {
                        // Sync state on finish
                        if (targetKeyRef.current) {
                            setKey(targetKeyRef.current.root, targetKeyRef.current.tonality);
                        }
                        setSpinning(false);
                        targetKeyRef.current = null;
                    }
                });
            } else {
                setSpinning(false);
            }
        }
    }, [isSpinning, rotation, setSpinning, setKey]);

    // Effect for synchronizing rotation when Key changes (e.g. Click or external change)
    // ONLY runs if NOT spinning.
    useEffect(() => {
        if (!isSpinning) {
            const displayRoot = normalizeKey(currentKey.root);
            const index = CIRCLE_OF_FIFTHS.indexOf(displayRoot as Note);
            if (index === -1) return;

            // We want to rotate to this slot.
            // Current global rotation
            const current = totalRotationRef.current; 
            // Note: `rotation` is a MotionValue. `rotation.get()` gives current value.
            // But strict state is in ref for accumulated rotations.
            
            const targetAngleSlot = - (index * 30);
            
            // Shortest path calc
            // normalized target:
            let normalizedTarget = (targetAngleSlot % 360);
            if (normalizedTarget < 0) normalizedTarget += 360;
            
            const roughRemainder = current % 360;
            // correction to bring current to normalizedTarget
            // A = target, B = current
            // diff = A - B
            let diff = normalizedTarget - roughRemainder;
            
            // We want diff between -180 and 180 for shortest path
            // e.g. target=10, current=350. diff = -340. 
            // -340 + 360 = +20. Go forward 20.
            
            // e.g. target=350, current=10. diff = 340.
            // 340 - 360 = -20. Go back 20.

            // Normalize diff to -180..180
            // logic:
            // while (diff > 180) diff -= 360;
            // while (diff < -180) diff += 360;
            
            // Assuming diff is within -360..360 roughly
            if (diff > 180) diff -= 360;
            else if (diff < -180) diff += 360;
             
            // Wait, is roughRemainder always 0..360? 
            // In JS % can be negative. 
            // -90 % 360 = -90.
            // Let's ensure positive
            const posRemainder = (roughRemainder < 0) ? roughRemainder + 360 : roughRemainder;
             
            let cleanDiff = normalizedTarget - posRemainder;
             if (cleanDiff > 180) cleanDiff -= 360;
             else if (cleanDiff < -180) cleanDiff += 360;

             const finalTarget = current + cleanDiff;
             
             // If difference is significant, animate. If small (already there), skip?
             // Or just animate always for smoothness.
             if (Math.abs(finalTarget - current) > 0.1) {
                 totalRotationRef.current = finalTarget;
                 animate(rotation, finalTarget, {
                     duration: 0.5,
                     ease: "easeOut"
                 });
             }
        }
    }, [currentKey, isSpinning, rotation]);

    return (
        <Container>
            <Pointer />
            <WheelCanvas 
                rotation={rotation} 
                currentKey={normalizeKey(currentKey.root)}
                onSegmentClick={handleSegmentClick}
            />
            <SpinButton 
                onSpin={handleSpin} 
                isSpinning={isSpinning} 
            />
        </Container>
    );
};
