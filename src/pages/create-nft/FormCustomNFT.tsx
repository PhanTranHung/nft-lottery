import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';

const FormCustomNFT: React.FC = () => {
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
                  <Input name="start-date" label="Start Date" type="text" />
                </Box>
                <Box>
                  <Input name="end-date" label="End Date" type="text" />
                </Box>
                <Box>
                  <Input name="minimun-to-sell" label="Minimum Tickets To Sell (Must be at least 1)" type="text" />
                </Box>
                <Box>
                  <Input name="maximun-to-sell" label="Maximum Tickets To Sell" type="text" />
                </Box>
                <Box>
                  <Input
                    name="maximun-con-hold"
                    label="Hold (The maximum number of tickets an address can hold. Must be at least 1.)"
                    type="text"
                  />
                </Box>
                <Box>
                  <Input name="nft-price" label="Ticket Price (The price in ETH for each ticket)" type="text" />
                </Box>
                <Box>
                  <Button colorScheme={'blue'}>Create Lottery</Button>
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
