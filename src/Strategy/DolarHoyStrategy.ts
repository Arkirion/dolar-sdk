import { AskBid } from '../ifaces';
import { formatValue } from '../utils/currencyUtils';
import { CurrencyStrategy } from './base/CurrencyStrategy';
import HTMLParser from '../utils/scrapingUtils';

class DolarHoyStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any): AskBid[] {
    const document = new HTMLParser(rawData);

    const selectors = {
      oficial_bid:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div:nth-child(2) > div > div.compra > div.val',
      oficial_ask:
        '#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div:nth-child(2) > div > div.venta > div.val',
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
