import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Movie from "components/movie";
import useMovieRequest from "hooks/movie/useMovieRequest";

const MoviePage: NextPage = () => {
  const router = useRouter();
  const { movie, retry } = useMovieRequest(router);

  if (movie.state === "loading") {
    return <Spinner size="large" />;
  }

  if (movie.state === "failed") {
    return (
      <EmptyState
        message={movie.errorMessage}
        buttonTitle={movie.isRetryAvailable ? "Try again" : undefined}
        onClick={movie.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <Movie movie={movie.data} />;
};

export default memo(MoviePage);
