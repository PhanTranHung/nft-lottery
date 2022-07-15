import { Image, ImageProps } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

interface MagicImageProps extends ImageProps {
  fallbackImg?: string;
}

export const MagicImage: React.FC<MagicImageProps> = ({
  src,
  fallbackImg = '/assets/icons/loading.svg',
  ...others
}) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (src) {
      if (src.startsWith('ipfs://')) return setImageSrc(src.replace('ipfs://', 'https://ipfs.io/ipfs/'));

      // other...
    }
  }, [src]);

  const handleLoadImageFailure = () => {
    setImageSrc(fallbackImg);
  };

  return <Image className="magic-image" src={imageSrc} onError={handleLoadImageFailure} {...others} />;
};
