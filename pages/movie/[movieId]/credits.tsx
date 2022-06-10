import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import MovieCredits from "components/movie/MovieCredits";
import { useExtendedMovieRequest } from "hooks/movie/useMovieRequest";

const MovieCreditsPage: NextPage = () => {
  const router = useRouter();
  const { movieRequestResult, retry } = useExtendedMovieRequest(router);

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

  return <MovieCredits movie={movieRequestResult.data} />;
};

export default memo(MovieCreditsPage);
