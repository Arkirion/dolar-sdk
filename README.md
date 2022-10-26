# What is dolar-sdk
Is a wrapper of APIs to get currency and the exchange between two of them.

# How to use
1. Instance source API to determinate where data come from.
   ```typescript
    import { Currencies, Source } from 'dolar-exchange-sdk';
    const currency = new Currencies(Source.DOLAR_SI);
   ```
   Note : Source enum has available sources, current list is:
    * DOLAR_SI
\
&nbsp;

2. initializing data is needed.
    ```typescript
      await currency.initiateData();
    ```
   It will internally request for info and save data to be used, if you want to update
   the data then call this method whenever you need it.
\
&nbsp;

- You can get Raw data parsed
  ```typescript
  currency.getCurrency()
  ```
  response:
  ```json
  [
    { label: 'oficial', ask: '123.39', bid: '117.39' },
    { label: 'blue', ask: '207.5', bid: '204.5' }
  ]
  ```
- You can get exchange between two currencies.
  amount, from and to parameters
  ```typescript
  currency.getExchange({ amount : '300', from: CurrencySymbol.USD, to: CurrencySymbol.ARG })
  ```
  response:
  ```json
  [
    {label: 'oficial', from: 'USD', to: 'ARG', ask: '37017', bid: '35217'},
    {label: 'blue', from: 'USD', to: 'ARG', ask: '62250', bid: '61350' }
  ]
  ```


# How to add new Source
1. Add configuration at factoryConfig.ts
2. Add Strategy on /Strategy Folder, adding parseCurrencyData() is needed, use other strategies as reference.

# examples
See examples at [examples](https://github.com/vismael/dolar-sdk/blob/master/examples/getDolarValue.ts) folders, installing globally ts-node and do `ts-node <filename.ts>` is recomended.
