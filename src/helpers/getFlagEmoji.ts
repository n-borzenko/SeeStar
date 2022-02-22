const flagOffset = 0x1f1e6;
const asciiOffset = 0x41;

const getFlagEmoji = (country?: string) => {
  if (!country || country.length !== 2) {
    return undefined;
  }

  const symbol1 = country.charCodeAt(0) - asciiOffset + flagOffset;
  const symbol2 = country.charCodeAt(1) - asciiOffset + flagOffset;
  return String.fromCodePoint(symbol1, symbol2);
};

export default getFlagEmoji;
