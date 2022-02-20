import type { NextRouter } from "next/router";
import qs from "qs";
import { useState, useCallback, useEffect } from "react";
import { MediaTypes } from "types/mediaTypes";

// text is part of parameters, parsed from current path
// searchText is mutable value, used for controlled input inside search form
const useSearchForm = (router: NextRouter, text: string, type: MediaTypes) => {
  const [searchText, setSearchText] = useState(text);

  const submitForm = useCallback(
    () =>
      router.push(
        `${router.pathname}?${qs.stringify({
          text: searchText,
          type,
        })}`
      ),
    [router, searchText, type]
  );

  useEffect(() => setSearchText(text), [text]);

  return { searchText, setSearchText, submitForm };
};

export default useSearchForm;
