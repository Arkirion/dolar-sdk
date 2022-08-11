import { AskBid } from '../ifaces';
import { formatValue } from '../utils/currencyUtils';
import { CurrencyStrategy } from './base/CurrencyStrategy';

class DolarSiStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any): AskBid[] {
    return [
      {
        label: 'oficial',
        ask: formatValue(rawData[0].casa.venta).toFixed(),
        bid: formatValue(rawData[0].casa.compra).toFixed(),
      },
      {
        label: 'blue',
        ask: formatValue(rawData[1].casa.venta).toFixed(),
        bid: formatValue(rawData[1].casa.compra).toFixed(),
      },
    ];
  }
}

export default DolarSiStrategy;
