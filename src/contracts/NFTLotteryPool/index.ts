import { ethers } from 'ethers';

import abi from '../../abis/NFTLotteryPool.sol/NFTLotteryPool.json';
import { LOTTERY_POOL } from '../../address';

export const NFTLotteryPoolInterface = new ethers.utils.Interface(abi.abi);

export const NFTLotteryPoolContract = new ethers.Contract(LOTTERY_POOL, NFTLotteryPoolInterface);
