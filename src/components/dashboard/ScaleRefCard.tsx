import styled from 'styled-components';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Title, Subtitle, MonoText } from '../ui/Typography';
import { useTranslation } from 'react-i18next';

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

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
  const { currentKey, harmonyResult, setKey } = useAppStore();
  const { t } = useTranslation();

  const toggleTonality = () => {
    const newTonality = currentKey.tonality === 'Major' ? 'Minor' : 'Major';
    setKey(currentKey.root, newTonality);
  };

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
      <HeaderRow>
        <Title as="h3">{currentKey.root} {t(`tonality.${currentKey.tonality}`, currentKey.tonality)}</Title>
        <Button variant="secondary" onClick={toggleTonality}>
          {currentKey.tonality === 'Major' 
            ? t('dashboard.actions.switchToMinor', 'Switch to Minor') 
            : t('dashboard.actions.switchToMajor', 'Switch to Major')}
        </Button>
      </HeaderRow>
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
