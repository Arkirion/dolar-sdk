import BigNumber from 'bignumber.js';
import axios from 'axios';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';
import { sourcesConfig, Source } from '../factoryConfig';
import { validateDataInitialized } from '../validations';
import { buildExchange, formatValue } from '../Utils/currencyUtils';
import { CurrencyStrategy } from './CurrencyStrategy';

class DolarSiStrategy implements CurrencyStrategy {
  rawData: any;
  currencyData: AskBid[];
  source: Source;
  URL: string;

  constructor(source: Source = Source.DOLAR_SI) {
    this.source = source;
    this.URL = sourcesConfig[Source.DOLAR_SI].url;
    this.currencyData = [];
  }

  // #region inherit from CurrencyStrategy

  /** @inheritdoc */
  async initiateData(): Promise<void> {
    const { data } = await axios.get(this.URL);
    // TODO:  throw error if it fail
    this.rawData = data;
    this.currencyData = this.parseCurrencyData();
  }

  /** @inheritdoc */
  getCurrency(): AskBid[] {
    return this.currencyData;
  }

  /** @inheritdoc */
  getExchange(amount: BigNumber, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    // TODO: check if CurrencySymbol is part of sourceConfig[Source]
    validateDataInitialized(this.currencyData);

    const exchange: AskBidExchange[] = [];
    for (const currency of this.currencyData) {
      const exchangeData: AskBidExchange = buildExchange(amount, from, to, currency);
      exchange.push(exchangeData);
    }
    return exchange;
  }

  // #endregion inherit from CurrencyStrategy

  // internal parser to return formated ask and bid
  // this can change because endpoint response structure.
  private parseCurrencyData(): AskBid[] {
    return [
      {
        label: 'oficial',
        ask: formatValue(this.rawData[0].casa.venta).toFixed(),
        bid: formatValue(this.rawData[0].casa.compra).toFixed(),
      },
      {
        label: 'blue',
        ask: formatValue(this.rawData[1].casa.venta).toFixed(),
        bid: formatValue(this.rawData[1].casa.compra).toFixed(),
      },
    ];
  }
}

export default DolarSiStrategy;
