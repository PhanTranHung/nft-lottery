import React from 'react';
import { Box, FormControl, FormHelperText, FormLabel, Image, Input as CInput, InputProps } from '@chakra-ui/react';

interface IProps extends InputProps {
  label?: string;
  helperText?: string;
  children?: React.ReactNode;
}
const Input: React.FC<IProps> = ({ children, label, helperText, name, type, ...others }) => {
  return (
    <>
      <Box>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <CInput id={name} type={type} name={name} {...others} />
        <FormHelperText color="red.400" mb="0.3125rem" minHeight="1rem">
          {helperText}
        </FormHelperText>
        {children}
      </Box>
    </>
  );
};

export default Input;
