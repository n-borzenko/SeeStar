import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Movie from "components/movie/Movie";
import useMovieRequest from "hooks/movie/useMovieRequest";

const MoviePage: NextPage = () => {
  const router = useRouter();
  const { movieRequestResult, retry } = useMovieRequest(router);

  if (movieRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (movieRequestResult.state === "failed") {
    return (
      <EmptyState
        message={movieRequestResult.errorMessage}
        buttonTitle={movieRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={movieRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <Movie movie={movieRequestResult.data} />;
};

export default memo(MoviePage);
