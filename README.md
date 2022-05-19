# What is dolar-sdk
Is a wrapper of APIs to get currency and the exchange between two of them.

# How to use
1. Instance source API to determinate where data come from.
   ```typescript
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
   which internally call endpoint and save data to be used.
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
  currency.getExchange('300', CurrencySymbol.USD, CurrencySymbol.ARG)
  ```
  response:
  ```json
  [
    {label: 'oficial', from: 'USD', to: 'ARG', ask: '37017', bid: '35217'},
    {label: 'blue', from: 'USD', to: 'ARG', ask: '62250', bid: '61350' }
  ]
  ```


# how to add new Source
To add a new source Strategy and factoryConfig must be configured and add the strategy related source at src/Strategy

# examples
lets see examples at [examples](/examples) folders, install globally ts-node and do `ts-node <filename.ts>` is recomended.


<!--- https://app.diagrams.net/#G1rGri5xXJTuClG9OsBRm1JSuMd5XFPt37 -->