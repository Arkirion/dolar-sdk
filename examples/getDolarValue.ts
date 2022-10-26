import { CurrencySymbol } from '../src/index';
import { Currencies } from '../src/Currencies';
import { Source } from '../src/factoryConfig';

const main = async (): Promise<void> => {
  const currency = new Currencies(Source.DOLAR_SI);
  const amount = '3300';
  const usd = CurrencySymbol.USD;
  const arg = CurrencySymbol.ARG;
  await currency.initiateData();
  console.table(currency.getCurrency());
  console.log('USD -> ARG');
  console.table(currency.getExchange({ amount, from: usd, to: arg }));
  console.log('ARG -> USD');
  console.table(currency.getExchange({ amount, from: arg, to: usd }));

  await currency.initiateData(Source.DOLAR_HOY);
  console.table(currency.getCurrency());
  console.log('USD -> ARG');
  console.table(currency.getExchange({ amount, from: usd, to: arg }));
  console.log('ARG -> USD');
  console.table(currency.getExchange({ amount, from: arg, to: usd }));
};

main();
