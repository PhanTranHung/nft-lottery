import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { getNFTContract } from '.';
import { useContractCall } from '../../hooks/useContract';
import { INFTMetadata } from '../../types';
import { isUrlValid } from '../../utils/networks';

export const useTokenURI = ({
  address = '',
  tokenId = '',
}: {
  address: string;
  tokenId: string | number | BigNumber;
}) => {
  const contract = useMemo(() => getNFTContract(address), [address]);

  const { value, fetch } = useContractCall(
    contract &&
      tokenId && {
        contract: contract,
        method: 'tokenURI',
        args: [tokenId],
      }
  );

  return { uri: value as string | undefined, fetch };
};

export const useTokenMetadata = ({
  address = '',
  tokenId = '',
}: {
  address?: string;
  tokenId?: string | number | BigNumber;
}) => {
  const { uri, ...others } = useTokenURI({ address, tokenId });

  const [metadata, setMetadata] = useState<INFTMetadata | undefined>();

  useEffect(() => {
    if (uri) {
      let url: string | undefined = undefined;
      if (uri.startsWith('ipfs://')) url = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      if (isUrlValid(uri)) url = uri;
      if (url) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            try {
              const data = JSON.parse(xhttp.responseText);
              setMetadata(data);
            } catch (error) {}
          }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
      }
    }

    return undefined;
  }, [uri]);

  return { metadata, ...others };
};
