import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Season from "components/season/Season";
import { useExtendedSeasonRequest } from "hooks/show/useSeasonRequest";

const SeasonPage: NextPage = () => {
  const router = useRouter();
  const { seasonRequestResult, retry } = useExtendedSeasonRequest(router);

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
    <Season showId={seasonRequestResult.data.showId} season={seasonRequestResult.data.season} />
  );
};

export default memo(SeasonPage);
