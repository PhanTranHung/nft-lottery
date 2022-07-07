import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';

const FormApproveNFT: React.FC = () => {
  return (
    <>
      <Box>
        <Container>
          <Box className="c-box-border">
            <Box>
              <Heading as="h2" fontSize={'24px'}>
                2. Approve LINK
              </Heading>
              <Text fontSize={'.75rem'} color="gray">
                You'll also need LINK tokens to pay the ChainLink network in order to randomly select a lottery winner.
                You can learn more about ChainLink's verifiable randomness here, and you can get LINK tokens using a DEX
                aggregator like Matcha.
              </Text>
            </Box>

            <Box paddingTop={'0.5rem'}>
              <FormControl>
                <Box>
                  <Input name="pool-address" label="Pool Address" type="text" />
                </Box>
                <Box>
                  <Input name="amount" label="Amout" type="text" />
                </Box>
                <Box>
                  <Text>Your LINK Balance: 0.000000</Text>
                  <Button colorScheme={'blue'}>Link Approved</Button>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FormApproveNFT;
