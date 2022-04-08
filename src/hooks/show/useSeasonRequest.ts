import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { ShowSeasonExtended, ShowSeasonDetailed } from "types/show/season";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId, parseNumber } from "helpers/fetching/parseParams";

const generateSeasonUrl = (showId: number, seasonNumber: number, isExtended: boolean) => {
  return `${
    process.env.NEXT_PUBLIC_TMBD_API_V3_URL
  }/tv/${showId}/season/${seasonNumber}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: isExtended ? ["aggregate_credits"] : [],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useSeasonRequest = <T extends ShowSeasonExtended | ShowSeasonDetailed>(
  router: NextRouter,
  isExtended: boolean
) => {
  const showId = useMemo(() => parseId(router.query.showId), [router.query]);
  const seasonNumber = useMemo(() => parseNumber(router.query.seasonNumber), [router.query]);
  const areParamsParsed = showId && seasonNumber !== null;

  const { data, error, mutate } = useSWRImmutable<T, FetchingError>(
    router.isReady && areParamsParsed ? generateSeasonUrl(showId, seasonNumber, isExtended) : null,
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

export const useExtendedSeasonRequest = (router: NextRouter) => {
  const extendedSeasonRequestResult = useSeasonRequest<ShowSeasonExtended>(router, true);
  return extendedSeasonRequestResult;
};

export const useDetailedSeasonRequest = (router: NextRouter) => {
  const detailedSeasonRequestResult = useSeasonRequest<ShowSeasonDetailed>(router, false);
  return detailedSeasonRequestResult;
};
