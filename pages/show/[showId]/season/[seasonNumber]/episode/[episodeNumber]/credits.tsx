import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import EpisodeCredits from "components/show/EpisodeCredits";
import useEpisodeRequest from "hooks/show/useEpisodeRequest";

const EpisodeCreditsPage: NextPage = () => {
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
    <EpisodeCredits
      episode={episodeRequestResult.data.episode}
      showId={episodeRequestResult.data.showId}
    />
  );
};

export default memo(EpisodeCreditsPage);
