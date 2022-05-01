import { CurrencySymbol, SourceConfigList } from "./ifaces";

const sourcesConfig : SourceConfigList = {
  DOLAR_SI: {
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
  },
};

export default sourcesConfig;