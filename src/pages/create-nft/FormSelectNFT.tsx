import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { ChangeEvent, useState } from 'react';
import { LOTTERY_FACTORY } from '../../address';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { useERC721ContractFunction } from '../../contracts/ERC721/hooks';
import { useNFTLotteryPoolFunction } from '../../contracts/NFTLottetyPoolFactory/hooks';

const FormSelectNFT: React.FC<{
  onAddressChange?: (elm: ChangeEvent<HTMLInputElement>) => void;
  onIdChange?: (elm: ChangeEvent<HTMLInputElement>) => void;
  address?: string;
  id?: string;
}> = ({ address = '', id = '', onAddressChange = () => {}, onIdChange = () => {} }) => {
  const approve = useERC721ContractFunction(address.trim(), 'approve');
  const transferNft = useNFTLotteryPoolFunction('transferNft');

  const handleTransferNFT = async () => {
    const nftAddress = address.trim();
    const tokenId = id.trim();

    if (!isAddress(nftAddress)) return console.log('Error...');

    try {
      const txResult = await approve.send(LOTTERY_FACTORY, tokenId);
      if (txResult) {
        const rs = await transferNft.send(nftAddress, tokenId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Container>
          <Box className="c-box-border">
            <Box>
              <Heading as="h2" fontSize={'1.5187rem'}>
                1. Select your NFT
              </Heading>
              <Text fontSize={'.75rem'} color="gray">
                Pick the NFT you'll use as a prize. If you haven't approved NFTs from this contract before, you'll need
                to do a one-time approval transaction. NOTE: Only ERC721s are supported for now!
              </Text>
            </Box>
            <Box paddingTop={'0.5rem'}>
              <FormControl>
                <Box>
                  <Input
                    name="nft-address"
                    label="NFT Address"
                    type="text"
                    value={address}
                    onChange={onAddressChange}
                  />
                </Box>
                <Box>
                  <Input name="nft-id" label="ID" type="text" value={id} onChange={onIdChange} />
                </Box>
                <Box>
                  <Button colorScheme={'blue'} onClick={handleTransferNFT} type="submit">
                    Transfer NFT
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FormSelectNFT;
