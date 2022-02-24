import type FetchingError from "helpers/fetching/fetchingError";
import qs from "qs";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import {
  createFailedRequestResult,
  createLoadingRequestResult,
  createSuccessfulRequestResult,
} from "helpers/fetching/createRequestResult";
import defaultFetcher from "helpers/fetching/defaultFetcher";
import { MediaTypes } from "types/mediaTypes";

type GenresRawData = {
  genres: {
    id: number;
    name: string;
  }[];
};

const generateGenresUrl = (type: MediaTypes.Movie | MediaTypes.Show) => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/genre/${type}/list?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
  })}`;
};

const genresFetcher = async (url: string) => {
  const data = await defaultFetcher<GenresRawData>(url);
  return data.genres.reduce(
    (result, { id, name }) => result.set(id, name),
    new Map<number, string>()
  );
};

const useGenresRequest = (type: MediaTypes.Movie | MediaTypes.Show) => {
  const { data, error } = useSWRImmutable<Map<number, string>, FetchingError>(
    generateGenresUrl(type),
    genresFetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const genres = useMemo(() => {
    if (error) {
      return createFailedRequestResult("Error occured while processing request");
    }
    if (!data || data.size === 0) {
      return createLoadingRequestResult();
    }
    return createSuccessfulRequestResult(data);
  }, [error, data]);

  return genres;
};

export default useGenresRequest;
