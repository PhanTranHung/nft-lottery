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
import { useParams } from 'react-router-dom';
import { useTokenURI } from '../../contracts/ERC721/hooks';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { DEFAULT_CHAIN_NAME } from '../../config';
import { INFTMetadata } from '../../types';
import { parseNFTMetadata } from '../../utils/nftMetadata';
import { MagicImage } from '../../components/Image';
import {
  usePoolEndDate,
  usePoolMaxTicketsToSell,
  usePoolNFTPrize,
  usePoolNFTPrizeTokenId,
  usePoolTicketPrice,
} from '../../contracts/NFTLotteryPool/hooks';
import { formatEther } from 'ethers/lib/utils';

export interface DetailNFTProps {
  children?: React.ReactNode;
}

const DetailNFT: React.FC = () => {
  const supply = 100;
  const remaining = 0;
  const soldOut = remaining == 0;
  const { poolAddress = '' } = useParams();
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { token } = useMoralisWeb3Api();
  const [nftMetadata, setNFTMetadata] = useState<INFTMetadata>();
  const NFTPrize = usePoolNFTPrize({
    poolAddress: poolAddress,
  });
  const NFTPrizeTokenId = usePoolNFTPrizeTokenId({
    poolAddress: poolAddress,
  });
  const ticketPrice = usePoolTicketPrice({
    poolAddress: poolAddress,
  });
  const endDate = usePoolEndDate({
    poolAddress: poolAddress,
  });
  const maxToSell = usePoolMaxTicketsToSell({
    poolAddress: poolAddress,
  });

  useEffect(() => {
    if (isWeb3Enabled && NFTPrize.address && NFTPrizeTokenId.tokenId) {
      token
        .getTokenIdMetadata({
          address: NFTPrize.address,
          token_id: NFTPrizeTokenId.tokenId,
          chain: DEFAULT_CHAIN_NAME,
        })
        .then((data) => {
          const dataParsed = parseNFTMetadata(data);
          setNFTMetadata(dataParsed);
        })
        .catch((e) => console.error(e));
    }
  }, [isWeb3Enabled, token, NFTPrize.address, NFTPrizeTokenId.tokenId]);

  console.log('data', endDate);

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

  const price = formatEther(ticketPrice.bigPrice);

  return (
    <>
      <Flex direction={'row'} gap={'1rem'}>
        <Box className="v-d-box-image-container">
          <Box className="v-d-box-image">
            <Center>
              <Box>
                <MagicImage src={nftMetadata?.metadata_parsed?.image} />
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
                  <ShortString str={poolAddress} />
                  <BiCopy />
                </HStack>
              </Box>
            </Box>
            <Box className="v-d-coundown-container ">
              <Center className="v-d-coundown">
                {endDate.timestamp ? (
                  <Countdown date={endDate.timestamp} renderer={coundownRenderer} />
                ) : (
                  <>
                    <Box>--:--:--:--</Box>
                  </>
                )}
              </Center>
            </Box>
            <Flex direction={'column'} alignItems="stretch" className="v-d-metadata-container">
              <Flex className="v-d-metadata-container-inner">
                <Flex>
                  <Text className="v-d-metadata-title">Supply: </Text>
                  <Text className="v-d-metadata-value">{maxToSell.amount}</Text>
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
                    <Box className="v-d-metadata-des">{nftMetadata?.metadata_parsed?.description}</Box>
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
