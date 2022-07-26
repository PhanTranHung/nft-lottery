import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { isAddress } from 'ethers/lib/utils';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { LOTTERY_FACTORY } from '../../address';
import { LoadingSVG } from '../../assets/Loading';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { DEFAULT_CHAIN_NAME } from '../../config';
import { useERC721ContractFunction } from '../../contracts/ERC721/hooks';
import { useNFTLotteryPoolFunction } from '../../contracts/NFTLottetyPoolFactory/hooks';
import { INFTData, IQueryResult } from '../../types';
import { parseNFTMetadata } from '../../utils/nftMetadata';
import NFTItemSelectable from './NFTItemSelectable';

const FormSelectNFT: React.FC<{
  selected?: { address: string; tokenId: string };
  onSelectNFT?: (address: string, tokenId: string) => void;
}> = ({ selected, onSelectNFT = () => {} }) => {
  const [isSending, setSending] = useState(false);
  const [isNFTTranfered, setNFTTranfered] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<{
    address: string;
    tokenId: string;
  }>();
  const { account } = useWeb3React();
  const approve = useERC721ContractFunction(selectedNFT?.address ?? '', 'approve');
  const transferNft = useNFTLotteryPoolFunction('transferNft');

  const Moralis = useMoralis();
  const Web3Moralis = useMoralisWeb3Api();

  const [nftData, setNFTData] = useState<IQueryResult>();

  const handleTransferNFT = async () => {
    if (!selectedNFT) return;
    const { address, tokenId } = selectedNFT;

    if (!isAddress(address)) return console.log('Error...');

    setSending(true);
    try {
      const txResult = await approve.send(LOTTERY_FACTORY, tokenId);
      console.log('approve:', txResult);

      if (txResult.status === 'Success') {
        const rs = await transferNft.send(address, tokenId);
        console.log('transfer:', rs);
        setNFTTranfered(true);
        onSelectNFT(address, tokenId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  const handleSelectNFT = (address: string, tokenId: string) => {
    if (isNFTTranfered || isSending) return;
    if (selectedNFT && selectedNFT.address === address && selectedNFT.tokenId === tokenId) {
      return setSelectedNFT(undefined);
    }
    setSelectedNFT({ address, tokenId });
  };

  useEffect(() => {
    if (Moralis.isWeb3Enabled && !!account && isAddress(account)) {
      Web3Moralis.account
        .getNFTs({
          address: account,
          chain: DEFAULT_CHAIN_NAME,
          limit: 100,
        })
        .then((rs) => {
          console.log(rs);

          const data = rs.result?.map((nft) => parseNFTMetadata(nft));
          setNFTData({ ...rs, result: data });
        })
        .catch(console.error)
        .finally(() => {});
    }
  }, [Moralis.isWeb3Enabled, account, Web3Moralis.account]);

  const disableButton = isSending || !!selected || !selectedNFT;

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
            <Box py={'2rem'}>
              <Box display={'grid'} gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gridGap={'10px'}>
                {nftData?.result?.map((nft, idx) => (
                  <NFTItemSelectable key={idx} nftData={nft} onSelect={handleSelectNFT} selected={selectedNFT} />
                ))}
              </Box>
            </Box>
            <Box>
              <Button colorScheme={'blue'} onClick={handleTransferNFT} type="submit" disabled={disableButton}>
                Transfer NFT {isSending && <LoadingSVG />}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FormSelectNFT;
