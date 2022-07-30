import {
  Box,
  Button,
  Button as CButton,
  ButtonProps,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { formatEther } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link } from 'react-router-dom';
import { NumericLiteral } from 'typescript';
import { MagicImage } from '../../components/Image';
import { DEFAULT_CHAIN_NAME } from '../../config';
import { useTokenMetadata, useTokenURI } from '../../contracts/NFT/hook';
import {
  usePoolEndDate,
  usePoolIsOver,
  usePoolMaxTicketsToSell,
  usePoolStartDate,
  usePoolTicketPrice,
  usePoolTicketSold,
} from '../../contracts/NFTLotteryPool/hooks';
import { PoolInfo } from '../../contracts/NFTLottetyPoolFactory/hooks';

export interface NFTItemProps {
  poolInfo: PoolInfo;
  children?: React.ReactNode;
}

const NFTItem: React.FC<NFTItemProps> = ({ poolInfo, children }) => {
  const { poolAddr, nftAddr, seller, tokenId } = poolInfo;

  const ticketPrice = usePoolTicketPrice({ poolAddress: poolAddr });
  const startDate = usePoolStartDate({ poolAddress: poolAddr });
  const endDate = usePoolEndDate({ poolAddress: poolAddr });
  const maxToSell = usePoolMaxTicketsToSell({ poolAddress: poolAddr });
  const ticketSold = usePoolTicketSold({ poolAddress: poolAddr });
  const poolOver = usePoolIsOver({ poolAddress: poolAddr });
  const { metadata, fetch } = useTokenMetadata({ address: nftAddr, tokenId });

  const [state, setState] = useState<'Wait' | 'Open' | 'End' | 'Over' | 'None'>('None');
  const coundownTimestamp =
    (state === 'Wait' ? startDate.timestamp : state === 'Open' ? endDate.timestamp : 0) ??
    dayjs().add(1, 'hour').valueOf();

  // console.log(tokenMetadata);

  const price = formatEther(ticketPrice.bigPrice);

  useEffect(() => {
    if (poolOver.isOver) return setState('Over');
    if (!startDate.timestamp || !endDate.timestamp) return setState('None');
    if (dayjs(endDate.timestamp).isBefore(startDate.timestamp)) return setState('None');
    if (dayjs().isBefore(startDate.timestamp)) return setState('Wait');
    if (dayjs().isAfter(startDate.timestamp) && dayjs().isBefore(endDate.timestamp)) return setState('Open');
    if (dayjs().isAfter(endDate.timestamp)) return setState('End');
  }, [startDate.timestamp, endDate.timestamp, poolOver.isOver]);

  // Renderer callback with condition
  const coundownRenderer: CountdownRendererFn = ({ completed, formatted: { days, hours, minutes, seconds } }) => {
    return (
      <Box>
        <Center color={'#2081e2'} fontSize={'23px'}>
          {state === 'Wait' ? 'Open in ' : undefined}
          {days}:{hours}:{minutes}:{seconds}
        </Center>
      </Box>
    );
  };

  const handleCoundownCompelete = () => {
    if (state === 'Wait') return setState('Open');
    if (state === 'Open') return setState('End');
  };

  return (
    <>
      <Box className="l-i-nft-box">
        <Box>
          <Box>
            <MagicImage src={metadata?.image} />
          </Box>
          <Box className="l-i-nft-box-padding">
            <Flex direction={'column'}>
              <Heading as="h2" className="l-i-title">
                {metadata?.name}
              </Heading>
              <Box fontWeight={700} marginTop="0.5rem">
                {state === 'Wait' || state === 'Open' ? (
                  <Countdown
                    date={coundownTimestamp}
                    renderer={coundownRenderer}
                    onComplete={handleCoundownCompelete}
                  />
                ) : (
                  <Box>
                    <Center color={'#8f2424'} fontSize={'23px'}>
                      Lottery is ended
                    </Center>
                  </Box>
                )}
              </Box>
              <HStack>
                <Text className="l-i-metada-title">Sold:</Text>
                <Text>
                  {ticketSold.amount}/{maxToSell.amount}
                </Text>
              </HStack>
              <HStack>
                <Text className="l-i-metada-title">Price:</Text>
                <Text>{price}</Text>
                <Image className="v-d-currency-unit-icon" w="20px" h="20px" src="/assets/icons/icons-bsc.svg" />
              </HStack>
            </Flex>
            <Link to={`/view-lottery/${poolAddr}`}>
              <Button className="l-i-button" colorScheme={'blue'}>
                {state !== 'Open' ? 'View Detail' : 'Buy now'}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NFTItem;
