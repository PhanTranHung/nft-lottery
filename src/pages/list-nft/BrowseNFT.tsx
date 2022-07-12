import { Box, Flex } from '@chakra-ui/react';
import NFTItem, { NFTItemProps } from './NFTItem';

export interface BrowseNFTProps {
  nfts: NFTItemProps[];
  pools?: string[];
  children?: React.ReactNode;
}

const BrowseNFT: React.FC<BrowseNFTProps> = ({ nfts, pools = [], children }) => {
  return (
    <>
      <Box className="l-b-nft-wrapper">
        <Flex className="l-b-wrap-box" flexWrap={'wrap'}>
          {nfts.map((nft) => (
            <NFTItem key={nft.nftName} {...nft} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default BrowseNFT;
