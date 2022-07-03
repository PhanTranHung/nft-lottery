import About from './About';
import Actions from './Actions';
import Banner from './Banner';
import Features from './Features';
import SellNFT from './SellNFT';
import './index.css';

const Landing: React.FC = () => {
  return (
    <>
      <Banner />
      <About />
      <Features />
      <SellNFT />
      <Actions />
    </>
  );
};

export default Landing;
