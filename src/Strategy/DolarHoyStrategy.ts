import { AskBid } from '../ifaces';
import { Source } from '../factoryConfig';
import { formatValue } from '../Utils/currencyUtils';
import { CurrencyStrategyBase } from './base/CurrencyStrategyBase';
import HTMLParser from '../Utils/scrapingUtils';

class DolarHoyStrategy extends CurrencyStrategyBase {
  constructor() {
    super(Source.DOLAR_HOY);
  }

  // internal parser to return formated ask and bid
  // this can change because endpoint response structure.
  /** @overrided */
  protected parseCurrencyData(): AskBid[] {
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
