import { Box, Heading, HStack, Radio, Text } from '@chakra-ui/react';
import React from 'react';
import { MagicImage } from '../../components/Image';
import ShortString from '../../components/ShortString';
import { INFTData } from '../../types';

interface NFTItemSelectableProps {
  nftData: INFTData;
  selected?: { address: string; tokenId: string };
  onSelect?: (address: string, tokenId: string) => void;
  children?: React.ReactNode;
}

const NFTItemSelectable: React.FC<NFTItemSelectableProps> = ({ nftData, selected, onSelect = () => {} }) => {
  const handleSelectNFT = () => {
    onSelect(nftData.token_address, nftData.token_id);
  };

  const isSelected = !!selected && selected.address === nftData.token_address && selected.tokenId === nftData.token_id;

  console.log(isSelected);

  return (
    <>
      <Box cursor={'pointer'} onClick={handleSelectNFT}>
        <Radio size="lg" checked={false} colorScheme="orange" />
        <Box>
          <Box>
            <MagicImage src={nftData.metadata_parsed?.image} />
          </Box>
          <Box>
            <Heading as={'h2'} fontSize="16px">
              {nftData.name} #{nftData.token_id}
            </Heading>
            <HStack>
              <ShortString str={nftData.token_address} />
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NFTItemSelectable;
