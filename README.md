# What is dolar-sdk


# how to add new Source
To add a new source Strategy and factoryConfig must be configured and add the strategy related source at src/Strategy

# examples
lets see examples at /examples folders, install globally ts-node and do `ts-node <filename.ts>` is recomended.

























---- OLD DOCS

following 
https://khalilstemmler.com/blogs/typescript/node-starter-project/

back https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript-es


from -> to
const currencyExchange = new CurrencyExchange('USD','ARG') // TODO: add source parameter, its low priority // TODO, add 'formatLocale' which allow to determiate . or , 

currencyExchange.getValue(amount) // returns { value: '1', blue , date: '1/1/2020'}

currencyExchange.getValue(amount, 'date') // returns { value, blue,  date: '2/1/2020'}
currencyExchange.getValues('dateFrom', 'dateTo') // returns [{ value, blue , date: '2/1/2020'}, { value, blue,  date: '3/1/2020'}]

// HOW TO ADD NEW STRATEGY STEPS

how to run examples

npx ts-node getValue.ts 




(4 USD) * 200 ARG       / 1 USD
Input  *  Currency[from] / Currency[to] 
currencyExchange('USD','ARG')

= si tengo 4 dolares, son *800* pesos


(340 ARG) *        1 USD  / 200 ARG
Input  *  Currency[from] / Currency[to] 
currencyExchange('ARG','USD')

=  si tengo 340 pesos, son 1.70 dolares.



https://app.diagrams.net/#G1rGri5xXJTuClG9OsBRm1JSuMd5XFPt37