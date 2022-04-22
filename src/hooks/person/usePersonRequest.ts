import type { NextRouter } from "next/router";
import type FetchingError from "helpers/fetching/fetchingError";
import type { PersonExtended } from "types/person";
import qs from "qs";
import { useMemo, useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import { parseId } from "helpers/fetching/parseParams";

const generatePersonUrl = (id: number) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/person/${id}?${qs.stringify(
    {
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      append_to_response: ["combined_credits", "external_ids"],
    },
    { arrayFormat: "comma" }
  )}`;
};

const usePersonRequest = (router: NextRouter) => {
  const personId = useMemo(() => parseId(router.query.personId), [router.query]);

  const { data, error, mutate } = useSWRImmutable<PersonExtended, FetchingError>(
    router.isReady && personId ? generatePersonUrl(personId) : null,
    {
      shouldRetryOnError: false,
    }
  );

  const retry = useCallback(() => mutate(), [mutate]);

  const personRequestResult = useMemo(() => {
    if (!personId && router.isReady) {
      return createFailedRequestResult("Requested person was not found");
    }
    if (error && error.status && error.status === 404) {
      return createFailedRequestResult("Requested person was not found");
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
  }, [error, data, personId, router.isReady]);

  return {
    retry,
    personRequestResult,
  };
};

export default usePersonRequest;
