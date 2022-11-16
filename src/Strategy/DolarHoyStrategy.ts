import { AskBid } from '../ifaces';
import { CurrencyStrategy } from './base/CurrencyStrategy';
import BigNumber from 'bignumber.js';

class DolarHoyStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any[]): AskBid[] {
    let bidBlue, askBlue, bidOfi, askOfi;
    for (const data of rawData) {
      const stringHTML = data.data.slice(52000);
      if (stringHTML.indexOf('Blue') > 0) {
        [bidBlue, askBlue] = [...stringHTML.match(/(\d+\.\d{1,2})/g)];
      } else {
        [bidOfi, askOfi] = [...stringHTML.match(/(\d+\.\d{1,2})/g)];
      }
    }

    return [
      {
        label: 'oficial',
        ask: new BigNumber(askOfi).toFixed(),
        bid: new BigNumber(bidOfi).toFixed(),
      },
      {
        label: 'blue',
        ask: new BigNumber(askBlue).toFixed(),
        bid: new BigNumber(bidBlue).toFixed(),
      },
    ];
  }
}

export default DolarHoyStrategy;
