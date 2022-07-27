import { Box, Checkbox, Heading, HStack, Radio, Text } from '@chakra-ui/react';
import React from 'react';
import { MagicImage } from '../../components/Image';
import ShortString from '../../components/ShortString';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { INFTData } from '../../types';

interface NFTItemSelectableProps {
  nftData: INFTData;
  selected?: { address: string; tokenId: string };
  onSelect?: (address: string, tokenId: string) => void;
  children?: React.ReactNode;
}

const NFTItemSelectable: React.FC<NFTItemSelectableProps> = ({ nftData, selected, onSelect = () => {} }) => {
  const [_, copyFn] = useCopyToClipboard({ timeToClear: 4000 });

  const handleSelectNFT = () => {
    onSelect(nftData.token_address, nftData.token_id);
  };

  const isSelected = !!selected && selected.address === nftData.token_address && selected.tokenId === nftData.token_id;

  // console.log(isSelected, selected, nftData);
  const handleCopyAddress = () => {
    copyFn(nftData.token_address);
  };

  return (
    <>
      <Box>
        <label>
          <Box position={'relative'}>
            <Checkbox
              position="absolute"
              top="0.5rem"
              left="0.5rem"
              size="lg"
              isChecked={isSelected}
              colorScheme="blue"
              onChange={handleSelectNFT}
            />
            <Box cursor={'pointer'}>
              <Box maxHeight="200px">
                <MagicImage src={nftData.metadata_parsed?.image} />
              </Box>
            </Box>
          </Box>
        </label>
        <Box>
          <Heading as={'h2'} fontSize="16px">
            {nftData.name} #{nftData.token_id}
          </Heading>
          <Box cursor="pointer" onClick={handleCopyAddress}>
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
