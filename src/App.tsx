import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MainLayout } from './components/layout/MainLayout';
import { RouletteContainer } from './components/roulette/RouletteContainer';
import { Dashboard } from './components/dashboard/Dashboard';

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

function App() {
  const { t } = useTranslation();

  return (
    <MainLayout
      header={<Title>{t('app.title')}</Title>}
    >
      <RouletteContainer />
      <Dashboard />
    </MainLayout>
  );
}

export default App;
