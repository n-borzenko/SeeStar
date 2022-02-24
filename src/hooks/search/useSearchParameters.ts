import type { NextRouter } from "next/router";
import type { SearchParameters } from "types/search";
import { useMemo } from "react";
import { MediaTypes } from "types/mediaTypes";

const getSearchText = (text?: string | string[]) => {
  if (!text) {
    return undefined;
  }
  return typeof text === "string" ? text : text[0];
};

const getSelectedId = (type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return Object.values(MediaTypes).find((id) => id === expectedType) ?? undefined;
};

const getPage = (page?: string | string[]) => {
  if (!page) {
    return undefined;
  }
  const expectedPage = parseInt(typeof page === "string" ? page : page[0], 10);
  return isNaN(expectedPage) || expectedPage < 1 ? undefined : expectedPage;
};

const useSearchParameters = (router: NextRouter) => {
  const parameters = useMemo<SearchParameters>(
    () => ({
      type: getSelectedId(router.query.type) ?? MediaTypes.Any,
      text: (getSearchText(router.query.text) ?? "").trim(),
      page: getPage(router.query.page) ?? 1,
    }),
    [router.query]
  );

  return parameters;
};

export default useSearchParameters;
