import { AskBid } from '../ifaces';
import { CurrencyStrategy } from './base/CurrencyStrategy';
import BigNumber from 'bignumber.js';

class DolarHoyStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any[]): AskBid[] {
    const data = rawData[0].data;
    // TODO: Fix api
    const ofiPosition = data[0].label === 'oficial' ? 0 : 1;
    const bluePosition = data[0].label === 'blue' ? 0 : 1;

    return [
      {
        label: 'oficial',
        ask: new BigNumber(data[ofiPosition].ask).toFixed(),
        bid: new BigNumber(data[ofiPosition].bid).toFixed(),
      },
      {
        label: 'blue',
        ask: new BigNumber(data[bluePosition].ask).toFixed(),
        bid: new BigNumber(data[bluePosition].bid).toFixed(),
      },
    ];
  }
}

export default DolarHoyStrategy;
