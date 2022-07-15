import { constants } from 'ethers';
import { useMemo } from 'react';
import { getERC721Contract } from '.';
import { ITransactionOptions, useContractCall, useContractFunction } from '../../hooks/useContract';

export const useERC721ContractFunction = (address: string, methodName: string, options?: ITransactionOptions) => {
  let erc721Contract = useMemo(() => getERC721Contract(constants.AddressZero), []);

  try {
    erc721Contract = getERC721Contract(address);
  } catch (error) {
    // console.log(error);
  }

  const { resetState, send, state } = useContractFunction(erc721Contract, methodName, options);

  return { resetState, send, state };
};

export const useOwnerOfNFT = (address: string = '', tokenId: string | number | undefined) => {
  const contract = useMemo(() => getERC721Contract(address), [address]) ?? undefined;

  const { value, fetch } = useContractCall(
    contract &&
      (typeof tokenId === 'number' || typeof tokenId === 'string') && {
        contract,
        method: 'ownerOf',
        args: [tokenId],
      }
  );

  return { address: value as string | undefined, fetch };
};

export const useTokenURI = (address: string = '', tokenId: string | number | undefined) => {
  const contract = useMemo(() => getERC721Contract(address), [address]) ?? undefined;

  const { value, fetch } = useContractCall(
    contract &&
      (typeof tokenId === 'number' || typeof tokenId === 'string') && {
        contract,
        method: 'tokenURI',
        args: [tokenId],
      }
  );

  return { uri: value, fetch };
};
