import React from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button'; // Assuming we can use or wrap the base Button
import type { ButtonHTMLAttributes } from 'react';

/**
 * Props for the SpinButton.
 */
interface SpinButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSpin: () => void;
  isSpinning: boolean;
  label?: string;
}

const CenterButton = styled(Button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 0;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  font-weight: 800;
  font-size: 1rem;
  border: 4px solid #ffffff;
`;

/**
 * SpinButton component.
 * Placed in the center of the wheel usually.
 */
export const SpinButton: React.FC<SpinButtonProps> = ({ onSpin, isSpinning, label = 'SPIN', ...props }) => {
  return (
    <CenterButton 
      onClick={onSpin} 
      disabled={isSpinning} 
      variant="primary"
      {...props}
    >
      {isSpinning ? '...' : label}
    </CenterButton>
  );
};
