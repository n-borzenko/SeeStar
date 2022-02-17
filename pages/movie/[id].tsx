import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Loader from "components/common/Spinner";
import { useAppSelector } from "store/hooks";
import useMovieRequest from "hooks/movie/useMovieRequest";

const MoviePage: NextPage = () => {
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

export default memo(MoviePage);
