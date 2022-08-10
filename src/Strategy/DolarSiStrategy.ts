import { AskBid } from '../ifaces';
import { Source } from '../factoryConfig';
import { formatValue } from '../Utils/currencyUtils';
import { CurrencyStrategyBase } from './base/CurrencyStrategyBase';

class DolarSiStrategy extends CurrencyStrategyBase {
  constructor() {
    super(Source.DOLAR_SI);
  }

  // internal parser to return formated ask and bid
  // this can change because endpoint response structure.
  protected parseCurrencyData(): AskBid[] {
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
