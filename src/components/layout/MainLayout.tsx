import styled from 'styled-components';
import type { ReactNode } from 'react';

// --- Styled Components ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 10;
`;

/**
 * The main content area.
 * Implements the responsive grid strategy:
 * - Mobile: Vertical Stack
 * - Desktop: Asymmetric Grid (Left Stick Sidebar + Right Fluid Content)
 */
const Content = styled.main`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
    // 350px fixed sidebar, 1fr fluid deck
    grid-template-columns: 350px 1fr;
    align-items: start;
    padding: 2rem;
  }
`;

const Footer = styled.footer`
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.surface};
`;

// --- Interfaces ---

/**
 * Props for the MainLayout component.
 */
interface MainLayoutProps {
  /** The content to be placed in the header (Logo, Settings) */
  header?: ReactNode;
  /** 
   * The main content of the application.
   * Ideally contains two children: The Controller (Roulette) and the Data Deck.
   */
  children: ReactNode;
  /** The content to be placed in the footer */
  footer?: ReactNode;
}

// --- Component ---

/**
 * The standard application layout shell.
 * It provides the basic structure: Header -> Main Content (Grid) -> Footer.
 * 
 * @example
 * <MainLayout header={<Logo />} footer={<Copyright />}>
 *   <RouletteSection />
 *   <DashboardGrid />
 * </MainLayout>
 * 
 * @param props - The component props
 * @returns The structured layout component
 */
export function MainLayout({ header, children, footer }: MainLayoutProps) {
  return (
    <Container>
      {header && <Header>{header}</Header>}
      <Content>{children}</Content>
      {footer && <Footer>{footer}</Footer>}
    </Container>
  );
}

// Export styled components for custom composition if needed
MainLayout.Container = Container;
MainLayout.Header = Header;
MainLayout.Content = Content;
MainLayout.Footer = Footer;
