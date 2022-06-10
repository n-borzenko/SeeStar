import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { MovieDetailed, MovieExtended } from "types/movie";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId } from "helpers/fetching/parseParams";

const generateMovieUrl = (id: number, isExtended: boolean) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/movie/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: isExtended
        ? ["credits", "external_ids", "keywords", "release_dates", "similar"]
        : [],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useMovieRequest = <T extends MovieDetailed | MovieExtended>(
  router: NextRouter,
  isExtended: boolean
) => {
  const movieId = useMemo(() => parseId(router.query.movieId), [router.query]);

  const { data, error, mutate } = useSWRImmutable<T, FetchingError>(
    router.isReady && movieId ? generateMovieUrl(movieId, isExtended) : null,
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

export const useDetailedMovieRequest = (router: NextRouter) => {
  const detailedMovieRequestResult = useMovieRequest<MovieDetailed>(router, false);
  return detailedMovieRequestResult;
};

export const useExtendedMovieRequest = (router: NextRouter) => {
  const extendedMovieRequestResult = useMovieRequest<MovieExtended>(router, true);
  return extendedMovieRequestResult;
};
