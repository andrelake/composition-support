import styled from 'styled-components';

/**
 * Main section title.
 * Uses the primary text color and bold font weight.
 */
export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

/**
 * Secondary title or section header.
 * slightly smaller than Title.
 */
export const Subtitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

/**
 * Small text for hints, notes, or descriptions.
 * Uses secondary text color.
 */
export const NoteText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontBody};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

/**
 * Monospace text for musical data (Notes, Chords).
 */
export const MonoText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-weight: 500;
`;
