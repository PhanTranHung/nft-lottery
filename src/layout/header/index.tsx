import { Box, Button, Center, Flex, HStack, Image, Spacer } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import './index.css';

export default function Header() {
  const { connector, account, accounts, hooks, provider, isActivating, isActive, chainId, ENSName, ENSNames } =
    useWeb3React();

  useEffect(() => {
    connector.activate();
  }, [connector]);

  const handleActiveAccount = () => {
    connector.activate();
  };

  console.log(connector, account, accounts, hooks, provider, isActivating, isActive, chainId, ENSName, ENSNames);

  const handleCopyAddress = () => {
    window.navigator.clipboard.writeText(account ?? '');
  };

  const sortAddress = useMemo(() => {
    if (!!account) return account.slice(0, 6) + '...' + account.slice(-4);
  }, [account]);

  return (
    <Box className="h-container">
      <Container>
        <Flex gap="1rem">
          <Image w={24} src="/logo.png" alt="logo" />
          <Spacer />
          <HStack gap={'1rem'}>
            <Link to="/">
              <Button colorScheme="blue" variant="link">
                Home
              </Button>
            </Link>
            <Link to="/list-nft">
              <Button colorScheme="blue" variant="link">
                Lottery
              </Button>
            </Link>
            <Link to="/create-nft">
              <Button colorScheme="blue" variant="link">
                Create
              </Button>
            </Link>
          </HStack>
          <Center>
            {isActive ? (
              <Button colorScheme="cyan" size="md" variant="outline" onClick={handleCopyAddress}>
                {sortAddress}
              </Button>
            ) : (
              <Button colorScheme="red" size="md" onClick={handleActiveAccount} disabled={isActivating}>
                Connect wallet
              </Button>
            )}
          </Center>
        </Flex>
      </Container>
    </Box>
  );
}
