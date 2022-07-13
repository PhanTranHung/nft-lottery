import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { getNFTLotteryPoolContract, NFTLotteryPoolContract } from '.';
import { useContractCall } from '../../hooks/useContract';

interface Options {
  poolAddress?: string;
  fallback?: boolean;
}

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

  return { timestamp: value?.toNumber?.() as number | undefined, fetch };
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

  return { timestamp: value?.toNumber?.() as number | undefined, fetch };
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

  return { amount: value?.toNumber?.() as number | undefined, fetch };
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

  return { amount: (value?.toNumber ? value?.toNumber() : value) as number | undefined, fetch };
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

  return { amount: value as string | undefined, fetch };
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

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };

// export const usePool = () => {
//   const { value, fetch } = useContractCall({
//     contract: NFTLotteryPoolContract,
//     method: 'prizeAddress',
//     args: [],
//   });

//   return { nftAddress: value as number | undefined, fetch };
// };
