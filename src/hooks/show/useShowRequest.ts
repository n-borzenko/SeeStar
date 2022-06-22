import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { ShowExtended, ShowDetailed } from "types/show";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId } from "helpers/fetching/parseParams";

const generateShowUrl = (id: number, isExtended: boolean) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/tv/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: isExtended
        ? ["aggregate_credits", "external_ids", "keywords", "content_ratings", "similar"]
        : [],
    },
    { arrayFormat: "comma" }
  )}`;
};

const useShowRequest = <T extends ShowExtended | ShowDetailed>(
  router: NextRouter,
  isExtended: boolean
) => {
  const showId = useMemo(() => parseId(router.query.showId), [router.query]);

  const { data, error, mutate } = useSWRImmutable<T, FetchingError>(
    router.isReady && showId ? generateShowUrl(showId, isExtended) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const showRequestResult = useMemo(() => {
    if (!showId && router.isReady) {
      return createFailedRequestResult("Requested show was not found");
    }
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
  }, [error, data, showId, router.isReady]);

  return {
    retry,
    showRequestResult,
  };
};

export const useExtendedShowRequest = (router: NextRouter) => {
  const extendedShowRequestResult = useShowRequest<ShowExtended>(router, true);
  return extendedShowRequestResult;
};

export const useDetailedShowRequest = (router: NextRouter) => {
  const detailedShowRequestResult = useShowRequest<ShowDetailed>(router, false);
  return detailedShowRequestResult;
};
