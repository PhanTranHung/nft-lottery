import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';

import abi from '../../abis/NFTLotteryPool.sol/NFTLotteryPool.json';
import { LOTTERY_POOL } from '../../address';

export const NFTLotteryPoolInterface = new ethers.utils.Interface(abi.abi);

export const NFTLotteryPoolContract = new ethers.Contract(LOTTERY_POOL, NFTLotteryPoolInterface);

export const getNFTLotteryPoolContract = (address: string) => {
  if (!isAddress(address)) {
    console.error('Address is not valid');
    return undefined;
  }
  return new ethers.Contract(address, NFTLotteryPoolInterface);
};
