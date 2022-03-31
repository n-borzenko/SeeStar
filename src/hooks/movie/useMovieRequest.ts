import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { MovieExtended } from "types/movie";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId } from "helpers/fetching/parseParams";

const generateMovieUrl = (id: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/movie/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["credits", "external_ids", "keywords", "release_dates"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useMovieRequest = (router: NextRouter) => {
  const movieId = useMemo(() => parseId(router.query.movieId), [router.query]);

  const { data, error, mutate } = useSWRImmutable<MovieExtended, FetchingError>(
    router.isReady && movieId ? generateMovieUrl(movieId) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const movieRequestResult = useMemo(() => {
    if (!movieId && router.isReady) {
      return createFailedRequestResult("Requested movie was not found");
    }
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested movie was not found");
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
    return createSuccessfulRequestResult(data);
  }, [error, data, movieId, router.isReady]);

  return {
    retry,
    movieRequestResult,
  };
};

export default useMovieRequest;
