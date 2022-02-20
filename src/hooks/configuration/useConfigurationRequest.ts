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
import isDefined from "helpers/isDefined";

const widthRegexp = /^w([1-9]+)$/;

type ConfigurationRawData = {
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

type ImageSize = {
  id: string;
  width: number;
};

type ConfigurationData = {
  secureBaseUrl: string;
  imageSizes: ImageSize[];
  fallbackSizeId: string;
};

const generateConfigurationUrl = () => {
  return `${process.env.NEXT_PUBLIC_TMBD_API_V3_URL}/configuration?${qs.stringify({
    api_key: process.env.NEXT_PUBLIC_TMDB_V3_APIKEY,
  })}`;
};

const configurationFetcher = async (url: string) => {
  const data = await defaultFetcher<ConfigurationRawData>(url);

  // api provides images for any possible size
  const allImageSizes = new Set([
    ...data.images.backdropSizes,
    ...data.images.logoSizes,
    ...data.images.posterSizes,
    ...data.images.profileSizes,
    ...data.images.stillSizes,
  ]);

  const imageSizes = Array.from(allImageSizes)
    .map((sizeId) => {
      const matched = sizeId.match(widthRegexp);
      if (!matched) {
        return undefined;
      }
      const width = parseInt(matched[1], 10);
      return {
        id: sizeId,
        width: width,
      };
    })
    .filter(isDefined)
    .sort(({ width: width1 }, { width: width2 }) => width1 - width2);

  // cache fetched data in reusable format as a response inside swr cache
  return {
    secureBaseUrl: data.images.secureBaseUrl,
    fallbackSizeId: "original",
    imageSizes,
  };
};

const useConfigurationRequest = () => {
  const { data, error } = useSWRImmutable<ConfigurationData, FetchingError>(
    generateConfigurationUrl(),
    configurationFetcher,
    {
      shouldRetryOnError: false,
    }
  );

  const configuration = useMemo(() => {
    if (error) {
      return createFailedRequestResult("Error occured while processing request", true);
    }
    if (!data || data.imageSizes.length === 0) {
      return createLoadingRequestResult();
    }
    return createSuccessfulRequestResult(data);
  }, [error, data]);

  return configuration;
};

export default useConfigurationRequest;
