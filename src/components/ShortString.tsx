import React from 'react';
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';

interface IProps {
  str?: string;
  slice?: [start: number, end: number];
  children?: React.ReactNode;
}
const ShortString: React.FC<IProps> = ({ str = '', slice = [6, 4], children }) => {
  const { start, end } = useMemo(() => {
    const start = str.slice(0, str.length - slice[1]);
    const end = str.slice(slice[1] * -1);

    return { start, end };
  }, [str]);

  return (
    <>
      <Flex wrap={'nowrap'} w="100%" justifyContent={'start'}>
        <Text overflow={'hidden'} whiteSpace="nowrap" textOverflow={'ellipsis'} display="inline-block">
          {start}
        </Text>
        <Text>{end}</Text>
      </Flex>
    </>
  );
};

export default ShortString;
