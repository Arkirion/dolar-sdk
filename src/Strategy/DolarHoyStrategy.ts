import BigNumber from 'bignumber.js';
import axios from 'axios';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';
import { sourcesConfig, Source } from '../factoryConfig';
import { validateDataInitialized } from '../validations';
import { buildExchange, formatValue } from '../Utils/currencyUtils';
import { CurrencyStrategy } from './CurrencyStrategy';
import HTMLParser from '../Utils/scrapingUtils';

class DolarHoyStrategy implements CurrencyStrategy {
  rawData: any;
  currencyData: AskBid[];
  source: Source;
  URL: string;

  constructor(source: Source = Source.DOLAR_HOY) {
    this.source = source;
    this.URL = sourcesConfig[Source.DOLAR_HOY].url;
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
    const document = new HTMLParser(this.rawData);

    const selectors = {
      oficial_bid:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div.tile.is-child.only-desktop > div > div.compra > div.val',
      oficial_ask:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div.tile.is-child.only-desktop > div > div.venta > div.val',
      blue_bid:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-5 > div > div.values > div.compra > div.val',
      blue_ask:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-5 > div > div.values > div.venta > div.val',
    };

    return [
      {
        label: 'oficial',
        ask: formatValue(document.findText(selectors.oficial_ask)).toFixed(),
        bid: formatValue(document.findText(selectors.oficial_bid)).toFixed(),
      },
      {
        label: 'blue',
        ask: formatValue(document.findText(selectors.blue_ask)).toFixed(),
        bid: formatValue(document.findText(selectors.blue_bid)).toFixed(),
      },
    ];
  }
}

export default DolarHoyStrategy;
