import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Container from '../../components/Container';
import { BiWallet, BiImage, BiPurchaseTag } from 'react-icons/bi';

const SellNFT: React.FC = () => {
  return (
    <>
      <Box className="lan-s-container">
        <Container>
          <VStack>
            <Center>
              <Heading as="h1" color="#49c2e7">
                Sell Your NFTs
              </Heading>
            </Center>
            <Flex className="lan-s-list">
              <Box className="lan-s-item">
                <VStack as="div">
                  <BiWallet size={'3rem'} color="#49c2e7" />
                  <Heading as="h2">Set up your wallet</Heading>
                  <Text as="p">
                    Once you've set up your wallet of choice, connect it to Metamask by clicking the wallet icon in the
                    top right corner.
                  </Text>
                </VStack>
              </Box>
              <Box className="lan-s-item">
                <VStack as="div">
                  <BiImage size={'3rem'} color="#49c2e7" />
                  <Heading as="h2">Add your NFTs</Heading>
                  <Text as="p">
                    Upload your work image or 3D art, add a title and description, and customize your NFTs with
                    properties
                  </Text>
                </VStack>
              </Box>
              <Box className="lan-s-item">
                <VStack as="div">
                  <BiPurchaseTag size={'3rem'} color="#49c2e7" />
                  <Heading as="h2">Sell</Heading>
                  <Text as="p">Choose between auctions, fixed-price listings and we help you sell them!</Text>
                </VStack>
              </Box>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default SellNFT;
