import Source from "../constants";
import { AskBid, CurrencySymbol } from "../ifaces";
import axios from "axios";
import CurrencyStrategy from "./ifaces";
import sourcesConfig from "../factoryConfig";

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

  // (4 USD) *        200 ARG  / 1 USD
  // Input  *  Currency[from] / Currency[to]
  // currencyExchange('USD','ARG')

  // = si tengo 4 dolares, son *800* pesos

  // (340 ARG) *        1 USD  / 200 ARG
  // Input  *  Currency[from] / Currency[to]
  // currencyExchange('ARG','USD')

  calculateExchange(amount: number, from: string, to: string, ) :number{
    return amount * (parseInt(from) / parseInt(to) ); // TODO: use bigNumber instead
  }
  // agregué el código asd

  getExchange( amount: number, from: CurrencySymbol, to: CurrencySymbol,): any {
    // TODO: validate this.currencyData
    if (!this.currencyData) {
      throw new Error(
        "Data not initialized, please use initiateData() method."
      );
    }

    // 
    for (const currency of this.currencyData) {
      let currencyData = {
        type: currency.label,
        from,
        to,
      }
      if (from === CurrencySymbol.USD) {
        let spread = {
          ask: this.calculateExchange(amount, currency.bid, '1'),
          bid: this.calculateExchange(amount, currency.ask, '1'),
        }
        currencyData = {...currencyData, ...spread }
      } else {
        let spread = {
          ask: this.calculateExchange(amount, '1', currency.ask),
          bid: this.calculateExchange(amount, '1', currency.bid),
        }
        currencyData = {...currencyData, ...spread }
      }
    }
  }
}

export default DolarSiStrategy;
