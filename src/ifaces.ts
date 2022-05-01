export enum CurrencySymbol {
  USD = "USD",
  ARG = "ARG",
}

export interface AskBid {
  [values: string]: string;
  label: string;
  ask: string;
  bid: string;
}

export interface CurrencyConverted {
  values: AskBid[]; // TODO: maybe a BIGNUMBER?
  from: CurrencySymbol;
  to: CurrencySymbol;
  date: string;
}

export interface SourceConfig {
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  url: string; // TODO: add pattern regex
}

export type SourceConfigList<V = SourceConfig> = { [key:string] : V}