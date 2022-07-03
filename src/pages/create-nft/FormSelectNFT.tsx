import { Box, FormControl, Heading, Text } from '@chakra-ui/react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';

const FormSelectNFT: React.FC = () => {
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
                  <Input name="nft-address" label="NFT Address" type="text" />
                </Box>
                <Box>
                  <Input name="nft-id" label="ID" type="text" />
                </Box>
                <Box>
                  <Button colorScheme={'blue'}>Approve NFT</Button>
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
