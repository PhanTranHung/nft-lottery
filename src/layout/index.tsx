import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { DEFAULT_CHAIN_ID } from '../config';
import { requestSwitchNetwork } from '../utils/networks';
import Footer from './footer';
import Header from './header';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const { chainId } = useWeb3React();

  useEffect(() => {
    if (!!chainId && chainId != DEFAULT_CHAIN_ID) requestSwitchNetwork(DEFAULT_CHAIN_ID);
  }, [chainId]);

  console.log(chainId);

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
