import type { NextRouter } from "next/router";
import { useMemo } from "react";
import { MediaTypes } from "types/mediaTypes";

const parseSelectedId = (availableTypes: MediaTypes[], type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return availableTypes.find((id) => id === expectedType) ?? undefined;
};

const useMediaTypeParameter = (router: NextRouter, availableTypes: MediaTypes[]) => {
  const mediaType = useMemo(
    () => parseSelectedId(availableTypes, router.query["media_type"]) ?? availableTypes[0],
    [router.query, availableTypes]
  );

  return mediaType;
};

export default useMediaTypeParameter;
