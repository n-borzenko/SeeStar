import qs from "qs";
import camelizeData from "helpers/camelizeData";
import { MediaTypes } from "types/mediaTypes";

type ConfigurationData = {
  genres: {
    id: number;
    name: string;
  }[];
};

export const getGenres = async (type: MediaTypes.Movie | MediaTypes.Show, signal: AbortSignal) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/genre/${type}/list?${qs.stringify({
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
    })}`,
    {
      signal,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `[Data layer: get genres results] status: ${response.status}, message: ${result?.errors?.[0]}`
    );
  }
  return camelizeData(result) as ConfigurationData;
};
