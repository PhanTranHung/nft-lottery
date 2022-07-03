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
import Countdown, { CountdownRendererFn } from 'react-countdown';
import { Link } from 'react-router-dom';
import { NumericLiteral } from 'typescript';

export interface NFTItemProps {
  imageUrl?: string;
  nftName: string;
  remainingTime: string;
  price: number;
  sold: number;
  total: number;
  remainingTicket: number;
  nftAddress: string;
  children?: React.ReactNode;
}

const NFTItem: React.FC<NFTItemProps> = ({
  children,
  imageUrl = '/assets/images/nft-image-2.png',
  nftName,
  remainingTime,
  price,
  sold,
  total,
  remainingTicket,
  nftAddress,
}) => {
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
            <Image src={imageUrl} />
          </Box>
          <Box className="l-i-nft-box-padding">
            <Flex direction={'column'}>
              <Heading as="h2" className="l-i-title">
                {nftName}
              </Heading>
              <Box fontWeight={700} marginTop="0.5rem">
                <Countdown date={1657767924151} renderer={coundownRenderer} />
              </Box>
              <HStack>
                <Text className="l-i-metada-title">Sold:</Text>
                <Text>
                  {sold}/{total}
                </Text>
              </HStack>
              <HStack>
                <Text className="l-i-metada-title">Price:</Text>
                <Text>{price}</Text>
                <Image className="v-d-currency-unit-icon" w="25px" h="25px" src="/assets/icons/icons-eth.svg" />
              </HStack>
            </Flex>
            <Link to="/view-nft">
              <Button className="l-i-button" colorScheme={'blue'}>
                Buy now
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NFTItem;
