import BigNumber from 'bignumber.js';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';

/** Base to follow for each repository */
export interface CurrencyStrategy {
  initiateData(): Promise<void>;
  getCurrency(): AskBid[];
  getExchange(amount: BigNumber, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[];
}

export enum Source {
  DOLAR_SI = 'DOLAR_SI',
}
