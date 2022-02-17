import type { NextRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "store/hooks";
import { fetchMovie, clearMovie } from "store/slices/movie";

const getId = (id?: string | string[]) => {
  if (!id) {
    return undefined;
  }
  const parsedId = parseInt(typeof id === "string" ? id : id[0], 10);
  return isNaN(parsedId) || parsedId < 1 || parsedId >= Number.MAX_SAFE_INTEGER
    ? undefined
    : parsedId;
};

const useMovieRequest = (router: NextRouter) => {
  const dispatch = useAppDispatch();
  const requestPromise = useRef<{ abort: () => void } | undefined>(undefined);

  const retryRequest = useCallback(() => {
    requestPromise.current = dispatch(fetchMovie(getId(router.query.id)));
  }, [dispatch, router.query]);

  useEffect(() => {
    if (router.isReady) {
      requestPromise.current = dispatch(fetchMovie(getId(router.query.id)));
    }
    return () => {
      requestPromise.current?.abort();
    };
  }, [router.query, router.isReady, dispatch]);

  useEffect(() => {
    return () => {
      requestPromise.current?.abort();
      dispatch(clearMovie());
    };
  }, [dispatch]);

  return { retryRequest };
};

export default useMovieRequest;
