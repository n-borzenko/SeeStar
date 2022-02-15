import type { FC } from "react";

import { memo } from "react";

import EmptyState from "components/EmptyState";
import Loader from "components/Loader";
import { useAppSelector } from "store/hooks";

type EmptySearchStatesProps = { retryRequest: () => void };

const EmptySearchStates: FC<EmptySearchStatesProps> = ({ retryRequest }) => {
  const { requestStatus, parameters, data } = useAppSelector((state) => state.search);

  if (requestStatus === "idle" || requestStatus === "pending") {
    return <Loader size="large" />;
  }

  if (requestStatus === "failed") {
    return (
      <EmptyState
        message={`Error occured while processing request,
          change requested parameters or`}
        buttonTitle="Try again"
        onClick={retryRequest}
      />
    );
  }

  if (parameters.text.length === 0) {
    return (
      <EmptyState
        message={`Current query is empty,
          type your request and press search button`}
      />
    );
  }

  if (data.pages[parameters.page].length === 0) {
    return (
      <EmptyState
        message={`Nothing has been found,
          specify requested parameters`}
      />
    );
  }

  return null;
};

export default memo(EmptySearchStates);
