import styled from 'styled-components';
import { ReactNode } from 'react';

/**
 * Props for the Card component.
 */
interface CardProps {
  /** The content to be displayed inside the card */
  children: ReactNode;
  /** Optional class name for styling extensions */
  className?: string;
}

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

/**
 * A generic container component with standard styling, padding, and elevation.
 * Used for wrapping distinct sections of content like "Harmonic Field" or "Scales".
 * 
 * @param props - The component props
 * @returns The styled Card component
 */
export function Card({ children, className }: CardProps) {
  return <StyledCard className={className}>{children}</StyledCard>;
}
