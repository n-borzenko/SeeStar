import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { TrendingData, TrendingItem } from "types/trending";
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

const generateTrendingUrl = (type: MediaTypes, page: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/trending/${type}/week?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
    page,
  })}`;
};

const trendingFetcher = async (url: string, type: MediaTypes) => {
  const data = await defaultFetcher<TrendingData>(url);

  // add mediaType field for more convenient use
  return {
    ...data,
    results: data.results.map((item: TrendingItem) => ({
      ...item,
      mediaType: type,
    })),
  } as TrendingData;
};

const useTrendingRequest = (router: NextRouter, type: MediaTypes, page: number) => {
  const { data, error, mutate } = useSWRImmutable<TrendingData, FetchingError>(
    router.isReady ? [generateTrendingUrl(type, page), type] : null,
    trendingFetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const trendingRequestResult = useMemo(() => {
    if (error && error.status && error.status >= 400 && error.status < 500) {
      return createFailedRequestResult(`Error occured while processing request
        due to incorrect parameters`);
    }
    if (error) {
      return createFailedRequestResult("Error occured while processing request", true);
    }
    if (!data) {
      return createLoadingRequestResult();
    }
    if (data.totalResults === 0) {
      return createFailedRequestResult(`Nothing was found,
        specify requested parameters`);
    }
    return createSuccessfulRequestResult(data);
  }, [error, data]);

  return {
    retry,
    trendingRequestResult,
  };
};

export default useTrendingRequest;
