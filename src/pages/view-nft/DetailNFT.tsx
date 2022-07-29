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
  Grid,
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
import React, { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_CHAIN_NAME } from '../../config';
import { INFTData } from '../../types';
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
  usePoolOwner,
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
  const [isDrawingLottery, setDrawingLottery] = useState(false);
  const [isRefundingAsset, setRefundingAsset] = useState(false);
  const [isWithdrawing, setWithdrawing] = useState(false);
  const [isClaiming, setClaiming] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState('1');
  const { account } = useWeb3React();
  const { poolAddress = '' } = useParams();
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { token } = useMoralisWeb3Api();
  const [nftMetadata, setNFTMetadata] = useState<INFTData>();
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
  const poolOwner = usePoolOwner({ poolAddress: poolAddress });
  const ticketBalance = usePoolTicketBanlance(account, { poolAddress: poolAddress });
  const nftOwner = useOwnerOfNFT(NFTPrize.address, NFTPrizeTokenId.tokenId);
  const buyTickets = useNFTLotteryPoolContractFunction('buyTickets', { poolAddress });
  const distributePrize = useNFTLotteryPoolContractFunction('distributePrize', { poolAddress });
  const refundOwnerAssets = useNFTLotteryPoolContractFunction('refundOwnerAssets', { poolAddress });
  const getRefund = useNFTLotteryPoolContractFunction('getRefund', { poolAddress });
  const claimToken = useNFTLotteryPoolContractFunction('claimETH', { poolAddress });

  const [state, setState] = useState<'Wait' | 'Open' | 'End' | 'Over' | 'None'>('None');
  const coundownTimestamp = (state === 'Wait' ? startDate.timestamp : state === 'Open' ? endDate.timestamp : 0) ?? 0;

  const [_, copyToClipboard] = useCopyToClipboard({ timeToClear: 4000 });

  const price = formatEther(ticketPrice.bigPrice);
  const remaining = (maxToSell.amount ?? 0) - (ticketSold.amount ?? 0) ?? 0;
  const soldOut = remaining === 0;
  const isPoolOwner = account === poolOwner.address;
  const isDrawable = (ticketSold.amount ?? 0) >= (minSell.amount ?? 0);
  const isNotRefundedNFTYet = nftOwner.address === poolAddress;

  console.log(startDate.timestamp, endDate.timestamp);

  useEffect(() => {
    if (poolOver.isOver) return setState('Over');
    if (!startDate.timestamp || !endDate.timestamp) return setState('None');
    if (dayjs(endDate.timestamp).isBefore(startDate.timestamp)) return setState('None');
    if (dayjs().isBefore(startDate.timestamp)) return setState('Wait');
    if (dayjs().isAfter(startDate.timestamp) && dayjs().isBefore(endDate.timestamp)) return setState('Open');
    if (dayjs().isAfter(endDate.timestamp)) return setState('End');
  }, [startDate.timestamp, endDate.timestamp, poolOver.isOver]);

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

  const coundownRenderer: CountdownRendererFn = ({
    completed,
    days: daysNumber,
    formatted: { days, hours, minutes, seconds },
  }) => {
    return (
      <Box>
        {state === 'Wait' ? 'Open in ' : undefined}
        {daysNumber ? `${days} Days ` : undefined} {hours}:{minutes}:{seconds}
      </Box>
    );
  };

  const handleCoundownCompelete = () => {
    if (state === 'Wait') return setState('Open');
    if (state === 'Open') return setState('End');
  };

  const handleBuyTicket = async () => {
    setSending(true);
    try {
      const txResult = await buyTickets.send(amountToBuy, {
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

  const handleDrawLottery = async () => {
    setDrawingLottery(true);
    try {
      const txResult = await distributePrize.send();
      console.log(txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setDrawingLottery(false);
      refetchAll();
    }
  };

  const handleRefundOwnerAssets = async () => {
    setRefundingAsset(true);
    try {
      const txResult = await refundOwnerAssets.send();
      console.log(txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setRefundingAsset(false);
      refetchAll();
    }
  };

  const handleGetRefund = async () => {
    setWithdrawing(true);
    try {
      const txResult = await getRefund.send();
      console.log(txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setWithdrawing(false);
      refetchAll();
    }
  };

  const handleClaimToken = async () => {
    setClaiming(true);
    try {
      const txResult = await claimToken.send();
      console.log(txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setClaiming(false);
      refetchAll();
    }
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
    nftOwner.fetch();
    poolOwner.fetch();
  };

  // console.log('data', 'start date', startDate.timestamp, 'end date', endDate.timestamp);
  // console.log('data', nftOwner);

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
                  <Box className="v-d-metadata-title">
                    From: <b>{dayjs(startDate.timestamp).format('DD/MM/YYYY HH:mm:ss')}</b>
                  </Box>
                  <Box className="v-d-metadata-title">
                    To: <b>{dayjs(endDate.timestamp).format('DD/MM/YYYY HH:mm:ss')}</b>
                  </Box>
                  <Box whiteSpace={'normal'} className="v-d-metadata-title">
                    Seller:{' '}
                    <b>
                      <ShortString str={poolOwner.address} />
                    </b>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
        <Box className="v-d-box-info">
          <Flex direction={'column'}>
            <Box>
              <Heading as="h2" color="blue.400">
                {nftMetadata?.name} #{NFTPrizeTokenId.tokenId}
              </Heading>
              <Box onClick={handleCopyToClipboard} className="v-d-box-little-text">
                <HStack>
                  <ShortString str={NFTPrize.address} />
                  <BiCopy />
                </HStack>
              </Box>
            </Box>
            <Box className="v-d-coundown-container ">
              <Center className="v-d-coundown">
                {poolOver.isOver ? (
                  <Box>
                    <Center>The Winner is</Center>
                    <Center fontSize={'14px'}>{nftOwner.address}</Center>
                  </Box>
                ) : state === 'None' ? (
                  <Box>--:--:--:--</Box>
                ) : state === 'Wait' || state === 'Open' ? (
                  <Countdown
                    date={coundownTimestamp}
                    renderer={coundownRenderer}
                    onComplete={handleCoundownCompelete}
                  />
                ) : (
                  <Box>
                    <Center fontSize={'20px'}>Time is ended</Center>

                    {isDrawable ? (
                      <Center>Waiting for draw</Center>
                    ) : (
                      <>
                        <Center>Can't draw</Center>
                        <Center fontSize={'20px'}>Not enough ticket to draw</Center>
                      </>
                    )}
                  </Box>
                )}
              </Center>
              <Center>
                {(state === 'End' || state === 'Over') && (
                  <>
                    <Grid gridTemplateColumns={'repeat(2, minmax(190px, 230px ))'} gridGap={'1rem'} width="fit-content">
                      {isPoolOwner && (
                        <>
                          {isDrawable && !(state === 'Over') && (
                            <>
                              <Button
                                colorScheme="blue"
                                size="lg"
                                onClick={handleDrawLottery}
                                disabled={isDrawingLottery}
                              >
                                Draw the Lottery {isDrawingLottery && <LoadingSVG />}
                              </Button>
                            </>
                          )}

                          {state === 'Over' && (
                            <Button colorScheme="blue" size="lg" onClick={handleClaimToken} disabled={isClaiming}>
                              Claim BSC {isClaiming && <LoadingSVG />}
                            </Button>
                          )}

                          {isNotRefundedNFTYet && !isDrawable && (
                            <Button
                              colorScheme="blue"
                              size="lg"
                              onClick={handleRefundOwnerAssets}
                              disabled={isRefundingAsset}
                            >
                              Refund asset {isRefundingAsset && <LoadingSVG />}
                            </Button>
                          )}
                        </>
                      )}
                    </Grid>
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
                      <Image className="v-d-currency-unit-icon" w="25px" h="25px" src="/assets/icons/icons-bsc.svg" />
                      <Text pl={'0.5rem'} className="v-d-metadata-value">
                        {price}
                      </Text>
                    </Flex>
                    <Box>
                      {state !== 'Open' ? (
                        <>
                          {state === 'End' && (ticketBalance.amount ?? 0) > 0 ? (
                            <>
                              <Button colorScheme="blue" size="lg" onClick={handleGetRefund} disabled={isClaiming}>
                                Get Refund {ticketBalance.amount ?? 0}/{maxToHold.amount ?? 0}{' '}
                                {isWithdrawing && <LoadingSVG />}
                              </Button>
                            </>
                          ) : (
                            <Button colorScheme="blue" size="lg">
                              {state === 'Wait'
                                ? 'Please wait.'
                                : state === 'End'
                                ? `Time ended`
                                : state === 'Over'
                                ? 'Lottery is over'
                                : soldOut
                                ? 'Sold out'
                                : undefined}{' '}
                              {ticketBalance.amount ?? 0}/{maxToHold.amount ?? 0}
                            </Button>
                          )}
                        </>
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
