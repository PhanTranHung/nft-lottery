import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { Falsy } from '../types';

export interface ITransactionOptions {
  signer?: ethers.Signer;
  transactionName?: string;
}

export interface ITransactionState {
  status: 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'None';
  transaction?: ethers.providers.TransactionResponse;
  receipt?: ethers.providers.TransactionReceipt;
}

export function connectContractToSigner(
  contract: ethers.Contract,
  options?: ITransactionOptions,
  web3Provider?: ethers.providers.Web3Provider
) {
  if (contract.signer) {
    return contract;
  }
  if (options?.signer) {
    return contract.connect(options.signer);
  }
  if (web3Provider?.getSigner) {
    return contract.connect(web3Provider.getSigner());
  }
  throw new TypeError('No signer available in contract, options or library');
}

export const useContractFunction = (contract: ethers.Contract, functionName: string, options?: ITransactionOptions) => {
  const [state, setState] = useState<ITransactionState>({
    status: 'None',
  });

  const { provider, account } = useWeb3React();

  const send = useCallback(
    async (...params: any[]): Promise<ITransactionState | undefined> => {
      if (provider && account) {
        try {
          setState({
            status: 'PendingSignature',
          });

          const contractWithSigner = connectContractToSigner(contract, options, provider);

          const transaction: ethers.providers.TransactionResponse = await contractWithSigner[functionName](...params);

          setState({
            status: 'Mining',
            transaction,
          });

          const receipt: ethers.providers.TransactionReceipt = await transaction.wait();

          setState({
            status: 'Success',
            transaction,
            receipt,
          });

          return { status: 'Success', transaction, receipt };
        } catch (error) {
          console.error(error);
          setState({
            status: 'Fail',
          });

          return {
            status: 'Fail',
          };
        }
      } else {
        console.error('Provider is not initilazed yet');
      }
    },
    [provider, contract, functionName, options]
  );

  const resetState = useCallback(() => {
    setState({ status: 'None' });
  }, [setState]);

  return { state, send, resetState };
};

export interface ContractCall {
  contract: ethers.Contract;
  method: string;
  args: any[];
}
export const useContractCall = <T = any>(
  call: ContractCall | Falsy,
  { saveState = true }: { saveState?: boolean } = {}
) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const { provider } = useWeb3React();

  if (!call) call = undefined;
  if (call && !call.args) call.args = [];

  useEffect(() => {
    handleFetchData();
  }, [provider]);

  const handleFetchData = useCallback(
    async (...params: any[]): Promise<T | undefined> => {
      if (provider) {
        if (!call) return undefined;
        try {
          const contractWithProvider = call.contract.connect(provider);

          const finalArgs = params.length > 0 ? params : call.args;
          const res: T = await contractWithProvider[call.method](...finalArgs);
          if (saveState) setValue(res);
          return res;
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Provider is not initilazed yet');
      }
    },

    [provider, call?.contract, call?.method]
  );
  return { value, fetch: handleFetchData };
};
