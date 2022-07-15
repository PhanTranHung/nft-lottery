import { BigNumber } from 'ethers';
import { NFTLottetyPoolFactoryContract } from '.';
import { ITransactionOptions, useContractCall, useContractFunction } from '../../hooks/useContract';

export const useNFTLotteryPoolFunction = (methodName: string, options?: ITransactionOptions) => {
  return useContractFunction(NFTLottetyPoolFactoryContract, methodName, options);
};

export interface PoolInfo {
  nftAddr: string;
  poolAddr: string;
  seller: string;
  tokenId: BigNumber;
  0: string;
  1: string;
  2: string;
  3: BigNumber;
}

export const useGetAllPool = () => {
  const { value, fetch } = useContractCall<PoolInfo[] | undefined>({
    contract: NFTLottetyPoolFactoryContract,
    method: 'getAllPool',
    args: [],
  });

  return { allPool: value, fetch };
};
