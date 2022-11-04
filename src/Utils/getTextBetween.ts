function getTextBetween(
  text: string,
  startReference: string,
  endReference: string
): RegExpMatchArray {
  return text.match(`${startReference}(.*)${endReference}`);
}

export default getTextBetween;
