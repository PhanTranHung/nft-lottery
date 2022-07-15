import {
  Box,
  Button,
  Button as CButton,
  ButtonProps,
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
  usePoolTicketPrice,
  usePoolTicketSold,
} from '../../contracts/NFTLotteryPool/hooks';
import { PoolInfo } from '../../contracts/NFTLottetyPoolFactory/hooks';
import { INFTMetadata } from '../../types';
import { parseNFTMetadata } from '../../utils/nftMetadata';

export interface NFTItemProps {
  imageUrl?: string;
  poolInfo: PoolInfo;
  children?: React.ReactNode;
}

const NFTItem: React.FC<NFTItemProps> = ({ imageUrl = '/assets/images/nft-image-2.png', poolInfo, children }) => {
  const { poolAddr, nftAddr, seller, tokenId } = poolInfo;
  const { Moralis, isWeb3Enabled } = useMoralis();
  const { token } = useMoralisWeb3Api();

  const [nftMetadata, setNFTMetadata] = useState<INFTMetadata>();

  const ticketPrice = usePoolTicketPrice({ poolAddress: poolAddr });
  const endDate = usePoolEndDate({ poolAddress: poolAddr });
  const maxToSell = usePoolMaxTicketsToSell({ poolAddress: poolAddr });
  const ticketSold = usePoolTicketSold({ poolAddress: poolAddr });
  const poolOver = usePoolIsOver({ poolAddress: poolAddr });

  const price = formatEther(ticketPrice.bigPrice);
  const remaining = (maxToSell.amount ?? 0) - (ticketSold.amount ?? 0) ?? 0;
  const soldOut = remaining === 0;

  const isPoolEnded = poolOver.isOver || soldOut || dayjs(endDate.timestamp).isBefore(Date.now());

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
          <Box>00:00:00:00</Box>
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
                <Countdown
                  date={endDate.timestamp ?? dayjs().add(1, 'day').toDate()}
                  renderer={coundownRenderer}
                  autoStart
                />
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
                <Image className="v-d-currency-unit-icon" w="25px" h="25px" src="/assets/icons/icons-eth.svg" />
              </HStack>
            </Flex>
            <Link to={`/view-lottery/${poolAddr}`}>
              <Button className="l-i-button" colorScheme={'blue'}>
                {isPoolEnded ? 'View Detail' : 'Buy now'}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NFTItem;
