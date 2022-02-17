import type { SearchItem } from "types/search";
import qs from "qs";
import camelizeData from "helpers/camelizeData";
import { MediaTypes } from "types/mediaTypes";

export type GetSearchResultsParameters = { text: string; type: MediaTypes; page: number };

type SearchResultsData = {
  page: number;
  results: SearchItem[];
  totalResults: number;
  totalPages: number;
};

export const getSearchResults = async (
  { text, type, page }: GetSearchResultsParameters,
  signal: AbortSignal
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/search/${type}?${qs.stringify({
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
      query: text,
      page,
    })}`,
    {
      signal,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `[Data layer: get search results] status: ${response.status}, message: ${result?.errors?.[0]}`
    );
  }

  const convertedResult = camelizeData(result);
  if (type === MediaTypes.Any) {
    return convertedResult as SearchResultsData;
  }

  // the mediaType field is only provided by API in case of multitype request
  // for consistency it's more convenient to have it in all cases
  return {
    ...convertedResult,
    results: convertedResult.results.map((item: SearchItem) => ({
      ...item,
      mediaType: type,
    })),
  } as SearchResultsData;
};
