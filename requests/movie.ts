import type { MovieExtended } from "types/movie";
import qs from "qs";
import camelizeData from "helpers/camelizeData";

export const getMovie = async (id: number, signal: AbortSignal) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/movie/${id}?${qs.stringify(
      {
        api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
        append_to_response: ["credits", "external_ids", "keywords"],
      },
      { arrayFormat: "comma" }
    )}`,
    {
      signal,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      `[Data layer: get search results] status: ${response.status}, message: ${result?.status_message}`
    );
  }
  return camelizeData(result) as MovieExtended;
};
