import { ethers } from 'ethers';

import abi from '../../abis/NFTLotteryPoolFactory.sol/NFTLotteryPoolFactory.json';
import { LOTTERY_FACTORY } from '../../address';

export const NFTLottetyPoolFactoryInterface = new ethers.utils.Interface(abi.abi);

export const NFTLottetyPoolFactoryContract = new ethers.Contract(LOTTERY_FACTORY, NFTLottetyPoolFactoryInterface);
