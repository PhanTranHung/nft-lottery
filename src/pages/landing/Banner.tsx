import { Box, Center, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react';
import Container from '../../components/Container';

const Banner: React.FC = () => {
  return (
    <>
      <Box className="lan-b-container">
        <Container>
          <Flex className="lan-b-flex-box">
            <Flex alignItems={'center'}>
              <Box>
                <Heading color={'blue.400'}>NFT-LOTTERY</Heading>
                <Text color={'gray'}>Fractionalizers HATE this one simple trick!!!</Text>
              </Box>
            </Flex>
            <Box className="lan-b-box-image">
              <Image w={'100%'} src="/assets/images/nft-intro.png" alt="logo" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Banner;
