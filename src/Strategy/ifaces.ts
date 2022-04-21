import { AskBid } from "../ifaces";

/** Base to follow for each repository */
interface CurrencyStrategy {
  initiateData(): Promise<void>; 
  getCurrency(): AskBid[];
}

interface Date {
  from: string,
  to: string,
}

export default CurrencyStrategy;