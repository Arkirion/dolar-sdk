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

export interface CurrencyConverted extends exchangeDirection {
  values: AskBid[]; // TODO: maybe a BIGNUMBER?
  date: string;
}

export interface SourceConfig {
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  url: string;
}

export type SourceConfigList<V = SourceConfig> = { [key: string]: V };
