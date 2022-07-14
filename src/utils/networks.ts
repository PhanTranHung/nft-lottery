export interface IToken {
  name?: string;
  address?: string; // The address that the token is at.
  symbol?: string; // A ticker symbol or shorthand, up to 5 chars.
  decimals?: number; // The number of decimals in the token
  image?: string; // A string url of the token logo
  type?: 'native';
}

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const NETWORKS: { [key: number]: AddEthereumChainParameter } = {
  43114: {
    chainName: 'Avalanche Mainnet',
    chainId: `0x${Number(43114).toString(16)}`,
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  43113: {
    chainName: 'Avalanche Testnet',
    chainId: `0x${Number(43113).toString(16)}`,
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
  },
  56: {
    chainName: 'Binance Smart Chain',
    chainId: `0x${Number(56).toString(16)}`,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    chainName: 'Binance Smart Chain - Testnet',
    chainId: `0x${Number(97).toString(16)}`,
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  31337: {
    chainName: 'Localhost 8545',
    chainId: `0x${Number(31337).toString(16)}`,
    rpcUrls: ['http://localhost:8545'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

export const CHAIN_MAP = {
  rinkeby: 4,
  'bsc testnet': 97,
};

export async function requestSwitchNetwork(chainId: number) {
  const provider = (window as any)?.ethereum;

  const chainIdHex = `0x${chainId.toString(16)}`;

  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORKS[chainId]],
          });
        } catch (addError) {
          console.log({ addError });
        }
      }
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  }
}
