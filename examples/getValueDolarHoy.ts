import { CurrencySymbol } from '../src/index';
import { Currencies } from '../src/Currencies';
import { Source } from '../src/factoryConfig';

const main = async (): Promise<void> => {
  const currency = new Currencies(Source.DOLAR_HOY);
  await currency.initiateData();
  console.log('getCurrency', currency.getCurrency());
  console.log(
    'getExchange from USD to ARG',
    currency.getExchange('3300', CurrencySymbol.USD, CurrencySymbol.ARG)
  );
  console.log(
    'getExchange from ARG to USD',
    currency.getExchange('3300', CurrencySymbol.ARG, CurrencySymbol.USD)
  );
};

main();
