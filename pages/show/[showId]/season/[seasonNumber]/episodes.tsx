import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Episodes from "components/show/Episodes";
import { useDetailedSeasonRequest } from "hooks/show/useSeasonRequest";

const EpisodesPage: NextPage = () => {
  const router = useRouter();
  const { seasonRequestResult, retry } = useDetailedSeasonRequest(router);

  if (seasonRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (seasonRequestResult.state === "failed") {
    return (
      <EmptyState
        message={seasonRequestResult.errorMessage}
        buttonTitle={seasonRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={seasonRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return (
    <Episodes season={seasonRequestResult.data.season} showId={seasonRequestResult.data.showId} />
  );
};

export default memo(EpisodesPage);
