import { CANCELLED } from 'dns';
import { BigNumber, constants } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { getERC20Contract } from '.';
import { ITransactionOptions, useContractCall, useContractFunction } from '../../hooks/useContract';

export const useERC20ContractFunction = (address: string, methodName: string, options?: ITransactionOptions) => {
  let erc20Contract = useMemo(() => getERC20Contract(constants.AddressZero), []);

  try {
    erc20Contract = getERC20Contract(address);
  } catch (error) {
    console.log(error);
  }

  return useContractFunction(erc20Contract, methodName, options);
};

export const useTokenERC20Balance = (erc20Address: string = '', targetAddress: string = '') => {
  let erc20Contract = useMemo(() => getERC20Contract(constants.AddressZero), []);

  try {
    erc20Contract = getERC20Contract(erc20Address);
  } catch (error) {
    // console.log(error);
  }

  const call = useMemo(
    () => ({ contract: erc20Contract, method: 'balanceOf', args: [targetAddress] }),
    [erc20Contract, targetAddress]
  );

  const { value, fetch } = useContractCall(isAddress(erc20Address) && isAddress(targetAddress) && call);

  return { balance: value || BigNumber.from(0), fetch };
};
