import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppStore } from './store/useAppStore';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`;

const Sidebar = styled.aside`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 400px; /* Fixed width sidebar for Roulette on desktop */
    position: sticky;
    top: 0;
    height: 100vh;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

function App() {
  const { t } = useTranslation();
  const { currentKey } = useAppStore();

  return (
    <AppContainer>
      <Sidebar>
        <h2>{t('app.title')}</h2>
        {/* Roulette Component Will Go Here */}
        <div>Roulette Placeholder</div>
        
        <div>
           {/* Translation keys need to match the engine output */}
           <h3>{currentKey.root} <small>{t(`tonality.${currentKey.tonality.toLowerCase()}`)}</small></h3>
        </div>
      </Sidebar>
      
      <MainContent>
        <Header>
           <h1>Dashboard</h1>
           {/* Language Switcher */}
           <button>PT | EN | ES</button>
        </Header>

        {/* Info Cards */}
        <div>
           Core content here
        </div>
      </MainContent>
    </AppContainer>
  )
}

export default App
