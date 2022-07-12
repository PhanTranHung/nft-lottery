import { NFTLottetyPoolFactoryContract } from '.';
import { ITransactionOptions, useContractCall, useContractFunction } from '../../hooks/useContract';

export const useNFTLotteryPoolFunction = (methodName: string, options?: ITransactionOptions) => {
  return useContractFunction(NFTLottetyPoolFactoryContract, methodName, options);
};

export const useGetAllPool = () => {
  const { value, fetch } = useContractCall({
    contract: NFTLottetyPoolFactoryContract,
    method: 'getAllPool',
    args: [],
  });

  return { allPool: value, fetch };
};
