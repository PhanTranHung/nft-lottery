import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import ShortString from '../../components/ShortString';
import { BiCopy, BiLinkExternal } from 'react-icons/bi';

export interface DetailNFTProps {
  children?: React.ReactNode;
}

const DetailNFT: React.FC = () => {
  const supply = 100;
  const remaining = 0;
  const price = 50;

  const soldOut = remaining == 0;

  // Renderer callback with condition
  const coundownRenderer: CountdownRendererFn = ({ completed, formatted: { days, hours, minutes, seconds } }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          <Box>
            <Center>Lottery is ended</Center>
          </Box>
        </>
      );
    } else {
      // Render a countdown
      return (
        <Box>
          {days}:{hours}:{minutes}:{seconds}
        </Box>
      );
    }
  };

  return (
    <>
      <Flex direction={'row'} gap={'1rem'}>
        <Box className="v-d-box-image-container">
          <Box className="v-d-box-image">
            <Center>
              <Box>
                <Image src="/assets/images/nft-image-2.png" />
              </Box>
            </Center>
            <Box>
              <LinkOverlay href="#">
                <HStack className="v-d-box-image-external-link">
                  <Text>View on OpenSea</Text>
                  <BiLinkExternal />
                </HStack>
              </LinkOverlay>
            </Box>
          </Box>
        </Box>
        <Box className="v-d-box-info">
          <Flex direction={'column'}>
            <Box>
              <Heading as="h2" color="blue.400">
                NFT Name
              </Heading>
              <Box className="v-d-box-little-text">
                <HStack>
                  <ShortString str="0xd7F36d390B357984D2387129Bc796B1Be1A28cCC" />
                  <BiCopy />
                </HStack>
              </Box>
            </Box>
            <Box className="v-d-coundown-container ">
              <Center className="v-d-coundown">
                <Countdown date={1657767924151} renderer={coundownRenderer} />
              </Center>
            </Box>
            <Flex direction={'column'} alignItems="stretch" className="v-d-metadata-container">
              <Flex className="v-d-metadata-container-inner">
                <Flex>
                  <Text className="v-d-metadata-title">Supply: </Text>
                  <Text className="v-d-metadata-value">{supply}</Text>
                </Flex>
                <Flex>
                  <Text className="v-d-metadata-title">Remaining: </Text>
                  <Text className="v-d-metadata-value">{remaining}</Text>
                </Flex>
              </Flex>
              <hr className="v-d-divider" />
              <Box className="v-d-metadata-price">
                <Text className="v-d-metadata-title">Current price</Text>
                <Flex direction={'row'} alignItems="center">
                  <Image className="v-d-currency-unit-icon" w="25px" h="25px" src="/assets/icons/icons-eth.svg" />
                  <Text className="v-d-metadata-value">{price}</Text>
                </Flex>
                <Box>
                  <Button colorScheme="blue" size="lg">
                    {soldOut ? 'Sold out' : 'Buy now'}
                  </Button>
                </Box>
              </Box>
            </Flex>
            <Box className="v-d-accordion">
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Description
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box className="v-d-metadata-des">
                      Capsule House is Seerlight and Kaejunni's first NFT collection. This collection consists of 10,000
                      unique gachapon NFTs - a digital version of the collectible toys popular in Japan. With over 120
                      variants and endless combinations of traits, each Capsule NFT contains a verifiably rare and
                      unique gachapon artwork.
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default DetailNFT;
