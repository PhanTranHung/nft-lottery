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
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import ShortString from '../../components/ShortString';
import { BiCopy, BiLinkExternal } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useOwnerOfNFT, useTokenURI } from '../../contracts/ERC721/hooks';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_CHAIN_NAME } from '../../config';
import { INFTMetadata } from '../../types';
import { parseNFTMetadata } from '../../utils/nftMetadata';
import { MagicImage } from '../../components/Image';
import {
  useNFTLotteryPoolContractFunction,
  usePoolEndDate,
  usePoolIsOver,
  usePoolMaxTicketsToHold,
  usePoolMaxTicketsToSell,
  usePoolMinTicketsToSell,
  usePoolNFTPrize,
  usePoolNFTPrizeTokenId,
  usePoolStartDate,
  usePoolTicketBanlance,
  usePoolTicketPrice,
  usePoolTicketSold,
} from '../../contracts/NFTLotteryPool/hooks';
import { formatEther } from 'ethers/lib/utils';
import { LoadingSVG } from '../../assets/Loading';
import { useWeb3React } from '@web3-react/core';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import dayjs from 'dayjs';

export interface DetailNFTProps {
  children?: React.ReactNode;
}

const DetailNFT: React.FC = () => {
  const [isSending, setSending] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState('1');
  const { account } = useWeb3React();
  const { poolAddress = '' } = useParams();
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { token } = useMoralisWeb3Api();
  const [nftMetadata, setNFTMetadata] = useState<INFTMetadata>();
  const NFTPrize = usePoolNFTPrize({ poolAddress: poolAddress });
  const NFTPrizeTokenId = usePoolNFTPrizeTokenId({ poolAddress: poolAddress });
  const ticketPrice = usePoolTicketPrice({ poolAddress: poolAddress });
  const startDate = usePoolStartDate({ poolAddress: poolAddress });
  const endDate = usePoolEndDate({ poolAddress: poolAddress });
  const maxToSell = usePoolMaxTicketsToSell({ poolAddress: poolAddress });
  const minSell = usePoolMinTicketsToSell({ poolAddress: poolAddress });
  const maxToHold = usePoolMaxTicketsToHold({ poolAddress: poolAddress });
  const ticketSold = usePoolTicketSold({ poolAddress: poolAddress });
  const poolOver = usePoolIsOver({ poolAddress: poolAddress });
  const buyTicket = useNFTLotteryPoolContractFunction('buyTickets', { poolAddress });
  const ticketBalance = usePoolTicketBanlance(account, { poolAddress: poolAddress });
  const nftOwner = useOwnerOfNFT(nftMetadata?.token_address, nftMetadata?.token_id);

  const [_, copyToClipboard] = useCopyToClipboard({ timeToClear: 4000 });

  const price = formatEther(ticketPrice.bigPrice);
  const remaining = (maxToSell.amount ?? 0) - (ticketSold.amount ?? 0) ?? 0;
  const soldOut = remaining === 0;
  const isPoolEnded = soldOut || poolOver.isOver || dayjs(endDate.timestamp).isBefore(Date.now());

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

  // Renderer callback with condition
  const coundownRenderer: CountdownRendererFn = ({ completed, formatted: { days, hours, minutes, seconds } }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          <Box>
            {isPoolEnded && poolOver.isOver ? (
              <>
                <Box>
                  <Center>The Winner is</Center>
                  <Center>{nftOwner.address}</Center>
                </Box>
              </>
            ) : (
              <>
                <Center fontSize={'20px'}>Lottery is ended</Center>
                <Center>Waiting for ...</Center>
              </>
            )}
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

  const handleBuyTicket = async () => {
    setSending(true);
    try {
      const txResult = await buyTicket.send(amountToBuy, {
        value: ticketPrice.bigPrice.mul(amountToBuy),
      });

      console.log(txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
      refetchAll();
    }
  };

  const handleAmountToBuyChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setAmountToBuy(elm.target.value);
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(nftMetadata?.token_address);
  };

  const refetchAll = () => {
    NFTPrize.fetch();
    NFTPrizeTokenId.fetch();
    ticketPrice.fetch();
    startDate.fetch();
    minSell.fetch();
    maxToHold.fetch();
    poolOver.fetch();
    ticketBalance.fetch();
    endDate.fetch();
    maxToSell.fetch();
    ticketSold.fetch();
  };

  console.log('data', nftOwner);

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

          <Box className="v-d-accordion">
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={'12px'}>
                  <Text className="v-d-metadata-title">
                    From: <b>{dayjs(startDate.timestamp).format('DD/MM/YYYY HH:mm:ss')}</b>
                  </Text>
                  <Text className="v-d-metadata-title">
                    To: <b>{dayjs(endDate.timestamp).format('DD/MM/YYYY HH:mm:ss')}</b>
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box className="v-d-box-info">
          <Flex direction={'column'}>
            <Box>
              <Heading as="h2" color="blue.400">
                {nftMetadata?.name} #{nftMetadata?.token_id}
              </Heading>
              <Box onClick={handleCopyToClipboard} className="v-d-box-little-text">
                <HStack>
                  <ShortString str={nftMetadata?.token_address} />
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
                  <Text className="v-d-metadata-title">Remaining: </Text>
                  <Text className="v-d-metadata-value">{remaining}</Text>
                </Flex>
                <Flex>
                  <Text className="v-d-metadata-title">Supply: </Text>
                  <Text className="v-d-metadata-value">{maxToSell.amount}</Text>
                </Flex>
              </Flex>
              <hr className="v-d-divider" />
              <Box className="v-d-metadata-price">
                <Flex direction="row">
                  <Box flexGrow={1}>
                    <Text className="v-d-metadata-title">Current price</Text>
                    <Flex direction={'row'} alignItems="center">
                      <Image className="v-d-currency-unit-icon" w="25px" h="25px" src="/assets/icons/icons-eth.svg" />
                      <Text className="v-d-metadata-value">{price}</Text>
                    </Flex>
                    <Box>
                      {isPoolEnded ? (
                        <Button colorScheme="blue" size="lg">
                          {soldOut ? 'Sold out' : 'This lottery is over'}
                        </Button>
                      ) : (
                        <>
                          <FormControl display={'flex'} gap={'5px'} alignItems="center">
                            <Input
                              value={amountToBuy}
                              onChange={handleAmountToBuyChange}
                              name="amount-to-buy"
                              type="text"
                              maxWidth={'6.25rem'}
                            />
                            <Button
                              onClick={handleBuyTicket}
                              colorScheme="blue"
                              size="lg"
                              disabled={isSending}
                              paddingX={'0.3125rem'}
                              minWidth={'8.125rem'}
                            >
                              Buy now {ticketBalance.amount ?? 0}/{maxToHold.amount ?? 0} {isSending && <LoadingSVG />}
                            </Button>
                          </FormControl>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box flexGrow={1}>
                    <Text className="v-d-metadata-title">Min sell</Text>
                    <Text className="v-d-metadata-value">{minSell.amount}</Text>
                  </Box>
                </Flex>
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
