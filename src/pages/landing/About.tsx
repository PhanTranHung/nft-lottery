import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Container from '../../components/Container';

const About: React.FC = () => {
  return (
    <>
      <Box className="lan-ab-container" position={'relative'}>
        <Image className="lan-ab-container-bg-decor" src="/assets/images/background-ellipse.svg" alt="logo" />
        <Container>
          <VStack>
            <Box>
              <Flex className="lan-ab-flex-box">
                <Box>
                  <Heading as="h2">What was this project?</Heading>
                  <Text color={'gray'}>
                    NFTS,or non-fungible tokens,are digital assets that represent real-world objects like art, image.
                    They are one ofakind and can be bought and sold online using cryptocurrency.NFT Marketplace assists
                    artists to sell their works on various crypto-exchanges
                  </Text>
                </Box>
                <Box>
                  <Image w={'60%'} src="/assets/images/lottery-1.png" alt="logo" />
                </Box>
              </Flex>
            </Box>
            <Box pos={'relative'} top="-4rem">
              <Flex className="lan-ab-flex-box">
                <Box>
                  <Heading>Our Vision</Heading>
                  <Text color={'gray'}>
                    The task was to createadesign that would fully satisfy two things:first, it would display the entire
                    list of services provided by the company (promoting the works of artists in its own
                    Community,attracting investors for the development of digital art),and secondly,to create
                    user-friendly and understandable navigation,which will allow users to quickly find the information
                    needed and bring down barriers for non-technical users to interact with blockchain technologies.
                  </Text>
                </Box>
                <Box display={'flex'} justifyContent="flex-end">
                  <Image w={'70%'} src="/assets/images/lottery-2.png" alt="logo" />
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default About;
