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

export interface SourceConfig {
  label: string;
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  url: string;
}

export type SourceConfigList<V = SourceConfig> = { [key: string]: V };
