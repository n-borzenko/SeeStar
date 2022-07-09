import type { NextRouter } from "next/router";
import { useMemo } from "react";
import { MediaTypes } from "types/mediaTypes";

const parseSearchText = (text?: string | string[]) => {
  if (!text) {
    return undefined;
  }
  return typeof text === "string" ? text : text[0];
};

const parseSelectedId = (type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return Object.values(MediaTypes).find((id) => id === expectedType) ?? undefined;
};

const useSearchParameters = (router: NextRouter) => {
  const parameters = useMemo(
    () => ({
      type: parseSelectedId(router.query.type) ?? MediaTypes.Any,
      text: (parseSearchText(router.query.text) ?? "").trim(),
    }),
    [router.query]
  );

  return parameters;
};

export default useSearchParameters;
