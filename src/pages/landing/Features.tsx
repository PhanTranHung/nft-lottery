import { Box, Center, Flex, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Container from '../../components/Container';

const Features: React.FC = () => {
  return (
    <>
      <Box>
        <Container>
          <Box>
            <Center>
              <Heading as="h1" color={'#49c2e7'}>
                WHY USE NFT-LOTTERY???
              </Heading>
            </Center>
          </Box>
          <Center className="lan-f-features">
            <Flex gap={'1rem'}>
              <Box className="lan-f-feature-item">
                <VStack>
                  <Image w={24} src="/assets/images/fair.png" alt="logo" />
                  <Heading as="h2">FAIR</Heading>
                  <Text as="p">NFT-LOTTERY uses chainlink vrf to randomly select a winner. No RNG funny business.</Text>
                </VStack>
              </Box>
              <Box className="lan-f-feature-item">
                <VStack>
                  <Image w={24} src="/assets/images/profitable.png" alt="logo" />
                  <Heading as="h2">PROFITABLE</Heading>
                  <Text as="p">NFT-LOTTERY takes only a flat fee for lottery creation keep 100% of ticket sales.</Text>
                </VStack>
              </Box>
              <Box className="lan-f-feature-item">
                <VStack>
                  <Image w={24} src="/assets/images/trustless.png" alt="logo" />
                  <Heading as="h2">TRUSTLESS</Heading>
                  <Text as="p">NFT-LOTTERY handles the RNG, ticket sales and escrow. All open-source</Text>
                </VStack>
              </Box>
            </Flex>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default Features;
