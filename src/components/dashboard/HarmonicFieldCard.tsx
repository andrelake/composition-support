import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { getScale, getDiatonicChords } from '../../lib/music-theory/engine';
import type { Note, Tonality } from '../../lib/music-theory/types';
import { Card } from '../ui/Card';
import { Title, MonoText } from '../ui/Typography';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RowHeader = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    display: block;
    width: 3px;
    height: 14px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const ChordList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

const ChordItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: max-content;
`;

const DegreeText = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const StyledChordName = styled(MonoText)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Badge = styled.span`
  font-size: 0.65rem;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: auto;
`;

interface HarmonicFieldRowProps {
  root: Note;
  tonality: Tonality;
  label?: string;
}

function HarmonicFieldRow({ root, tonality, label }: HarmonicFieldRowProps) {
  const { t } = useTranslation();
  
  const scale = getScale(root, tonality);
  const chords = getDiatonicChords(scale, tonality);

  if (!chords || chords.length === 0) return null;

  return (
    <RowWrapper>
      <RowHeader>
        {root} {t(`tonality.${tonality}`)}
        {label && <Badge>{label}</Badge>}
      </RowHeader>
      <ChordList>
        {chords.map((chord, idx) => (
          <ChordItemWrapper key={`${chord.name}-${idx}`}>
            <DegreeText>{chord.degree}</DegreeText>
            <StyledChordName>{chord.name}</StyledChordName>
          </ChordItemWrapper>
        ))}
      </ChordList>
    </RowWrapper>
  );
}

/**
 * Displays the harmonic fields for the current key + parallels/variations.
 * Ref: Task #4, Component 2
 */
export function HarmonicFieldCard() {
  const { currentKey } = useAppStore();
  const { t } = useTranslation();

  if (!currentKey) return null;

  const parallelTonality: Tonality = currentKey.tonality === 'Major' ? 'Minor' : 'Major';

  const rows = [
    { 
      root: currentKey.root, 
      tonality: currentKey.tonality, 
      label: t('dashboard.harmonicField.selectedKey', 'Selected') 
    },
    { 
      root: currentKey.root, 
      tonality: parallelTonality, 
      label: t('dashboard.harmonicField.parallelKey', 'Parallel') 
    },
    { 
      root: currentKey.root, 
      tonality: 'Melodic Minor' as Tonality,
    },
    { 
      root: currentKey.root, 
      tonality: 'Harmonic Minor' as Tonality,
    }
  ];

  return (
    <Card>
      <Title as="h3">{t('dashboard.harmonicField.title', 'Harmonic Field')}</Title>
      <ListContainer>
        {rows.map((row, idx) => (
          <HarmonicFieldRow 
            key={`${row.root}-${row.tonality}-${idx}`} 
            root={row.root} 
            tonality={row.tonality}
            label={row.label}
          />
        ))}
      </ListContainer>
    </Card>
  );
}
