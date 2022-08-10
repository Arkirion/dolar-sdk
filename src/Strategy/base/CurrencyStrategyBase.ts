import axios from 'axios';
import BigNumber from 'bignumber.js';
import { Source, sourcesConfig } from '../../factoryConfig'; // aca
import { AskBid, AskBidExchange, CurrencySymbol } from '../../ifaces';
import { buildExchange } from '../../Utils/currencyUtils';
import { validateDataInitialized } from '../../validations';
import { CurrencyStrategy } from './CurrencyStrategy';

export class CurrencyStrategyBase implements CurrencyStrategy {
  rawData: any;
  currencyData: AskBid[];
  source: Source;
  URL: string;
  label: string;

  constructor(source: Source) {
    if (!source) {
      throw new Error('Source not provided');
    }
    this.source = source;
    this.URL = sourcesConfig[source].url;
    this.label = sourcesConfig[source].label;

    this.currencyData = [];
  }

  // #region inherit from CurrencyStrategy

  /** @inheritdoc */
  async initiateData(): Promise<void> {
    try {
      const { data } = await axios.get(this.URL);
      this.rawData = data;
      this.currencyData = this.parseCurrencyData();
    } catch (error) {
      throw new Error(`'${this.label}' data not available.`);
    }
  }

  /** @inheritdoc */
  getCurrency(): AskBid[] {
    return this.currencyData;
  }

  /** @inheritdoc */
  getExchange(amount: BigNumber, from: CurrencySymbol, to: CurrencySymbol): AskBidExchange[] {
    validateDataInitialized(this.currencyData);

    const exchange: AskBidExchange[] = [];
    for (const currency of this.currencyData) {
      const exchangeData: AskBidExchange = buildExchange(amount, from, to, currency);
      exchange.push(exchangeData);
    }
    return exchange;
  }

  protected parseCurrencyData(): AskBid[] {
    throw new Error('Method not implemented');
  }
}
