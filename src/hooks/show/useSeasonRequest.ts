import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { ShowSeasonExtended } from "types/show/season";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId, parseNumber } from "helpers/fetching/parseParams";

const generateSeasonUrl = (showId: number, seasonNumber: number) => {
  return `${
    process.env.NEXT_PUBLIC_TMBD_API_V3_URL
  }/tv/${showId}/season/${seasonNumber}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["aggregate_credits"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useSeasonRequest = (router: NextRouter) => {
  const showId = useMemo(() => parseId(router.query.showId), [router.query]);
  const seasonNumber = useMemo(() => parseNumber(router.query.seasonNumber), [router.query]);
  const areParamsParsed = showId && seasonNumber !== null;

  const { data, error, mutate } = useSWRImmutable<ShowSeasonExtended, FetchingError>(
    router.isReady && areParamsParsed ? generateSeasonUrl(showId, seasonNumber) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const seasonRequestResult = useMemo(() => {
    if (!areParamsParsed && router.isReady) {
      return createFailedRequestResult("Requested season was not found");
    }
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested season was not found");
    }
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
    return createSuccessfulRequestResult({ season: data, showId: showId! });
  }, [error, data, showId, areParamsParsed, router.isReady]);

  return {
    retry,
    seasonRequestResult,
  };
};

export default useSeasonRequest;
