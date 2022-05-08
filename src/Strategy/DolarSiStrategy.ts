import Source from "../constants";
import { AskBid, AskBidExchange, CurrencySymbol } from "../ifaces";
import axios from "axios";
import CurrencyStrategy from "./ifaces";
import {sourcesConfig} from "../factoryConfig";
import { validateStrategy } from "../validations";

class DolarSiStrategy implements CurrencyStrategy {
  rawData: any;
  currencyData: any;
  source: Source;
  URL: string;

  constructor(source: Source = Source.DOLAR_SI) {
    this.source = source;
    this.URL = sourcesConfig[Source.DOLAR_SI].url;
  }

  async initiateData(): Promise<void> {
    const { data } = await axios.get(this.URL);
    // TODO:  throw error if it fail
    this.rawData = data;
    this.currencyData = this.parseCurrencyData();
  }

  private parseCurrencyData(): AskBid[] {
    return [
      {
        label: "oficial",
        ask: this.rawData[0].casa.venta,
        bid: this.rawData[0].casa.compra,
      },
      {
        label: "blue",
        ask: this.rawData[1].casa.venta,
        bid: this.rawData[1].casa.compra,
      },
    ];
  }

  getCurrency(): AskBid[] {
    // TODO : validate
    return this.currencyData;
  }

  calculateExchange(amount: number, from: string, to: string): number {
    return amount * (parseInt(from) / parseInt(to)); // TODO: use bigNumber instead
  }

  /**
   * 
   * @param {number} amount 
   * @param {CurrencySymbol} from 
   * @param {CurrencySymbol} to 
   * @param {any} currencyData 
   * @returns {AskBidExchange}
   */
  private buildExchange(
    amount: number,
    from: CurrencySymbol,
    to: CurrencySymbol,
    currencyData: any,
  ): AskBidExchange {
      let exchangeDirection : Pick<AskBidExchange, "label" | "from" | "to"> = {
        label: currencyData.label,
        from,
        to,
      };
      let spread: Pick<AskBidExchange, "ask" | "bid">;

      if (from === CurrencySymbol.USD) {
        spread = {
          ask: this.calculateExchange(amount, currencyData.bid, "1").toString(),
          bid: this.calculateExchange(amount, currencyData.ask, "1").toString(),
        };
      } else {
        spread = {
          ask: this.calculateExchange(amount, "1", currencyData.ask).toString(),
          bid: this.calculateExchange(amount, "1", currencyData.bid).toString(),
        };
      }
    return { ...exchangeDirection, ...spread };
  }

  getExchange(
    amount: number,
    from: CurrencySymbol,
    to: CurrencySymbol
  ): AskBidExchange[] {
    validateStrategy(this.currencyData)
    
    let exchange: AskBidExchange[] = [];
    for (const currency of this.currencyData) {
      const exchangeData: AskBidExchange = this.buildExchange(amount, from, to, currency)
      exchange.push(exchangeData);
    }
    return exchange;
  }
}

export default DolarSiStrategy;
