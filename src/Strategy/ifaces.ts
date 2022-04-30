import { AskBid, CurrencySymbol } from "../ifaces";

/** Base to follow for each repository */
interface CurrencyStrategy {
  initiateData(): Promise<void>; 
  getCurrency(): AskBid[];
  getExchange(amount: number, from: CurrencySymbol, to: CurrencySymbol): any;
}

interface Date {
  from: string,
  to: string,
}

export default CurrencyStrategy;