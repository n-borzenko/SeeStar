import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { ShowExtended } from "types/show";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";

const getShowId = (id?: string | string[]) => {
  if (!id) {
    return null;
  }
  const parsedId = parseInt(typeof id === "string" ? id : id[0], 10);
  return isNaN(parsedId) || parsedId < 1 || parsedId > Number.MAX_SAFE_INTEGER ? null : parsedId;
};

const generateShowUrl = (id: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/tv/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["credits", "external_ids", "keywords", "content_ratings"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useShowRequest = (router: NextRouter) => {
  const showId = useMemo(() => getShowId(router.query.id), [router.query]);

  const { data, error, mutate } = useSWRImmutable<ShowExtended, FetchingError>(
    router.isReady && showId ? generateShowUrl(showId) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const show = useMemo(() => {
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested show was not found");
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
    show,
  };
};

export default useShowRequest;
