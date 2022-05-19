import BigNumber from 'bignumber.js';
import axios from 'axios';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';
import { sourcesConfig } from '../factoryConfig';
import { validateDataInitialized } from '../validations';
import { formatValue } from '../utils';
import { CurrencyStrategy, Source } from './ifaces';

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

  async initiateData(): Promise<void> {
    const { data } = await axios.get(this.URL);
    // TODO:  throw error if it fail
    this.rawData = data;
    this.currencyData = this.parseCurrencyData();
  }

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

  getCurrency(): AskBid[] {
    // TODO : validate
    return this.currencyData;
  }

  /**
   * Calculate exchange formula, it should be always with 1 and the other value the current market value
   * This method can calculate one way and the other
   * @param {BigNumber} amount the input to calculate and multiply by the desired amount
   * @param {BigNumber} from currency value
   * @param {BigNumber} to  currency value
   * @returns the total amount calculated
   */
  calculateExchange(amount: BigNumber, from: string, to: string): BigNumber {
    return new BigNumber(from).dividedBy(new BigNumber(to)).multipliedBy(amount);
  }

  /**
   *
   * @param {BigNumber} amount
   * @param {CurrencySymbol} from
   * @param {CurrencySymbol} to
   * @param {any} currencyData
   * @returns {AskBidExchange}
   */
  private buildExchange(
    amount: BigNumber,
    from: CurrencySymbol,
    to: CurrencySymbol,
    currencyData: AskBid
  ): AskBidExchange {
    // build labels
    const exchangeDirection: Pick<AskBidExchange, 'label' | 'from' | 'to'> = {
      label: currencyData.label,
      from,
      to,
    };
    let spread: Pick<AskBidExchange, 'ask' | 'bid'>;

    // build calculation
    const HOST_CURRENCY = '1';
    if (from === CurrencySymbol.USD) {
      spread = {
        ask: this.calculateExchange(amount, currencyData.ask, HOST_CURRENCY).toFixed(),
        bid: this.calculateExchange(amount, currencyData.bid, HOST_CURRENCY).toFixed(),
      };
    } else {
      spread = {
        ask: this.calculateExchange(amount, HOST_CURRENCY, currencyData.ask).toFixed(),
        bid: this.calculateExchange(amount, HOST_CURRENCY, currencyData.bid).toFixed(),
      };
    }
    return { ...exchangeDirection, ...spread };
  }

  getExchange(amount: BigNumber, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    validateDataInitialized(this.currencyData);

    const exchange: AskBidExchange[] = [];
    for (const currency of this.currencyData) {
      const exchangeData: AskBidExchange = this.buildExchange(amount, from, to, currency);
      exchange.push(exchangeData);
    }
    return exchange;
  }
}

export default DolarSiStrategy;
