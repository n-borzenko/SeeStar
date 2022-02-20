import camelizeData from "helpers/fetching/camelizeData";
import FetchingError from "helpers/fetching/fetchingError";

const defaultFetcher = async <T = any>(url: string) => {
  const response = await fetch(url).catch(
    () => new FetchingError(undefined, "Request fetching error")
  );
  if (response instanceof FetchingError) {
    throw response;
  }

  const result = await response
    .json()
    .catch(() => new FetchingError(response.status, "Json parsing error"));
  if (result instanceof FetchingError) {
    throw result;
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new FetchingError(response.status, "Requested data was not found");
    }
    if (response.status >= 400 && response.status < 500) {
      throw new FetchingError(response.status, "Incorrect request parameters");
    }
    if (response.status >= 500 && response.status < 600) {
      throw new FetchingError(response.status, "Server error occured");
    }
    throw new FetchingError(response.status, "Unknown error while processing request");
  }

  try {
    return camelizeData(result) as T;
  } catch (e) {
    throw new FetchingError(undefined, "Error in convertion to camel case");
  }
};

export default defaultFetcher;
