import { throws } from 'assert';
import { ethers, utils } from 'ethers';
import abi from '../../abis/ERC721.sol/ERC721.json';

const { isAddress } = utils;

export const erc721Interface = new ethers.utils.Interface(abi.abi);

export const getERC721Contract = (address: string) => {
  if (!isAddress(address)) {
    console.error('Address is not valid');
    return undefined;
  }
  return new ethers.Contract(address, erc721Interface);
};
