import React, { FC, memo, ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchConfiguration } from "store/slices/configuration";
import Loader from "components/Loader";
import EmptyState from "components/EmptyState";

const ConfigurationLoader = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const configuration = useAppSelector((state) => state.configuration);
  const dispatch = useAppDispatch();
  const requestPromise = useRef<{ abort: () => void } | undefined>(undefined);

  useEffect(() => {
    if (configuration.requestStatus !== "failed" && configuration.requestStatus !== "succeeded") {
      requestPromise.current = dispatch(fetchConfiguration());
    }
    return () => {
      requestPromise.current?.abort();
    };
  }, [dispatch, configuration.requestStatus]);

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
