import { throws } from 'assert';
import { ethers, utils } from 'ethers';
import abi from '../../abis/ERC721.sol/ERC721.json';

const { isAddress } = utils;

export const erc721Interface = new ethers.utils.Interface(abi.abi);

export const getERC721Contract = (address: string) => {
  if (!isAddress(address)) throw new Error('Address is not valid');
  return new ethers.Contract(address, erc721Interface);
};
