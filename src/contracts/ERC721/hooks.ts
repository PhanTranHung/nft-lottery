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

export const useOwnerOfNFT = (address: string, tokenId: string) => {
  let erc721Contract = useMemo(() => getERC721Contract(constants.AddressZero), []);

  try {
    erc721Contract = getERC721Contract(address);
  } catch (error) {
    // console.log(error);
  }

  const { value, fetch } = useContractCall({
    contract: erc721Contract,
    method: 'ownerOf',
    args: [tokenId],
  });

  return { owner: value, fetch };
};
