import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';

import abi from '../../abis/NFT.sol/NFT.json';

export const NFTInterface = new ethers.utils.Interface(abi.abi);

export const getNFTContract = (address: string) => {
  if (!isAddress(address)) {
    console.error('Address is not valid');
    return undefined;
  }
  return new ethers.Contract(address, NFTInterface);
};
