import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import theme from './theme';
import { MoralisProvider } from 'react-moralis';
import { MORALIST_SERVER_URL, MORALIS_APP_ID } from './config';

import { initializeConnector, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Web3ReactProvider connectors={connectors}>
          <MoralisProvider serverUrl={MORALIST_SERVER_URL} appId={MORALIS_APP_ID}>
            <App />
          </MoralisProvider>
        </Web3ReactProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
