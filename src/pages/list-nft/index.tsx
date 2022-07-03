import { Box, Center, Heading } from '@chakra-ui/react';
import Container from '../../components/Container';
import BrowseNFT from './BrowseNFT';
import { NFTItemProps } from './NFTItem';
import './index.css';

const ListNFT: React.FC = () => {
  return (
    <>
      <Box className="l-nft-wrapper">
        <Container>
          <Box>
            <Center>
              <Heading as="h1" className="l-title">
                Recent Lotteries
              </Heading>
            </Center>
          </Box>
          <BrowseNFT nfts={listNFTs} />
        </Container>
      </Box>
    </>
  );
};

export default ListNFT;

const listNFTs: NFTItemProps[] = [
  {
    nftName: 'Bes Maapj',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
  {
    nftName: 'Bes Coif',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
  {
    nftName: 'Bes Heo',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
  {
    nftName: 'Bes Tis',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
  {
    nftName: 'Bes Hoa',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
  {
    nftName: 'Bes Thor',
    price: 123,
    remainingTicket: 12,
    remainingTime: 'Sat Jul 02 2022 11:59:02 GMT+0700 (Indochina Time)',
    sold: 11,
    total: 100,
    imageUrl: '/assets/images/nft-image-2.png',
    nftAddress: '',
  },
];
