import { CurrencySymbol, SourceConfigList } from './ifaces';
import DolarSiStrategy from './Strategy/DolarSiStrategy';
import { CurrencyStrategy } from './Strategy/CurrencyStrategy';
import DolarHoyStrategy from './Strategy/DolarHoyStrategy';

export enum Source {
  DOLAR_SI = 'DOLAR_SI',
  DOLAR_HOY = 'DOLAR_HOY',
}

/**
 * Add config here and also the strategy implenetation at src/Strategy folder
 */
export const sourcesConfig: SourceConfigList = {
  [Source.DOLAR_SI]: {
    label: 'Dolar Si',
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: 'https://www.dolarsi.com/api/api.php?type=valoresprincipales',
  },
  [Source.DOLAR_HOY]: {
    label: 'Dolar Hoy',
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: 'https://dolarhoy.com',
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
    case Source.DOLAR_HOY:
      return new DolarHoyStrategy();
    default:
      throw new Error('Source not valid');
  }
};
