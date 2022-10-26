import { Source } from './factoryConfig';

export enum CurrencySymbol {
  USD = 'USD',
  ARG = 'ARG',
}

export interface AskBid {
  [values: string]: string;
  label: string;
  ask: string;
  bid: string;
}

export interface AskBidExchange extends AskBid, exchangeDirection {}

export interface exchangeDirection {
  from: CurrencySymbol;
  to: CurrencySymbol;
}

// Iface on getExchange() in order to match args e.g { amount, from, to } as input.
export interface exchangeInputs extends exchangeDirection {
  amount: string;
}

export interface SourceConfig {
  label: string;
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  url: string;
}

export type SourceConfigList<V = SourceConfig> = { [key: string]: V };

export interface CurrencyBase {
  /**
   * After instance Currency class you must initiateData() since
   * is responsability of the user when to update data since usually is
   * not necesary to keep dolar market data updated too much
   * @param source optional parameter in case you want to change source on runtime
   */
  initiateData(source?: Source): Promise<void>;
  getCurrency(): AskBid[];
  getExchange({ amount, from, to }: exchangeInputs): AskBidExchange[];
}
