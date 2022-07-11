import { ethers, utils } from 'ethers';
import abi from '../../abis/ERC20.sol/ERC20.json';

const { isAddress } = utils;

export const erc20Interface = new ethers.utils.Interface(abi.abi);

export const getERC20Contract = (address: string) => {
  if (!isAddress(address)) throw new Error('Address is not valid');
  return new ethers.Contract(address, erc20Interface);
};
