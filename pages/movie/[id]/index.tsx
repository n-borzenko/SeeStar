import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/EmptyState";
import Loader from "components/Loader";
import { useAppSelector } from "store/hooks";
import useMovieRequest from "./useMovieRequest";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { requestStatus, data } = useAppSelector((state) => state.movie);
  const { retryRequest } = useMovieRequest(router);

  if (requestStatus === "idle" || requestStatus === "pending") {
    return <Loader size="large" />;
  }

  if (requestStatus === "failed" || !data) {
    return (
      <EmptyState
        message={`Error occured while processing request`}
        buttonTitle="Try again"
        onClick={retryRequest}
      />
    );
  }

  return (
    <div className="w-full h-full">
      <h1>{data.title}</h1>
    </div>
  );
};

export default memo(SearchPage);
