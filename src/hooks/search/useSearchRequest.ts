import type FetchingError from "helpers/fetching/fetchingError";
import type { SearchItem, SearchData } from "types/search";
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

const generateSearchUrl = (text: string, mediaType: MediaTypes, page: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/search/${mediaType}?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
    query: text,
    page,
  })}`;
};

const searchFetcher = async (url: string, mediaType: MediaTypes) => {
  const data = await defaultFetcher<SearchData>(url);
  if (mediaType === MediaTypes.Any) {
    return data;
  }

  // the mediaType field is only provided by API in case of multitype request
  // for consistency it's more convenient to have it in all cases
  return {
    ...data,
    results: data.results.map((item: SearchItem) => ({
      ...item,
      mediaType,
    })),
  } as SearchData;
};

const useSearchRequest = (
  isRouterReady: boolean,
  text: string,
  mediaType: MediaTypes,
  page: number
) => {
  const { data, error, mutate } = useSWRImmutable<SearchData, FetchingError>(
    isRouterReady && text.length > 0 ? [generateSearchUrl(text, mediaType, page), mediaType] : null,
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
    if (text.length === 0) {
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
  }, [error, text, data]);

  return {
    searchResults,
    retry,
  };
};

export default useSearchRequest;
