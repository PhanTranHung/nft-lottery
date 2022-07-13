import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Footer from './footer';
import Header from './header';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
  }, [enableWeb3, isWeb3Enabled]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
