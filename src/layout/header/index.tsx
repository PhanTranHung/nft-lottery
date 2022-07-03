import { Box, Button, Center, Flex, HStack, Image, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import './index.css';

export default function Header() {
  return (
    <Box className="h-container">
      <Container>
        <Flex gap="1rem">
          <Image w={24} src="/logo.png" alt="logo" />
          <Spacer />
          <HStack gap={'1rem'}>
            <Link to="/">
              <Button as="a" colorScheme="blue" variant="link">
                Home
              </Button>
            </Link>
            <Link to="/list-nft">
              <Button as="a" colorScheme="blue" variant="link">
                Lottery
              </Button>
            </Link>
            <Link to="/create-nft">
              <Button as="a" colorScheme="blue" variant="link">
                Create
              </Button>
            </Link>
          </HStack>
          <Center>
            <Button colorScheme="red" size="md">
              Connect wallet
            </Button>
          </Center>
        </Flex>
      </Container>
    </Box>
  );
}
