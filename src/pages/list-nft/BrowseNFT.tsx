import { Box, Flex } from '@chakra-ui/react';
import { useGetAllPool } from '../../contracts/NFTLottetyPoolFactory/hooks';
import NFTItem from './NFTItem';

export interface BrowseNFTProps {
  pools?: string[];
  children?: React.ReactNode;
}

const BrowseNFT: React.FC<BrowseNFTProps> = ({ children }) => {
  const { allPool = [], fetch } = useGetAllPool();

  // console.log('allPool', allPool);

  return (
    <>
      <Box className="l-b-nft-wrapper" minHeight={'400px'}>
        <Flex className="l-b-wrap-box" flexWrap={'wrap'}>
          {allPool.map((pool) => (
            <NFTItem key={pool.poolAddr} poolInfo={pool} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default BrowseNFT;
