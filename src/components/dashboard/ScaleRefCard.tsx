import styled from 'styled-components';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { Title, Subtitle, MonoText } from '../ui/Typography';
import { useTranslation } from 'react-i18next';

const ScaleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
`;

const NoteBadge = styled.div<{ $isRoot?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme, $isRoot }) => 
    $isRoot ? theme.colors.primary : theme.colors.surfaceHover};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme, $isRoot }) => 
    $isRoot ? theme.colors.primaryLight : theme.colors.border};
`;

/**
 * Displays the current scale's notes, highlighting the root.
 * Ref: Task #4, Component 1
 */
export function ScaleRefCard() {
  const { currentKey, harmonyResult } = useAppStore();
  const { t } = useTranslation();

  // If harmonyResult is available, use it (it should be always synced with currentKey)
  const scaleNotes = harmonyResult.scale;

  // Fallback or empty state check
  if (!scaleNotes || scaleNotes.length === 0) {
    return (
      <Card>
        <Subtitle>{t('dashboard.scale.title', 'Scale')}</Subtitle>
        <MonoText>{t('dashboard.noData', 'No data')}</MonoText>
      </Card>
    );
  }

  return (
    <Card>
      <Title as="h3">{currentKey.root} {t(`tonality.${currentKey.tonality}`, currentKey.tonality)}</Title>
      <Subtitle>{t('dashboard.scale.notes', 'Scale Notes')}</Subtitle>
      
      <ScaleContainer>
        {scaleNotes.map((note, idx) => (
          <NoteBadge key={`${note}-${idx}`} $isRoot={idx === 0}>
            <MonoText>{note}</MonoText>
          </NoteBadge>
        ))}
      </ScaleContainer>
    </Card>
  );
}
