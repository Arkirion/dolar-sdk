import { CurrencySymbol, SourceConfigList } from "./ifaces";

const sourcesConfig : SourceConfigList = {
  // change to get keyvalues from this object and then type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';?
  DOLAR_SI: {
    currency1: CurrencySymbol.USD,
    currency2: CurrencySymbol.ARG,
    url: "https://www.dolarsi.com/api/api.php?type=valoresprincipales",
  },
};

export default sourcesConfig;