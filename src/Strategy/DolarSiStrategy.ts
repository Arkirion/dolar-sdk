import { AskBid } from '../ifaces';
import { formatValue } from '../utils/currencyUtils';
import { CurrencyStrategy } from './base/CurrencyStrategy';

class DolarSiStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any): AskBid[] {
    const data = rawData[0].data;
    return [
      {
        label: 'oficial',
        ask: formatValue(data[0].casa.venta).toFixed(),
        bid: formatValue(data[0].casa.compra).toFixed(),
      },
      {
        label: 'blue',
        ask: formatValue(data[1].casa.venta).toFixed(),
        bid: formatValue(data[1].casa.compra).toFixed(),
      },
    ];
  }
}

export default DolarSiStrategy;
