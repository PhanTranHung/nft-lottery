import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import Container from '../../components/Container';
import BrowseNFT from './BrowseNFT';
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
          <BrowseNFT />
        </Container>
      </Box>
    </>
  );
};

export default ListNFT;
