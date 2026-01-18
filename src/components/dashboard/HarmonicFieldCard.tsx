import styled from 'styled-components';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { Title, MonoText } from '../ui/Typography';
import { useTranslation } from 'react-i18next';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ChordBox = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DegreeText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  text-transform: uppercase;
`;

/**
 * Displays the 7 diatonic chords of the current key.
 * Ref: Task #4, Component 2
 */
export function HarmonicFieldCard() {
  const { harmonyResult } = useAppStore();
  const { t } = useTranslation();
  const { chords } = harmonyResult;

  if (!chords || chords.length === 0) return null;

  return (
    <Card>
      <Title as="h3">{t('dashboard.harmonicField.title', 'Harmonic Field')}</Title>
      <Grid>
        {chords.map((chord, idx) => (
          <ChordBox key={`${chord.name}-${idx}`}>
            <DegreeText>{chord.degree}</DegreeText>
             {/* Tooltip or extended info could go here */}
            <MonoText title={t(chord.quality)}>{chord.name}</MonoText>
          </ChordBox>
        ))}
      </Grid>
    </Card>
  );
}
