// id - number greater than 0
export const parseId = (id?: string | string[]) => {
  if (!id) {
    return null;
  }
  const parsedId = parseInt(typeof id === "string" ? id : id[0], 10);
  return isNaN(parsedId) || parsedId < 1 || parsedId > Number.MAX_SAFE_INTEGER ? null : parsedId;
};

// value - number greater or equal to 0
export const parseNumber = (value?: string | string[]) => {
  if (!value) {
    return null;
  }
  const parsedNumber = parseInt(typeof value === "string" ? value : value[0], 10);
  return isNaN(parsedNumber) || parsedNumber < 0 || parsedNumber > Number.MAX_SAFE_INTEGER
    ? null
    : parsedNumber;
};
