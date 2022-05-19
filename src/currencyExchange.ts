import { sourcesConfig, currencyStrategyFactory } from './factoryConfig';
import { AskBid, AskBidExchange, CurrencySymbol } from './ifaces';
import { CurrencyStrategy, Source } from './Strategy/ifaces';
import { validateAmount, validateCurrencySymbol, validateDataInitialized } from './validations';
import BigNumber from 'bignumber.js';

export class Currencies {
  private strategy!: CurrencyStrategy;
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  data: any;

  constructor(source: Source) {
    // TODO: add validations
    const strategy = currencyStrategyFactory(source);
    this.currency1 = sourcesConfig[source].currency1;
    this.currency2 = sourcesConfig[source].currency2;
    this.setStrategy(strategy);
  }

  /**
   * Used to initialize and update data
   * TODO: optional : { date: from, to, source? }
   */
  async initiateData(): Promise<void> {
    await this.strategy?.initiateData();
  }

  getCurrency(): AskBid[] {
    validateDataInitialized(this.strategy);
    return this.strategy.getCurrency();
  }

  private setStrategy(strategy: CurrencyStrategy): void {
    this.strategy = strategy;
  }

  getExchange(amount: number, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    const BNamount = new BigNumber(amount);
    validateAmount(BNamount);
    validateDataInitialized(this.strategy);
    validateCurrencySymbol(from, 'from');
    validateCurrencySymbol(to, 'to');
    return this.strategy.getExchange(BNamount, from, to);
  }

  setDate(): void {
    throw new Error('Not Implemented'); // TODO: create generic API ERROR class
  }
}
