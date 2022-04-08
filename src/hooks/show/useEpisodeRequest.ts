import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { ShowEpisodeExtended } from "types/show/episode";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId, parseNumber } from "helpers/fetching/parseParams";

const generateEpisodeUrl = (showId: number, seasonNumber: number, episodeNumber: number) => {
  return `${
    process.env.NEXT_PUBLIC_TMBD_API_V3_URL
  }/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["credits"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useEpisodeRequest = (router: NextRouter) => {
  const showId = useMemo(() => parseId(router.query.showId), [router.query]);
  const seasonNumber = useMemo(() => parseNumber(router.query.seasonNumber), [router.query]);
  const episodeNumber = useMemo(() => parseNumber(router.query.episodeNumber), [router.query]);
  const areParamsParsed = showId && seasonNumber !== null && episodeNumber !== null;

  const { data, error, mutate } = useSWRImmutable<ShowEpisodeExtended, FetchingError>(
    router.isReady && areParamsParsed
      ? generateEpisodeUrl(showId, seasonNumber, episodeNumber)
      : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const episodeRequestResult = useMemo(() => {
    if (!areParamsParsed && router.isReady) {
      return createFailedRequestResult("Requested episode was not found");
    }
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested episode was not found");
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
    return createSuccessfulRequestResult({ episode: data, showId: showId! });
  }, [error, data, showId, areParamsParsed, router.isReady]);

  return {
    retry,
    episodeRequestResult,
  };
};

export default useEpisodeRequest;
