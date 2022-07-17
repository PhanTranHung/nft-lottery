import { Box } from '@chakra-ui/react';
import FormApproveNFT from './FormAppoveNFT';
import FormCustomNFT from './FormCustomNFT';
import FormSelectNFT from './FormSelectNFT';
import Intro from './Intro';
import './index.css';
import { ChangeEvent, useState } from 'react';
import { useOwnerOfNFT } from '../../contracts/ERC721/hooks';

const CreateNFT: React.FC = () => {
  const [nftAddress, setNFTAddress] = useState('');
  const [tokenId, setTokenId] = useState('');

  const handleNFTAddressChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setNFTAddress(elm.target.value);
  };
  const handleTokenIdChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setTokenId(elm.target.value);
  };

  return (
    <>
      <Box paddingY="3rem">
        <Intro />
        <FormSelectNFT
          address={nftAddress}
          id={tokenId}
          onAddressChange={handleNFTAddressChange}
          onIdChange={handleTokenIdChange}
        />
        <FormApproveNFT />
        <FormCustomNFT nftAddress={nftAddress} tokenId={tokenId} />
      </Box>
    </>
  );
};

export default CreateNFT;
