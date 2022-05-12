import Source from "./constants";
import {sourcesConfig, currencyStrategyFactory} from "./factoryConfig";
import { AskBidExchange, CurrencySymbol } from "./ifaces";
import BaseCurrencyStrategy from "./Strategy/ifaces";
import { validateAmount, validateCurrencySymbol, validateDataInitialized } from "./validations";
import BigNumber from 'bignumber.js';


export default class Currencies {
  private strategy!: BaseCurrencyStrategy;
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

  getCurrency(): any {
    validateDataInitialized(this.strategy)
    return this.strategy.getCurrency();
  }

  private setStrategy(strategy: BaseCurrencyStrategy): void {
    this.strategy = strategy;
  }

  getExchange(
    amount: number,
    from: CurrencySymbol,
    to: CurrencySymbol
  ): AskBidExchange[] {
    const BNamount = new BigNumber(amount);
    validateAmount(BNamount);
    validateDataInitialized(this.strategy)
    validateCurrencySymbol(from, "from");
    validateCurrencySymbol(to, "to");
    return this.strategy.getExchange(BNamount, from, to);
  }

  setSource() {
    throw new Error("Not Implemented"); // TODO: create generic API ERROR class
  }

  setDate() {
    throw new Error("Not Implemented"); // TODO: create generic API ERROR class
  }
}

