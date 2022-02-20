import type FetchingError from "helpers/fetching/fetchingError";
import type { SearchItem, SearchParameters, SearchData } from "types/search";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import defaultFetcher from "helpers/fetching/defaultFetcher";
import { MediaTypes } from "types/mediaTypes";

const generateSearchUrl = ({ text, type, page }: SearchParameters) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/search/${type}?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
    query: text,
    page,
  })}`;
};

const searchFetcher = async (url: string, type: MediaTypes) => {
  const data = await defaultFetcher<SearchData>(url);
  if (type === MediaTypes.Any) {
    return data;
  }

  // the mediaType field is only provided by API in case of multitype request
  // for consistency it's more convenient to have it in all cases
  return {
    ...data,
    results: data.results.map((item: SearchItem) => ({
      ...item,
      mediaType: type,
    })),
  } as SearchData;
};

const useSearchRequest = (isRouterReady: boolean, parameters: SearchParameters) => {
  const { data, error, mutate } = useSWRImmutable<SearchData, FetchingError>(
    isRouterReady && parameters.text.length > 0
      ? [generateSearchUrl(parameters), parameters.type]
      : null,
    searchFetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const searchResults = useMemo(() => {
    if (error && error.status && error.status >= 400 && error.status < 500) {
      return createFailedRequestResult(`${error.message},
        change requested parameters`);
    }
    if (error) {
      return createFailedRequestResult(
        `Error occured while processing request,
        change requested parameters or`,
        true
      );
    }
    if (parameters.text.length === 0) {
      return createFailedRequestResult(`Current query is empty,
        type your request and press search button`);
    }
    if (!data) {
      return createLoadingRequestResult();
    }
    if (data.totalResults === 0) {
      return createFailedRequestResult(`Nothing was found,
        specify requested parameters`);
    }
    return createSuccessfulRequestResult(data);
  }, [error, parameters.text, data]);

  return {
    searchResults,
    retry,
  };
};

export default useSearchRequest;
