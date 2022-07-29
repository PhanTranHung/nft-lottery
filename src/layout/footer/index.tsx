import React from 'react';
import { Box, Flex, HStack, Image, Spacer, Text } from '@chakra-ui/react';
import Container from '../../components/Container';
import { FaFacebook, FaGooglePlus, FaInstagram } from 'react-icons/fa';
import './index.css';

const Footer: React.FC = () => {
  return (
    <>
      <Box className="f-container">
        <Container>
          <Box py={12}>
            <Flex>
              <Box maxW={'50%'}>
                <Flex direction={'column'}>
                  <Box>
                    <Image w={24} src="/logo.png" alt="logo" />
                  </Box>
                  <Box color={'gray'}>
                    <Box>
                      NFTS,or non-fungible tokens,are digital assets that represent real-world objects like art, image.
                    </Box>
                    <Box>
                      They are one ofakind and can be bought and sold online using cryptocurrency.NFT Marketplace
                      assists artists to sell their works.
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Spacer />

              <Box>
                <Flex direction={'column'}>
                  <Text color={'gray'}>Contact us:</Text>
                  <Box>
                    <HStack spacing={4}>
                      <FaFacebook size={'3rem'} />
                      <FaGooglePlus size={'3rem'} />
                      <FaInstagram size={'3rem'} />
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
