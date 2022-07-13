import { INFTMetadata } from '../types';

export const parseNFTMetadata = (nftMetadata: INFTMetadata) => {
  const nftMetadataParsed: INFTMetadata = { ...nftMetadata };
  if (nftMetadata.metadata && !nftMetadata.metadata_parsed)
    try {
      nftMetadataParsed.metadata_parsed = JSON.parse(nftMetadata.metadata);
    } catch (error) {
      console.error(error);
    }

  return nftMetadataParsed;
};
