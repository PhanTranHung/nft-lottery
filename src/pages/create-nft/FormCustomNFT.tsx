import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import React, { ChangeEvent, useState } from 'react';
import { LoadingSVG } from '../../assets/Loading';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { useNFTLotteryPoolFunction } from '../../contracts/NFTLottetyPoolFactory/hooks';

const FormCustomNFT: React.FC<{ nftAddress: string; tokenId: string }> = ({ nftAddress, tokenId }) => {
  const [isSending, setSending] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minSell, setMinSell] = useState('');
  const [maxSell, setMaxSell] = useState('');
  const [maxHold, setMaxHold] = useState('');
  const [price, setPrice] = useState('');

  const createNFTLotteryPool = useNFTLotteryPoolFunction('createNFTLotteryPool');

  const handleStartDateChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setStartDate(elm.target.value);
  };
  const handleEndDateChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setEndDate(elm.target.value);
  };
  const handleMinSellChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setMinSell(elm.target.value);
  };
  const handleMaxSellChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setMaxSell(elm.target.value);
  };
  const handleMaxHoldChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setMaxHold(elm.target.value);
  };
  const handlePriceChange = (elm: ChangeEvent<HTMLInputElement>) => {
    setPrice(elm.target.value);
  };
  const handleCreateLottery = async () => {
    console.log(startDate, endDate, minSell, maxSell, maxHold, price);

    const bigPrice = parseUnits(price ?? '0');

    try {
      setSending(true);
      const txResult = await createNFTLotteryPool.send(
        nftAddress,
        tokenId,
        startDate,
        endDate,
        minSell,
        maxSell,
        maxHold,
        bigPrice,
        {
          value: parseEther('0.001'),
        }
      );

      console.log('create success', txResult);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Box>
        <Container>
          <Box className="c-box-border">
            <Box>
              <Heading as="h2" fontSize={'24px'}>
                3. Customize Lottery
              </Heading>
              <Text fontSize={'.75rem'} color="gray">
                Set the relevant information for your lottery like the ticket price and expiry date. Users can buy
                tickets after the start date and before the end date
              </Text>
            </Box>
            <Box paddingTop={'0.5rem'}>
              <FormControl>
                <Box>
                  <Input
                    value={startDate}
                    onChange={handleStartDateChange}
                    name="start-date"
                    label="Start Date"
                    type="text"
                  />
                </Box>
                <Box>
                  <Input value={endDate} onChange={handleEndDateChange} name="end-date" label="End Date" type="text" />
                </Box>
                <Box>
                  <Input
                    value={minSell}
                    onChange={handleMinSellChange}
                    name="minimun-to-sell"
                    label="Minimum Tickets To Sell (Must be at least 1)"
                    type="text"
                  />
                </Box>
                <Box>
                  <Input
                    value={maxSell}
                    onChange={handleMaxSellChange}
                    name="maximun-to-sell"
                    label="Maximum Tickets To Sell"
                    type="text"
                  />
                </Box>
                <Box>
                  <Input
                    value={maxHold}
                    onChange={handleMaxHoldChange}
                    name="maximun-con-hold"
                    label="Hold (The maximum number of tickets an address can hold. Must be at least 1.)"
                    type="text"
                  />
                </Box>
                <Box>
                  <Input
                    value={price}
                    onChange={handlePriceChange}
                    name="nft-price"
                    label="Ticket Price (The price in ETH for each ticket)"
                    type="text"
                  />
                </Box>
                <Box>
                  <Button colorScheme={'blue'} onClick={handleCreateLottery} type="submit" disabled={isSending}>
                    Create Lottery {isSending && <LoadingSVG />}
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

export default FormCustomNFT;
