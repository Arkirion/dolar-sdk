import BigNumber from 'bignumber.js';
import { AskBid, AskBidExchange, CurrencySymbol } from '../ifaces';

export function formatValue(stringValue: string): BigNumber {
  stringValue = stringValue.trim();
  let result = stringValue.replace(/[^0-9]/g, '');
  if (/[,\.]\d{2}$/.test(stringValue)) {
    result = result.replace(/(\d{2})$/, '.$1');
  }
  return new BigNumber(result);
}

export function getTextBetween(
  text: string,
  startReference: string,
  endReference: string
): RegExpMatchArray {
  return text.match(`${startReference}(.*)${endReference}`);
}

/**
 * Calculate exchange formula, it should be always with 1 and the other value the current market value
 * method can calculate one way and the other
 * @param {BigNumber} amount the input to calculate and multiply by the desired amount
 * @param {BigNumber} from currency value
 * @param {BigNumber} to  currency value
 * @returns the total amount calculated
 */
export function calculateExchange(amount: BigNumber, from: string, to: string): BigNumber {
  return new BigNumber(from).dividedBy(new BigNumber(to)).multipliedBy(amount);
}

/**
 * build exchange. for now its only dolar based
 * @param {BigNumber} amount how much to exchange
 * @param {CurrencySymbol} from
 * @param {CurrencySymbol} to
 * @param {AskBid} currencyData data already formated to be used and calculate exchange
 * @returns {AskBidExchange} exchange data.
 */
export function buildExchange(
  amount: BigNumber,
  from: CurrencySymbol,
  to: CurrencySymbol,
  currencyData: AskBid
): AskBidExchange {
  // build labels
  const exchangeDirection: Pick<AskBidExchange, 'label' | 'from' | 'to'> = {
    label: currencyData.label,
    from,
    to,
  };
  let spread: Pick<AskBidExchange, 'ask' | 'bid'>;

  // build calculation
  const HOST_CURRENCY = '1';
  if (from === CurrencySymbol.USD) {
    spread = {
      ask: calculateExchange(amount, currencyData.ask, HOST_CURRENCY).toFixed(),
      bid: calculateExchange(amount, currencyData.bid, HOST_CURRENCY).toFixed(),
    };
  } else {
    spread = {
      ask: calculateExchange(amount, HOST_CURRENCY, currencyData.ask).toFixed(),
      bid: calculateExchange(amount, HOST_CURRENCY, currencyData.bid).toFixed(),
    };
  }
  return { ...exchangeDirection, ...spread };
}
