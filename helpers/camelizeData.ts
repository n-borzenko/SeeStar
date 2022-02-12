type JsonObject = { [key: string]: any };

const camelizeData = (data: any): any => {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const processItem = (item: JsonObject) =>
    Object.keys(item).reduce(
      (result, key) => ({
        ...result,
        [key.replace(/_[a-z]/g, (word) => word[1].toUpperCase())]:
          typeof item[key] === "object" ? camelizeData(item[key]) : item[key],
      }),
      {}
    );

  return Array.isArray(data) ? data.map((item) => camelizeData(item)) : processItem(data);
};

export default camelizeData;
