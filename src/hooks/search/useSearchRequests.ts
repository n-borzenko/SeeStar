import type { NextRouter } from "next/router";
import type { RootState } from "store";
import qs from "qs";
import { useState, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "store/hooks";
import { fetchSearchResults, clearSearchResults } from "store/slices/search";
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

const useSearchRequests = (router: NextRouter, searchState: RootState["search"]) => {
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState(getSearchText(router.query.text));
  const requestPromise = useRef<{ abort: () => void } | undefined>(undefined);

  const submitForm = useCallback(
    () =>
      router.push(
        `${router.pathname}?${qs.stringify({
          text: searchText,
          type: searchState.parameters.type,
        })}`
      ),
    [router, searchText, searchState.parameters.type]
  );

  const retryRequest = useCallback(() => {
    requestPromise.current = dispatch(fetchSearchResults(searchState.parameters));
  }, [dispatch, searchState.parameters]);

  useEffect(() => {
    if (router.isReady) {
      const type = getSelectedId(router.query.type);
      const text = getSearchText(router.query.text);
      const page = getPage(router.query.page);
      setSearchText(text);
      requestPromise.current = dispatch(fetchSearchResults({ text, type, page }));
    }
    return () => {
      requestPromise.current?.abort();
    };
  }, [router.query, router.isReady, dispatch]);

  useEffect(() => {
    return () => {
      requestPromise.current?.abort();
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  return { submitForm, retryRequest, searchText, setSearchText };
};

export default useSearchRequests;
