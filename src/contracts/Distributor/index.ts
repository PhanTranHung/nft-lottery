import { ethers } from 'ethers';

import abi from '../../abis/Distributor.sol/Distributor.json';
import { DISTRIBUTOR } from '../../address';

export const DistributorInterface = new ethers.utils.Interface(abi.abi);

export const DistributorContract = new ethers.Contract(DISTRIBUTOR, DistributorInterface);
