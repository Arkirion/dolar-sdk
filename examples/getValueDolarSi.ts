import { CurrencySymbol } from '../src/index';
import { Currencies } from '../src/Currencies';
import { Source } from '../src/factoryConfig';

const main = async (): Promise<void> => {
  const currency = new Currencies(Source.DOLAR_SI);
  await currency.initiateData();
  console.table(currency.getCurrency());
  console.log('USD -> ARG');
  console.table(currency.getExchange('3300', CurrencySymbol.USD, CurrencySymbol.ARG));
  console.log('ARG -> USD');
  console.table(currency.getExchange('3300', CurrencySymbol.ARG, CurrencySymbol.USD));
};

main();
