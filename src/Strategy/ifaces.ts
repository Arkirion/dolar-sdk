import BigNumber from 'bignumber.js';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';

/** Base to follow for each repository */
interface CurrencyStrategy {
  initiateData(): Promise<void>;
  getCurrency(): AskBid[];
  getExchange(amount: BigNumber, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[];
}

export default CurrencyStrategy;
