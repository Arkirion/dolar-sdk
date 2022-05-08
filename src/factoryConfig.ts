import Source from "./constants";
import { CurrencySymbol, SourceConfigList } from "./ifaces";
import DolarSiStrategy from "./Strategy/DolarSiStrategy";

/**
 * Add config here and also the strategy implenetation at src/Strategy folder
 */

export const sourcesConfig : SourceConfigList = {
  [Source.DOLAR_SI]: {
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
  },
};

export const currencyStrategyFactory = (source: Source): any => {
  switch (source) {
    case Source.DOLAR_SI:
      return new DolarSiStrategy();
    default:
      throw new Error("Source not valid");
  }
};
