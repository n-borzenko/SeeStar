import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { MovieCreditDetailed, ShowCreditDetailed } from "types/credit";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseStringId } from "helpers/fetching/parseParams";

const generateCreditUrl = (id: string) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/credit/${id}?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
  })}`;
};

const usePersonRequest = (router: NextRouter) => {
  const creditId = useMemo(() => parseStringId(router.query.creditId), [router.query]);

  const { data, error, mutate } = useSWRImmutable<
    MovieCreditDetailed | ShowCreditDetailed,
    FetchingError
  >(router.isReady && creditId ? generateCreditUrl(creditId) : null, {
    shouldRetryOnError: false,
  });

  const retry = useCallback(() => mutate(), [mutate]);

  const creditRequestResult = useMemo(() => {
    if (!creditId && router.isReady) {
      return createFailedRequestResult("Requested credit was not found");
    }
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested credit was not found");
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
  }, [error, data, creditId, router.isReady]);

  return {
    retry,
    creditRequestResult,
  };
};

export default usePersonRequest;
