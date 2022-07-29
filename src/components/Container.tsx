import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

interface IProps {
  children?: React.ReactNode;
}
const Container: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Box px={24} maxWidth={'1440px'} marginX="auto">
        {children}
      </Box>
    </>
  );
};

export default Container;
