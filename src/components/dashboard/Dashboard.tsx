import styled from 'styled-components';
import { ScaleRefCard } from './ScaleRefCard';
import { HarmonicFieldCard } from './HarmonicFieldCard';
import { CadenceCard } from './CadenceCard';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px; /* Optional constraint */
  margin: 0 auto;

  @media (min-width: 1024px) {
    display: grid;
    /* 
       Layout Idea:
       [ Scale Ref Card (Full Width or 1/3) ] [ Harmonic Field (2/3) ]
       [ Cadence Card (Full Width) ]
    */
    grid-template-columns: 1fr; 
    gap: 2rem;
  }
`;

/**
 * Main dashboard view showing music theory insights for the current key.
 * Ref: Task #4, Component 4
 */
export function Dashboard() {
  return (
    <DashboardContainer>
      <ScaleRefCard />
      <HarmonicFieldCard />
      <CadenceCard />
    </DashboardContainer>
  );
}
