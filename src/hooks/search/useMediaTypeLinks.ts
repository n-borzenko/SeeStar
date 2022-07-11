import type { NextRouter } from "next/router";
import { useMemo } from "react";
import { getMediaName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

export const availableTypes = [
  MediaTypes.Any,
  MediaTypes.Movie,
  MediaTypes.Show,
  MediaTypes.Person,
];

const useMediaTypeLinks = (router: NextRouter, searchText: string) => {
  const typeLinks = useMemo(
    () =>
      availableTypes.map((type) => ({
        title: getMediaName(type),
        id: type,
        href: {
          pathname: router.pathname,
          query: {
            text: searchText,
            ["media_type"]: type,
          },
        },
      })),
    [searchText, router.pathname]
  );

  return typeLinks;
};

export default useMediaTypeLinks;
