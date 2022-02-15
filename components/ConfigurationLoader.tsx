import React, { memo, ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchConfiguration } from "store/slices/configuration";
import { fetchGenres } from "store/slices/genres";
import { MediaTypes } from "types/search";
import Loader from "components/Loader";
import EmptyState from "components/EmptyState";

const ConfigurationLoader = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { configuration, genres } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const requestPromises = useRef<{ abort: () => void }[]>([]);

  useEffect(() => {
    if (configuration.requestStatus === "idle") {
      requestPromises.current = [...requestPromises.current, dispatch(fetchConfiguration())];
    }
    if (genres[MediaTypes.Movie].requestStatus === "idle") {
      requestPromises.current = [
        ...requestPromises.current,
        dispatch(fetchGenres(MediaTypes.Movie)),
      ];
    }
    if (genres[MediaTypes.Show].requestStatus === "idle") {
      requestPromises.current = [
        ...requestPromises.current,
        dispatch(fetchGenres(MediaTypes.Show)),
      ];
    }
  }, [dispatch, configuration.requestStatus, genres]);

  useEffect(() => {
    return () => {
      requestPromises.current.map((promise) => promise.abort());
    };
  }, []);

  if (
    !router.isReady ||
    configuration.requestStatus === "idle" ||
    configuration.requestStatus === "pending"
  ) {
    return <Loader size="large" />;
  }

  if (configuration.requestStatus === "failed") {
    return <EmptyState message={`Error occured while processing request`} />;
  }

  return <>{children}</>;
};

export default memo(ConfigurationLoader);
