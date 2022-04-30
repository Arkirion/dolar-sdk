import Source from "./constants";
import sourcesConfig from "./factoryConfig";
import { CurrencySymbol} from "./ifaces";
import DolarSiStrategy from "./Strategy/DolarSiStrategy";
import BaseCurrencyStrategy from "./Strategy/ifaces";

const currencyStrategyFactory = (source: Source) : any =>  {
  switch (source) {
    case Source.DOLAR_SI:
      return new DolarSiStrategy;
    default:
      throw new Error("Source not valid");
  }
};

export default class Currencies {
  private strategy!: BaseCurrencyStrategy
  currency1: CurrencySymbol;
  currency2: CurrencySymbol;
  data: any;

  constructor(
    source: Source
  ) {
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

  getCurrency(): any{
    if(!this.strategy){
      throw new Error("Data not initialized, please use initiateData() method.");
    }
    return this.strategy.getCurrency();
  }

  setStrategy(strategy: BaseCurrencyStrategy): void {
    this.strategy = strategy;
  }

  getExchange(amount:number, from: CurrencySymbol, to: CurrencySymbol): any {
    // TODO : implement validation from & to
    if(!this.strategy){
      throw new Error("Data not initialized, please use initiateData() method.");
    }
    this.strategy.getExchange(amount, from, to);
  }

  setSource() {
    throw new Error("Not Implemented"); // TODO: create generic API ERROR class
  }

  setDate() {
    throw new Error("Not Implemented"); // TODO: create generic API ERROR class
  }
}
