import { constants } from 'ethers';
import { useMemo } from 'react';
import { getERC721Contract } from '.';
import { ITransactionOptions, useContractFunction } from '../../hooks/useContract';

export const useERC721ContractFunction = (address: string, methodName: string, options?: ITransactionOptions) => {
  let erc721Contract = useMemo(() => getERC721Contract(constants.AddressZero), []);

  try {
    erc721Contract = getERC721Contract(address);
  } catch (error) {
    // console.log(error);
  }

  const { resetState, send, state } = useContractFunction(erc721Contract, methodName, options);

  //   const handleSend = () => {
  //     try {

  //       const contract = getERC721Contract(address);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return { resetState, send, state };
};
