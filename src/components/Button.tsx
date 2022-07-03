import { Box, Button as CButton, ButtonProps, Flex, Image } from '@chakra-ui/react';

interface IProps extends ButtonProps {
  children?: React.ReactNode;
}
const Button: React.FC<IProps> = ({ children, ...others }) => {
  return (
    <>
      <Box>
        <CButton {...others}>{children}</CButton>
      </Box>
    </>
  );
};

export default Button;
