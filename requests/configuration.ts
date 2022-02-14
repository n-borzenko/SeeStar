import qs from "qs";
import camelizeData from "helpers/camelizeData";

type ConfigurationData = {
  images: {
    baseUrl: string;
    secureBaseUrl: string;
    backdropSizes: string[];
    logoSizes: string[];
    posterSizes: string[];
    profileSizes: string[];
    stillSizes: string[];
  };
  changeKeys: string[];
};

export const getConfiguration = async (signal: AbortSignal) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/configuration?${qs.stringify({
      api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
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
  return camelizeData(result) as ConfigurationData;
};
