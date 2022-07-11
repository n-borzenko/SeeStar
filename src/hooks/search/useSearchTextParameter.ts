import type { NextRouter } from "next/router";
import { useMemo } from "react";

const parseSearchText = (text?: string | string[]) => {
  if (!text) {
    return undefined;
  }
  return typeof text === "string" ? text : text[0];
};

const useSearchTextParameter = (router: NextRouter) => {
  const parameters = useMemo(
    () => (parseSearchText(router.query.text) ?? "").trim(),
    [router.query]
  );

  return parameters;
};

export default useSearchTextParameter;
