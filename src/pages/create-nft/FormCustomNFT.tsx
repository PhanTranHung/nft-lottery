import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input as CInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { isAddress, parseEther, parseUnits } from 'ethers/lib/utils';
import React, { ChangeEvent, useState } from 'react';
import { LoadingSVG } from '../../assets/Loading';
import Button from '../../components/Button';
import Container from '../../components/Container';
import { useNFTLotteryPoolFunction } from '../../contracts/NFTLottetyPoolFactory/hooks';
import { DateRange, Calendar } from 'react-date-range';
import dayjs from 'dayjs';
import TimePicker from 'rc-time-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Input from '../../components/Input';
import moment, { Moment } from 'moment';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'rc-time-picker/assets/index.css';
import { BigNumber } from 'ethers';
import { isNumeric } from '../../utils/number';
import { useERC721ContractFunction } from '../../contracts/ERC721/hooks';
import { LOTTERY_FACTORY } from '../../address';

const FormCustomNFT: React.FC<{ selected?: { address: string; tokenId: string } }> = ({ selected }) => {
  const [isSending, setSending] = useState(false);
  const [startTime, setStartTime] = useState(new Date(0));
  const [endTime, setEndTime] = useState(new Date(0));
  const [minSell, setMinSell] = useState('');
  const [maxSell, setMaxSell] = useState('');
  const [maxHold, setMaxHold] = useState('');
  const [price, setPrice] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenStartTimePicker,
    onOpen: onOpenStartTimePicker,
    onClose: onCloseStartTimePicker,
  } = useDisclosure();
  const { isOpen: isOpenEndTimePicker, onOpen: onOpenEndTimePicker, onClose: onCloseEndTimePicker } = useDisclosure();

  const approve = useERC721ContractFunction(selected?.address ?? '', 'approve');
  const transferNft = useNFTLotteryPoolFunction('transferNft');

  const [state, setState] = useState([
    {
      startDate: dayjs().toDate(),
      endDate: dayjs().add(7, 'days').toDate(),
      key: 'selection',
    },
  ]);

  const createNFTLotteryPool = useNFTLotteryPoolFunction('createNFTLotteryPool');

  const handleStartTimeChange = (time: Moment) => {
    setStartTime(time.toDate());
  };
  const handleEndTimeChange = (time: Moment) => {
    setEndTime(time.toDate());
  };

  const handleStartDateChange = (date: Date) => {
    state[0].startDate = date;
    setState([...state]);
  };
  const handleEndDateChange = (date: Date) => {
    state[0].endDate = date;
    setState([...state]);
  };

  const handleMinSellChange = (elm: ChangeEvent<HTMLInputElement>) => {
    const value = elm.target.value;
    if (!isNumeric(value)) return;
    setMinSell(value);
  };
  const handleMaxSellChange = (elm: ChangeEvent<HTMLInputElement>) => {
    const value = elm.target.value;
    if (!isNumeric(value)) return;
    setMaxSell(value);
  };
  const handleMaxHoldChange = (elm: ChangeEvent<HTMLInputElement>) => {
    const value = elm.target.value;
    if (!isNumeric(value)) return;
    setMaxHold(value);
  };
  const handlePriceChange = (elm: ChangeEvent<HTMLInputElement>) => {
    const value = elm.target.value;
    if (!isNumeric(value)) return;
    setPrice(value);
  };

  const minimunError = !minSell
    ? ''
    : !isNumeric(minSell)
    ? 'Must be a number'
    : BigNumber.from(minSell).lt('1')
    ? 'Must be at least 1'
    : '';

  const maximunError = !maxSell
    ? ''
    : !isNumeric(maxSell)
    ? 'Must be a number'
    : BigNumber.from(maxSell).lt('1')
    ? 'Must be at least 1'
    : minimunError || !minSell
    ? ''
    : BigNumber.from(maxSell).lt(minSell)
    ? `Can't be smaller than minimun tickets`
    : '';

  const maxHoldError = !maxHold
    ? ''
    : !isNumeric(maxHold)
    ? 'Must be a number'
    : BigNumber.from(maxHold).lt('1')
    ? 'Must be at least 1'
    : maximunError || !maxSell
    ? ''
    : BigNumber.from(maxHold).gt(maxSell)
    ? `Can't be greater than maximun tickets`
    : '';

  const priceError = !price
    ? ''
    : !isNumeric(price)
    ? 'Must be a number'
    : BigNumber.from(price).lte('0')
    ? 'Must be greater than 0'
    : '';

  debugger;
  const endDateError = dayjs(state[0].endDate).isBefore(state[0].startDate)
    ? 'End date should be greater than start date'
    : dayjs(state[0].endDate).isSame(state[0].startDate) && !dayjs(endTime).isAfter(startTime)
    ? 'End time should be greater than start time'
    : '';

  // ? ''
  // : !isNumeric(price)
  // ? 'Must be a number'
  // : BigNumber.from(price).lte('0')
  // ? 'Must be greater than 0'
  // : '';

  const isError =
    !minSell ||
    !maxSell ||
    !maxHold ||
    !price ||
    !!minimunError ||
    !!maximunError ||
    !!maxHoldError ||
    !!priceError ||
    !!endDateError;

  const disableButton = isError || isSending || !selected;

  const handleTransferNFT = async () => {
    if (!selected) return;
    const { address, tokenId } = selected;

    if (!isAddress(address)) return console.log('Error...');

    try {
      const txResult = await approve.send(LOTTERY_FACTORY, tokenId);
      console.log('approve:', txResult);

      if (txResult.status === 'Success') {
        const rs = await transferNft.send(address, tokenId);
        console.log('transfer:', rs);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleCreateLottery = async () => {
    console.log(startTime, endTime, minSell, maxSell, maxHold, price);
    if (!selected || isError) return;

    const { address, tokenId } = selected;
    const bigPrice = parseUnits(price ?? '0');

    try {
      setSending(true);

      const tranferResult = await handleTransferNFT();
      if (tranferResult) {
        const txResult = await createNFTLotteryPool.send(
          address,
          tokenId,
          startTime,
          endTime,
          minSell,
          maxSell,
          maxHold,
          bigPrice,
          {
            value: parseEther('0.001'),
          }
        );
        console.log('create success', txResult);
      }
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
                  <Box>
                    <FormLabel htmlFor="start-date">Start Date</FormLabel>
                    <Box display="flex" gap="1rem">
                      <Popover>
                        <PopoverTrigger>
                          <CInput
                            value={dayjs(state[0].startDate).format('DD/MM/YYYY')}
                            onChange={() => {}}
                            name="start-date"
                            type="text"
                            autoComplete="off"
                            w="150px"
                          />
                        </PopoverTrigger>
                        <PopoverContent w="auto">
                          <Box>
                            <Calendar onChange={handleStartDateChange} date={state[0].startDate} minDate={new Date()} />
                          </Box>
                        </PopoverContent>
                      </Popover>

                      <Box pos="relative">
                        <CInput
                          value={dayjs(startTime).format('HH:mm:ss')}
                          onClick={onOpenStartTimePicker}
                          onChange={() => {}}
                          name="start-time"
                          type="text"
                          autoComplete="off"
                          w="150px"
                        />
                        <Box pos="absolute" bottom="0" left="0">
                          <TimePicker
                            defaultValue={moment(startTime)}
                            onChange={handleStartTimeChange}
                            open={isOpenStartTimePicker}
                            onClose={onCloseStartTimePicker}
                            onOpen={onOpenStartTimePicker}
                            format={'HH:mm:ss'}
                            inputReadOnly
                          />
                        </Box>
                      </Box>
                      <Button colorScheme="gray" variant="outline" onClick={onOpen}>
                        <FaRegCalendarAlt />
                      </Button>
                    </Box>
                    <FormHelperText minHeight="1rem" color="red.400" mb="0.3125rem"></FormHelperText>
                  </Box>
                  <Box>
                    <FormLabel htmlFor="end-date">End Date</FormLabel>
                    <Box display="flex" gap="1rem">
                      <Popover>
                        <PopoverTrigger>
                          <CInput
                            value={dayjs(state[0].endDate).format('DD/MM/YYYY')}
                            onChange={() => {}}
                            name="end-date"
                            type="text"
                            autoComplete="off"
                            w="150px"
                          />
                        </PopoverTrigger>
                        <PopoverContent w="auto">
                          <Box>
                            <Calendar
                              onChange={handleEndDateChange}
                              date={state[0].endDate}
                              minDate={state[0].startDate}
                            />
                          </Box>
                        </PopoverContent>
                      </Popover>

                      <Box pos="relative">
                        <CInput
                          value={dayjs(endTime).format('HH:mm:ss')}
                          onChange={() => {}}
                          onClick={onOpenEndTimePicker}
                          name="end-time"
                          type="text"
                          autoComplete="off"
                          w="150px"
                        />
                        <Box pos="absolute" bottom="0" left="0">
                          <TimePicker
                            defaultValue={moment(endTime)}
                            onChange={handleEndTimeChange}
                            open={isOpenEndTimePicker}
                            onClose={onCloseEndTimePicker}
                            onOpen={onOpenEndTimePicker}
                            format={'HH:mm:ss'}
                            inputReadOnly
                          />
                        </Box>
                      </Box>

                      <Button colorScheme="gray" variant="outline" onClick={onOpen}>
                        <FaRegCalendarAlt />
                      </Button>
                    </Box>
                    <FormHelperText minHeight="1rem" color="red.400" mb="0.3125rem">
                      {endDateError}
                    </FormHelperText>
                  </Box>
                </Box>
                <Box>
                  <Input
                    value={minSell}
                    onChange={handleMinSellChange}
                    name="minimun-to-sell"
                    label="Minimum Tickets To Sell (Must be at least 1)"
                    type="text"
                    autoComplete="off"
                    helperText={minimunError}
                  />
                </Box>
                <Box>
                  <Input
                    value={maxSell}
                    onChange={handleMaxSellChange}
                    name="maximun-to-sell"
                    label="Maximum Tickets To Sell"
                    type="text"
                    autoComplete="off"
                    helperText={maximunError}
                  />
                </Box>
                <Box>
                  <Input
                    value={maxHold}
                    onChange={handleMaxHoldChange}
                    name="maximun-con-hold"
                    label="Hold (The maximum number of tickets an address can hold. Must be at least 1.)"
                    type="text"
                    autoComplete="off"
                    helperText={maxHoldError}
                  />
                </Box>
                <Box>
                  <Input
                    value={price}
                    onChange={handlePriceChange}
                    name="nft-price"
                    label="Ticket Price (The price in BNB for each ticket)"
                    type="text"
                    helperText={priceError}
                  />
                </Box>
                <Box>
                  <Button colorScheme={'blue'} onClick={handleCreateLottery} type="submit" disabled={disableButton}>
                    Transfer and Create Lottery {isSending && <LoadingSVG />}
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Container>

        <Box>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            blockScrollOnMount={false}
            isCentered
            motionPreset="scale"
            size="3xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select date</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box marginInline="auto" w="fit-content">
                  <DateRange
                    onChange={(item: any) => setState([item.selection])}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    // scroll={{ enabled: true }}
                    minDate={dayjs().toDate()}
                    // maxDate={dayjs().add(900, 'days').toDate()}
                  />
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Select
                </Button>
                {/* <Button variant="ghost">Secondary Action</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default FormCustomNFT;
