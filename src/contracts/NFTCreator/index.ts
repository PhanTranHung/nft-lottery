import { ethers } from 'ethers';

import abi from '../../abis/NFTCreator.sol/NFTCreator.json';
import { NFT } from '../../address';

export const NFTCreatorInterface = new ethers.utils.Interface(abi.abi);

export const NFTCreatorContract = new ethers.Contract(NFT, NFTCreatorInterface);
