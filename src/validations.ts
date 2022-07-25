import BigNumber from 'bignumber.js';
import { Source } from './factoryConfig';
import { AskBid, CurrencySymbol } from './ifaces';
import { CurrencyStrategy } from './Strategy/CurrencyStrategy';

/** TODO: Modify and Add Error class extension implementation */

export const validateCurrencySymbol = (
  value: CurrencySymbol,
  parameterName = 'currency symbol'
): void => {
  validateParameter(value, parameterName);
  if (!Object.values(CurrencySymbol).includes(value as CurrencySymbol)) {
    throw new Error('Currency not supported');
  }
};

export const validateSource = (value: Source, parameterName = 'source'): void => {
  validateParameter(value, parameterName);
  if (!Object.values(Source).includes(value as Source)) {
    throw new Error('Source not supported');
  }
};

export const validateParameter = (value: unknown, parameterName: string): void => {
  if (!value) {
    throw new Error(`Not valid parameter: ${parameterName}`);
  }
};

export const validateAmount = (value: BigNumber): void => {
  validateParameter(value, 'amount');
  if (value.isLessThan(0)) {
    throw new Error('Amount must be greater than zero');
  }
};

export const validateDataInitialized = (value: CurrencyStrategy | AskBid[]): void => {
  if (!value) {
    throw new Error(`Data not initialized, please use initiateData() method before.`);
  }
};
