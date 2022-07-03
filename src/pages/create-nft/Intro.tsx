import { Box, Heading, Text } from '@chakra-ui/react';
import Container from '../../components/Container';

const Intro: React.FC = () => {
  return (
    <>
      <Box>
        <Container>
          <Box>
            <Heading as="h1" color="#2081e2">
              Create an NFT Lottery
            </Heading>
          </Box>
          <Box>
            <Text color={'gray'} fontSize="14px">
              This page walks you through setting up your own NFT lottery. You'll have to do three transactions at most:
              one to approve your NFT for the lottery, one to approve your LINK tokens for the lottery, and one to
              create the lottery itself. If your lottery doesn't sell out by your specified expiry date, you'll be able
              to retrieve your NFT and your LINK tokens.
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Intro;
