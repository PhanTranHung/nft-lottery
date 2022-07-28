import React from 'react';
import { ethers } from 'moralis/node_modules/ethers';
import { createContext, useContext, useEffect, useState } from 'react';

interface IDAppContext {
  provider: ethers.providers.Provider | undefined;
  active: boolean;
  activate: () => ethers.providers.Provider | undefined;
}

interface DAppProviderProps {
  rpcUrl: string;
  autoConnect?: boolean;
  children?: React.ReactNode;
}

const initState: IDAppContext = {
  provider: undefined,
  active: false,
  activate: () => {
    throw new Error('DAppProvider is not initalized yet');
  },
};

const DAppContext = createContext(initState);

const DAppProvider: React.FC<DAppProviderProps> = ({ rpcUrl, autoConnect = true, children }) => {
  const [active, setActive] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Provider | undefined>(undefined);

  const activate = () => {
    if (!rpcUrl) throw new Error(`RPC url doesn't exist`);
    if (!active) {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      setProvider(provider);
      setActive(true);
      return provider;
    }
  };

  const value: IDAppContext = {
    activate,
    active,
    provider,
  };

  useEffect(() => {
    if (!active && autoConnect) activate();
  }, [autoConnect, active]);

  return <DAppContext.Provider value={value}>{children}</DAppContext.Provider>;
};

export const useDAppProvider = () => {
  const context = useContext(DAppContext);

  if (!context) throw new Error('useWallet hook must be inside a WalletProvider');
  return context;
};

export default DAppProvider;
