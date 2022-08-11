import { AskBid } from '../../ifaces';

/** Base to follow for each repository */
export interface CurrencyStrategy {
  /**
   * parse unknown data to the needed by the sdk
   * @param rawData raw data to parse into data structure needed to the sdk works.
   * @returns {AskBid[]}
   */
  parseCurrencyData(rawData: any): AskBid[];
}
