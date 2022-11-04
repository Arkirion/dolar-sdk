import { AskBid } from '../ifaces';
import { CurrencyStrategy } from './base/CurrencyStrategy';
import BigNumber from 'bignumber.js';
import getTextBetween from '../utils/getTextBetween';

class DolarHoyStrategy implements CurrencyStrategy {
  /** @inheritdoc */
  parseCurrencyData(rawData: any): AskBid[] {
    const startWrapper =
      '<div class="tile is-child only-mobile"><a class="title" href="/cotizaciondolarblue">';
    const endWrapper = '<div class="tile is-child"><a class="title" href="/cotizaciondolarbolsa">';
    const mainPoolString = getTextBetween(rawData, startWrapper, endWrapper)[0];
    const [bidBlue, askBlue, bidOfi, askOfi] = [...mainPoolString.match(/(\d+\.\d{1,2})/g)];
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
