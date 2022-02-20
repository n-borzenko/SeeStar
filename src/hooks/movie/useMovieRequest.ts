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

const getMovieId = (id?: string | string[]) => {
  if (!id) {
    return null;
  }
  const parsedId = parseInt(typeof id === "string" ? id : id[0], 10);
  return isNaN(parsedId) || parsedId < 1 || parsedId > Number.MAX_SAFE_INTEGER ? null : parsedId;
};

const generateMovieUrl = (id: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/movie/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["credits", "external_ids", "keywords"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useMovieRequest = (router: NextRouter) => {
  const movieId = useMemo(() => getMovieId(router.query.id), [router.query]);

  const { data, error, mutate } = useSWRImmutable<MovieExtended, FetchingError>(
    router.isReady && movieId ? generateMovieUrl(movieId) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const movie = useMemo(() => {
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
  }, [error, data]);

  return {
    retry,
    movie,
  };
};

export default useMovieRequest;
