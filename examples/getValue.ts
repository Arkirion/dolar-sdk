import { CurrencySymbol } from '../src';
import Source from '../src/constants';
import Currencies from '../src/currencyExchange';

const main = async (): Promise<void> => {
  const currency = new Currencies(Source.DOLAR_SI);
  await currency.initiateData();
  console.log('getCurrency', currency.getCurrency());
  console.log(
    'getExchange from USD to ARG',
    currency.getExchange(300, CurrencySymbol.USD, CurrencySymbol.ARG)
  );
  console.log(
    'getExchange from ARG to USD',
    currency.getExchange(300, CurrencySymbol.ARG, CurrencySymbol.USD)
  );
};

main();
