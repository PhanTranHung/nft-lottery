import { Box } from '@chakra-ui/react';
import FormApproveNFT from './FormAppoveNFT';
import FormCustomNFT from './FormCustomNFT';
import FormSelectNFT from './FormSelectNFT';
import Intro from './Intro';
import './index.css';

const CreateNFT: React.FC = () => {
  return (
    <>
      <Box paddingY="3rem">
        <Intro />
        <FormSelectNFT />
        <FormApproveNFT />
        <FormCustomNFT />
      </Box>
    </>
  );
};

export default CreateNFT;
