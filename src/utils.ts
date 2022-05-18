import BigNumber from 'bignumber.js';

export function formatValue(stringValue: string): BigNumber {
  stringValue = stringValue.trim();
  let result = stringValue.replace(/[^0-9]/g, '');
  if (/[,\.]\d{2}$/.test(stringValue)) {
    result = result.replace(/(\d{2})$/, '.$1');
  }
  return new BigNumber(result);
}
