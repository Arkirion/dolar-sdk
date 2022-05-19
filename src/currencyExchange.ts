import { sourcesConfig, currencyStrategyFactory } from './factoryConfig';
import { AskBid, AskBidExchange, CurrencySymbol } from './ifaces';
import { CurrencyStrategy, Source } from './Strategy/ifaces';
import {
  validateAmount,
  validateCurrencySymbol,
  validateDataInitialized,
  validateSource,
} from './validations';
import BigNumber from 'bignumber.js';

/**
 * Main class to run currencie related methods.
 */
export class Currencies {
  private strategy!: CurrencyStrategy;
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;

  constructor(source: Source) {
    validateSource(source);
    const strategy = currencyStrategyFactory(source);
    this.currency1 = sourcesConfig[source].currency1;
    this.currency2 = sourcesConfig[source].currency2;
    this.setStrategy(strategy);
  }

  private setStrategy(strategy: CurrencyStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Used to initialize and update data
   */
  async initiateData(): Promise<void> {
    await this.strategy?.initiateData();
  }

  /**
   * get currency data info already parsed
   * @returns {AskBid[]}
   */
  getCurrency(): AskBid[] {
    validateDataInitialized(this.strategy);
    return this.strategy.getCurrency();
  }

  /**
   * Return exchange calculation from one currency to another.
   * @param {string} amount desired amount to calculate exchange
   * @param {CurrencySymbol} from from which currency exchange is being calculated e.g USD,ARG,etc
   * @param {CurrencySymbol} to to which currency exchange is being calculated e.g USD,ARG,etc
   * @returns {AskBidExchange[]}
   */
  getExchange(amount: string, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    if (from === to) {
      throw new Error("'from' parameter cant be the same that 'to' parameter");
    }
    const BNamount = new BigNumber(amount);
    validateAmount(BNamount);
    validateDataInitialized(this.strategy);
    validateCurrencySymbol(from, 'from');
    validateCurrencySymbol(to, 'to');
    return this.strategy.getExchange(BNamount, from, to);
  }
}
