import axios from 'axios';
import BigNumber from 'bignumber.js';
import { currencyStrategyFactory, Source, sourcesConfig } from './factoryConfig'; // aca
import { AskBid, AskBidExchange, CurrencySymbol, CurrencyBase } from './ifaces';
import { buildExchange } from './utils/currencyUtils';
import {
  validateAmount,
  validateCurrencySymbol,
  validateDataInitialized,
  validateSource,
} from './validations';
import { CurrencyStrategy } from './Strategy/base/CurrencyStrategy';

export class Currencies implements CurrencyBase {
  private strategy!: CurrencyStrategy;
  rawData: any;
  currencyData: AskBid[];
  source: Source;
  URL: string;
  label: string;

  constructor(source: Source) {
    validateSource(source);
    this.setSource(source);
    this.buildData();
  }

  /**
   * This is private because use cases could be confuse the user if you
   * change source but data still old, however strategy pattern allow runtime changes
   * You must use initiateData instead in order to change source and update data.
   */
  private setSource(source: Source): void {
    this.source = source;
    const strategy = currencyStrategyFactory(source);
    this.setStrategy(strategy);
  }

  private buildData(): void {
    this.URL = sourcesConfig[this.source].url;
    this.label = sourcesConfig[this.source].label;
    this.currencyData = [];
  }

  private setStrategy(strategy: CurrencyStrategy): void {
    this.strategy = strategy;
  }

  // #region inherit from CurrencyStrategy

  /** @inheritdoc */
  async initiateData(source?: Source): Promise<void> {
    if (source && source !== this.source) {
      validateSource(source);
      this.setSource(source);
      this.buildData();
    }

    try {
      const { data } = await axios.get(this.URL);
      this.rawData = data;
      this.currencyData = this.parseCurrencyData(this.rawData);
    } catch (error) {
      throw new Error(`'${this.label}' data not available.`);
    }
  }

  /** @inheritdoc */
  getCurrency(): AskBid[] {
    validateDataInitialized(this.currencyData);
    return this.currencyData;
  }

  /** @inheritdoc */
  getExchange(amount: string, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    if (from === to) {
      throw new Error("'from' parameter cant be the same that 'to' parameter");
    }
    const BNamount = new BigNumber(amount);
    validateAmount(BNamount);
    validateCurrencySymbol(from, 'from');
    validateCurrencySymbol(to, 'to');
    validateDataInitialized(this.currencyData);

    const exchange: AskBidExchange[] = [];
    for (const currency of this.currencyData) {
      const exchangeData: AskBidExchange = buildExchange(BNamount, from, to, currency);
      exchange.push(exchangeData);
    }
    return exchange;
  }

  /** @inheritdoc */
  private parseCurrencyData(rawData: any): AskBid[] {
    return this.strategy?.parseCurrencyData(rawData);
  }
}
