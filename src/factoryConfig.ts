import { CurrencySymbol, SourceConfigList } from './ifaces';
import DolarSiStrategy from './Strategy/DolarSiStrategy';
import { CurrencyStrategy, Source } from './Strategy/ifaces';

/**
 * Add config here and also the strategy implenetation at src/Strategy folder
 */
export const sourcesConfig: SourceConfigList = {
  [Source.DOLAR_SI]: {
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
  },
};

/**
 * Determinate which strategy to use using source as reference.
 * @param {Source} source determinate which API will fetch data.
 * @returns {CurrencyStrategy}
 */
export const currencyStrategyFactory = (source: Source): CurrencyStrategy => {
  switch (source) {
    case Source.DOLAR_SI:
      return new DolarSiStrategy();
    default:
      throw new Error('Source not valid');
  }
};
