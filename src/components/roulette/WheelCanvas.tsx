import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { CIRCLE_OF_FIFTHS } from '../../lib/music-theory/constants';

/**
 * Props for the WheelCanvas component.
 */
interface WheelCanvasProps {
  /** The current rotation of the wheel in degrees. Controlled by parent for animation. */
  rotation: number | MotionValue<number>;
  /** The currently selected key root note to highlight. */
  currentKey?: string;
  className?: string;
}

const WheelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1); /* Soft shadow */
  background: white; /* Or visual theme background */
`;

const SVGContainer = styled(motion.svg)`
  width: 100%;
  height: 100%;
  transform-origin: center;
  will-change: transform;
`;

const SegmentText = styled.text<{ $isActive: boolean }>`
  font-size: 8px;
  font-weight: 700;
  fill: ${({ $isActive, theme }) => $isActive ? '#ffffff' : theme.colors.text || '#333'};
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
`;

const SegmentPath = styled.path<{ $index: number; $isActive: boolean }>`
  fill: ${({ $isActive, theme, $index }) => $isActive ? theme.colors.primary : ($index % 2 === 0 ? '#f3f4f6' : '#ffffff')};
  stroke: #e5e7eb;
  stroke-width: 0.5px;
  transition: fill 0.3s ease;
`;

/**
 * Helper to calculate SVG path for a circular sector (pie slice).
 * @param index Index of the slice (0 to 11)
 * @param totalSegments Total number of segments (12)
 * @param radius Radius of the circle
 * @param center Center coordinate {x, y}
 */
const describeArc = (index: number, totalSegments: number, radius: number, center: number) => {
  const angleSize = 360 / totalSegments;
  // We want index 0 to be centered at 0 deg (Up).
  // So it spans -15 to +15 deg.
  const startAngle = (index * angleSize) - (angleSize / 2);
  const endAngle = (index * angleSize) + (angleSize / 2);

  const startToRad = (startAngle - 90) * (Math.PI / 180); // SVG 0 is at 3 o'clock, so -90 usually to top?
  // Math: 0 deg is usually 3 o'clock in trig.
  // We want 0 deg at 12 o'clock.
  // angle in trig = (angleDeg - 90)
  
  const startX = center + (radius * Math.cos(startToRad));
  const startY = center + (radius * Math.sin(startToRad));
  
  const endToRad = (endAngle - 90) * (Math.PI / 180);
  const endX = center + (radius * Math.cos(endToRad));
  const endY = center + (radius * Math.sin(endToRad));

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  const largeArcFlag = angleSize <= 180 ? 0 : 1;

  return [
    "M", center, center,
    "L", startX, startY,
    "A", radius, radius, 0, largeArcFlag, 1, endX, endY,
    "Z"
  ].join(" ");
};

const getTextCoordinates = (index: number, totalSegments: number, radius: number, center: number) => {
  const angleSize = 360 / totalSegments;
  const angle = index * angleSize;
  const toRad = (angle - 90) * (Math.PI / 180);
  // Position text at ~80% of radius
  const textRadius = radius * 0.8;
  const x = center + (textRadius * Math.cos(toRad));
  const y = center + (textRadius * Math.sin(toRad));
  return { x, y, rotation: angle };
};

/**
 * WheelCanvas component logic
 * Renders the Circle of Fifths visual.
 */
export const WheelCanvas: React.FC<WheelCanvasProps> = ({ rotation, currentKey, className }) => {
  const radius = 50;
  const center = 50;
  const total = CIRCLE_OF_FIFTHS.length;

  // We handle rotation via style transform on the SVG
  return (
    <WheelContainer className={className}>
      <SVGContainer 
        viewBox="0 0 100 100" 
        style={{ rotate: rotation }}
      >
         {/* Render Segments */}
        {CIRCLE_OF_FIFTHS.map((note, index) => {
            // Need to match currentKey (Note) to this sector.
            // currentKey might be enharmonic (e.g. Gb vs F#).
            // A simple check:
            const isActive = currentKey === note || (note === 'F#' && currentKey === 'Gb') || (note === 'Db' && currentKey === 'C#') || (note === 'Ab' && currentKey === 'G#') || (note === 'Eb' && currentKey === 'D#') || (note === 'Bb' && currentKey === 'A#');

            const pathData = describeArc(index, total, radius, center);
            const textPos = getTextCoordinates(index, total, radius, center);
            
            return (
                <g key={note}>
                    <SegmentPath 
                        d={pathData} 
                        $index={index} 
                        $isActive={isActive}
                    />
                    <SegmentText 
                        x={textPos.x} 
                        y={textPos.y} 
                        $isActive={isActive}
                        transform={`rotate(${textPos.rotation + 90}, ${textPos.x}, ${textPos.y})`} /* Rotate text to be readable or radial? Usually radial for wheels. +90 to align with radius */
                    >
                        {note}
                    </SegmentText>
                </g>
            );
        })}
      </SVGContainer>
      
      {/* Visual Marker (Pointer) - Static Overlay, drawn outside rotation? 
          No, this component *only* draws the wheel canvas. 
          The pointer should be in the parent container. 
      */}
    </WheelContainer>
  );
};
