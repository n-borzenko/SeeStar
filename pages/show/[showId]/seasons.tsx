import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Seasons from "components/show/Seasons";
import { useDetailedShowRequest } from "hooks/show/useShowRequest";

const SeasonsPage: NextPage = () => {
  const router = useRouter();
  const { showRequestResult, retry } = useDetailedShowRequest(router);

  if (showRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (showRequestResult.state === "failed") {
    return (
      <EmptyState
        message={showRequestResult.errorMessage}
        buttonTitle={showRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={showRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <Seasons show={showRequestResult.data} />;
};

export default memo(SeasonsPage);
