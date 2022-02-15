import qs from "qs";
import { MediaTypes, SearchItem } from "types/search";
import camelizeData from "helpers/camelizeData";

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
  return camelizeData(result) as SearchResultsData;
};
