import { Box, Button, Center, Flex, HStack } from '@chakra-ui/react';
import Container from '../../components/Container';

const Actions: React.FC = () => {
  return (
    <>
      <Box className="lan-a-container">
        <Container>
          <Center>
            <Flex justifyContent={'center'} gap="2rem">
              <Button as={'a'} colorScheme="blue" href={'create-lottery'} variant="outline">
                Create Lottery
              </Button>
              <Button as={'a'} colorScheme="blue" href={'list-lottery'}>
                Recently Lottery
              </Button>
            </Flex>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default Actions;
