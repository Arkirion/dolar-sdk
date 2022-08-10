import BigNumber from 'bignumber.js';
import { AskBid, AskBidExchange, CurrencySymbol } from './ifaces';
import {
  validateAmount,
  validateCurrencySymbol,
  validateDataInitialized,
  validateSource,
} from './validations';
import { currencyStrategyFactory, Source } from './factoryConfig';
import { CurrencyStrategy } from './Strategy/base/CurrencyStrategy';

/**
 * Main class to run currencie related methods.
 */
export class Currencies {
  private strategy!: CurrencyStrategy;

  constructor(source: Source) {
    validateSource(source);
    const strategy = currencyStrategyFactory(source);
    this.setStrategy(strategy);
  }

  private setStrategy(strategy: CurrencyStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Initialize and fetch data, use it everytime you want to get updated currencies.
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
