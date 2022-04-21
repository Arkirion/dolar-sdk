import Source from '../src/constants';
import Currencies from '../src/currencyExchange';



const main = async () :Promise<void> =>{
  const currency = new Currencies(Source.DOLAR_SI)
  await currency.initiateData();
  const value = currency.getCurrency()
  console.log(value)
}

main();