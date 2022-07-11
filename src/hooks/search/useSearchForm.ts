import type { NextRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { MediaTypes } from "types/mediaTypes";

// text is part of parameters, parsed from current path
// searchText is mutable value, used for controlled input inside search form
const useSearchForm = (router: NextRouter, text: string, mediaType: MediaTypes) => {
  const [searchText, setSearchText] = useState(text);

  const submitForm = useCallback(
    () =>
      router.push({
        pathname: router.pathname,
        query: {
          text: searchText,
          ["media_type"]: mediaType,
        },
      }),
    [router, searchText, mediaType]
  );

  useEffect(() => setSearchText(text), [text]);

  return { searchText, setSearchText, submitForm };
};

export default useSearchForm;
