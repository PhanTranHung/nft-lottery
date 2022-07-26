import { Box } from '@chakra-ui/react';
import FormApproveNFT from './FormAppoveNFT';
import FormCustomNFT from './FormCustomNFT';
import FormSelectNFT from './FormSelectNFT';
import Intro from './Intro';
import './index.css';
import React, { ChangeEvent, useState } from 'react';
import { useOwnerOfNFT } from '../../contracts/ERC721/hooks';

const CreateNFT: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<{
    address: string;
    tokenId: string;
  }>();

  const handleNFTAddressChange = (address: string, tokenId: string) => {
    setSelectedNFT({ address, tokenId });
  };
  return (
    <>
      <Box paddingY="3rem">
        <Intro />
        <FormSelectNFT selected={selectedNFT} onSelectNFT={handleNFTAddressChange} />
        <FormApproveNFT />
        <FormCustomNFT selected={selectedNFT} />
      </Box>
    </>
  );
};

export default CreateNFT;
