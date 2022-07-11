import { NFTLottetyPoolFactoryContract } from '.';
import { ITransactionOptions, useContractFunction } from '../../hooks/useContract';

export const useNFTLotteryPoolFunction = (methodName: string, options?: ITransactionOptions) => {
  return useContractFunction(NFTLottetyPoolFactoryContract, methodName, options);
};
