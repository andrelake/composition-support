import styled from 'styled-components';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { Title, Subtitle, MonoText } from '../ui/Typography';
import { useTranslation } from 'react-i18next';

const CadenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const CadenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: 6px;
`;

const CadenceLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const Progression = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Arrow = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
`;

/**
 * Displays suggested chord progressions (cadences).
 * Ref: Task #4, Component 3
 */
export function CadenceCard() {
  const { harmonyResult } = useAppStore();
  const { t } = useTranslation();
  const { cadences } = harmonyResult;

  if (!cadences || cadences.length === 0) return null;

  // Hardcoded labels for now, matching the engine constants logic usually
  const cadenceLabels = [
    t('dashboard.cadence.pop', 'Pop (I-V-vi-IV)'),
    t('dashboard.cadence.jazz', 'Jazz (ii-V-I)'),
    t('dashboard.cadence.classical', 'Classical (I-IV-V-I)')
  ];

  return (
    <Card>
      <Title as="h3">{t('dashboard.cadence.title', 'Common Cadences')}</Title>
      <CadenceList>
        {cadences.map((progression, idx) => (
          <CadenceRow key={idx}>
            <CadenceLabel>{cadenceLabels[idx] || `Cadence ${idx + 1}`}</CadenceLabel>
            <Progression>
              {progression.map((chord, cIdx) => (
                <div key={`${chord.name}-${cIdx}`} style={{ display: 'flex', alignItems: 'center' }}>
                  <MonoText>{chord.name}</MonoText>
                  {cIdx < progression.length - 1 && <Arrow aria-hidden="true">&rarr;</Arrow>}
                </div>
              ))}
            </Progression>
          </CadenceRow>
        ))}
      </CadenceList>
    </Card>
  );
}
