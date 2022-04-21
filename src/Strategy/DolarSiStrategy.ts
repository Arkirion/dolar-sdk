import Source from "../constants";
import { AskBid } from "../ifaces";
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
    // TODO:  throw error if it fails
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
}

export default DolarSiStrategy;
