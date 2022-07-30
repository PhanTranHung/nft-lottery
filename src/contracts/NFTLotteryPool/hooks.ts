import { BigNumber } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { getNFTLotteryPoolContract, NFTLotteryPoolContract } from '.';
import { ITransactionOptions, useContractCall, useContractFunction } from '../../hooks/useContract';

interface Options {
  poolAddress?: string;
  fallback?: boolean;
}

export const useNFTLotteryPoolContractFunction = (
  methodName: string,
  { poolAddress = '', fallback = false }: Options = {},
  options?: ITransactionOptions
) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  return useContractFunction(contract, methodName, options);
};

export const usePoolNFTPrize = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'prizeAddress',
      args: [],
    }
  );

  return { address: (value ?? '') as string, fetch };
};

export const usePoolNFTPrizeTokenId = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'prizeId',
      args: [],
    }
  );

  return { tokenId: value?.toString?.() as string | undefined, fetch };
};

export const usePoolStartDate = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'startDate',
      args: [],
    }
  );

  return { timestamp: (value as BigNumber | undefined)?.mul(1000)?.toNumber?.(), fetch };
};

export const usePoolEndDate = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'endDate',
      args: [],
    }
  );

  return { timestamp: (value as BigNumber | undefined)?.mul(1000)?.toNumber?.(), fetch };
};

export const usePoolMinTicketsToSell = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'minTicketsToSell',
      args: [],
    }
  );

  return { amount: (value?.toNumber?.() ?? value) as number | undefined, fetch };
};

export const usePoolMaxTicketsToSell = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'maxTickets',
      args: [],
    }
  );

  return { amount: (value?.toNumber?.() ?? value) as number | undefined, fetch };
};

export const usePoolMaxTicketsToHold = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'maxTicketsPerAddress',
      args: [],
    }
  );

  return { amount: (value?.toNumber?.() ?? value) as string | undefined, fetch };
};

export const usePoolTicketPrice = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'ticketPrice',
      args: [],
    }
  );

  return { bigPrice: (value ?? BigNumber.from('0')) as BigNumber, fetch };
};

export const usePoolEnded = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'hasCalledVRF',
      args: [],
    }
  );

  return { isEnded: value as boolean | undefined, fetch };
};

export const usePoolTicketSold = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'tokenCounter',
      args: [],
    }
  );

  return { amount: (value?.toNumber?.() ?? value) as number | undefined, fetch };
};

export const usePoolTicketBanlance = (
  address: string | undefined = '',
  { poolAddress = '', fallback = false }: Options
) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    isAddress(address) &&
      contract && {
        contract: contract,
        method: 'balanceOf',
        args: [address],
      }
  );

  return { amount: (value?.toNumber?.() ?? value) as number | undefined, fetch };
};

export const usePoolIsOver = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'hasCalledVRF',
      args: [],
    }
  );

  return { isOver: value as boolean | undefined, fetch };
};

export const usePoolOwner = ({ poolAddress = '', fallback = false }: Options) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

  const { value, fetch } = useContractCall(
    contract && {
      contract: contract,
      method: 'owner',
      args: [],
    }
  );

  return { address: value as string | undefined, fetch };
};

export const useTokenURI = ({
  tokenId,
  poolAddress = '',
  fallback = false,
}: Options & { tokenId: string | number | BigNumber }) => {
  const contract =
    useMemo(() => getNFTLotteryPoolContract(poolAddress), [poolAddress]) ??
    (fallback ? NFTLotteryPoolContract : undefined);

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
