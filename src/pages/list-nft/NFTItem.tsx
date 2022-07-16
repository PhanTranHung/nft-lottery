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
import { useEffect, useState } from 'react';
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link } from 'react-router-dom';
import { NumericLiteral } from 'typescript';
import { MagicImage } from '../../components/Image';
import { DEFAULT_CHAIN_NAME } from '../../config';
import {
  usePoolEndDate,
  usePoolIsOver,
  usePoolMaxTicketsToSell,
  usePoolStartDate,
  usePoolTicketPrice,
  usePoolTicketSold,
} from '../../contracts/NFTLotteryPool/hooks';
import { PoolInfo } from '../../contracts/NFTLottetyPoolFactory/hooks';
import { INFTMetadata } from '../../types';
import { parseNFTMetadata } from '../../utils/nftMetadata';

export interface NFTItemProps {
  poolInfo: PoolInfo;
  children?: React.ReactNode;
}

const NFTItem: React.FC<NFTItemProps> = ({ poolInfo, children }) => {
  const { poolAddr, nftAddr, seller, tokenId } = poolInfo;
  const { isWeb3Enabled } = useMoralis();
  const { token } = useMoralisWeb3Api();

  const [nftMetadata, setNFTMetadata] = useState<INFTMetadata>();

  const ticketPrice = usePoolTicketPrice({ poolAddress: poolAddr });
  const startDate = usePoolStartDate({ poolAddress: poolAddr });
  const endDate = usePoolEndDate({ poolAddress: poolAddr });
  const maxToSell = usePoolMaxTicketsToSell({ poolAddress: poolAddr });
  const ticketSold = usePoolTicketSold({ poolAddress: poolAddr });
  const poolOver = usePoolIsOver({ poolAddress: poolAddr });

  const [state, setState] = useState<'Wait' | 'Open' | 'End' | 'Over' | 'None'>('None');
  const coundownTimestamp =
    (state === 'Wait' ? startDate.timestamp : state === 'Open' ? endDate.timestamp : 0) ??
    dayjs().add(1, 'hour').valueOf();

  const price = formatEther(ticketPrice.bigPrice);

  useEffect(() => {
    if (poolOver.isOver) return setState('Over');
    if (!startDate.timestamp || !endDate.timestamp) return setState('None');
    if (dayjs(endDate.timestamp).isBefore(startDate.timestamp)) return setState('None');
    if (dayjs().isBefore(startDate.timestamp)) return setState('Wait');
    if (dayjs().isAfter(startDate.timestamp) && dayjs().isBefore(endDate.timestamp)) return setState('Open');
    if (dayjs().isAfter(endDate.timestamp)) return setState('End');
  }, [startDate.timestamp, endDate.timestamp, poolOver.isOver]);

  useEffect(() => {
    if (isWeb3Enabled && nftAddr && tokenId) {
      token
        .getTokenIdMetadata({
          address: nftAddr,
          token_id: tokenId.toString(),
          chain: DEFAULT_CHAIN_NAME,
        })
        .then((data) => {
          const dataParsed = parseNFTMetadata(data);
          setNFTMetadata(dataParsed);
        })
        .catch((e) => console.error(e));
    }
  }, [isWeb3Enabled, token, nftAddr, tokenId]);

  // Renderer callback with condition
  const coundownRenderer: CountdownRendererFn = ({ completed, formatted: { days, hours, minutes, seconds } }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          <Box>
            <Center color={'#8f2424'} fontSize={'23px'}>
              Lottery is ended
            </Center>
          </Box>
        </>
      );
    } else {
      // Render a countdown
      return (
        <Box>
          <Center color={'#2081e2'} fontSize={'23px'}>
            {state === 'Wait' ? 'Open in ' : undefined}
            {days}:{hours}:{minutes}:{seconds}
          </Center>
        </Box>
      );
    }
  };

  const handleCoundownCompelete = () => {
    if (state === 'Wait') return setState('Open');
    if (state === 'Open') return setState('End');
  };

  // console.log('data', coundownTimestamp);

  return (
    <>
      <Box className="l-i-nft-box">
        <Box>
          <Box>
            <MagicImage src={nftMetadata?.metadata_parsed?.image} />
          </Box>
          <Box className="l-i-nft-box-padding">
            <Flex direction={'column'}>
              <Heading as="h2" className="l-i-title">
                {nftMetadata?.name}
              </Heading>
              <Box fontWeight={700} marginTop="0.5rem">
                <Countdown date={endDate.timestamp} renderer={coundownRenderer} onComplete={handleCoundownCompelete} />
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
