import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import { isAddress } from 'ethers/lib/utils';
import { ChangeEvent, useState } from 'react';
import { LOTTERY_FACTORY } from '../../address';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { getERC721Contract } from '../../contracts/ERC721';
import { useERC721ContractFunction } from '../../contracts/ERC721/hooks';
import { useNFTLotteryPoolFunction } from '../../contracts/NFTLottetyPoolFactory/hooks';

const FormSelectNFT: React.FC = () => {
  const [nftAddress, setNFTAddress] = useState('');
  const [tokenId, setTokenId] = useState('');

  const approve = useERC721ContractFunction(nftAddress.trim(), 'approve');
  const transferNft = useNFTLotteryPoolFunction('transferNft');

  const handleNFTAddressChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setNFTAddress(elm.target.value);
  };
  const handleTokenIdChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setTokenId(elm.target.value);
  };

  const handleTransferNFT = async () => {
    const address = nftAddress.trim();
    const id = tokenId.trim();

    if (!isAddress(address)) return console.log('Error...');

    try {
      const txResult = await approve.send(LOTTERY_FACTORY, id);
      if (txResult) {
        const rs = await transferNft.send(address, id);
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
                    value={nftAddress}
                    onChange={handleNFTAddressChange}
                  />
                </Box>
                <Box>
                  <Input name="nft-id" label="ID" type="text" value={tokenId} onChange={handleTokenIdChange} />
                </Box>
                <Box>
                  <Button colorScheme={'blue'} onClick={handleTransferNFT}>
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
