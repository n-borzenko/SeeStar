import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Episode from "components/show/Episode";
import useEpisodeRequest from "hooks/show/useEpisodeRequest";

const EpisodePage: NextPage = () => {
  const router = useRouter();
  const { episodeRequestResult, retry } = useEpisodeRequest(router);

  if (episodeRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (episodeRequestResult.state === "failed") {
    return (
      <EmptyState
        message={episodeRequestResult.errorMessage}
        buttonTitle={episodeRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={episodeRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return (
    <Episode
      showId={episodeRequestResult.data.showId}
      episode={episodeRequestResult.data.episode}
    />
  );
};

export default memo(EpisodePage);
