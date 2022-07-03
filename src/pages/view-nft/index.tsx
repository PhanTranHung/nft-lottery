import { Box } from '@chakra-ui/react';
import Container from '../../components/Container';
import DetailNFT from './DetailNFT';
import './index.css';

export interface ViewNFTProps {
  children?: React.ReactNode;
}

const ViewNFT: React.FC = () => {
  return (
    <>
      <Box className="page-content">
        <Container>
          <DetailNFT />
        </Container>
      </Box>
    </>
  );
};

export default ViewNFT;
