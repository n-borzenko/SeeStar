import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import ShowCredits from "components/show/ShowCredits";
import { useExtendedShowRequest } from "hooks/show/useShowRequest";

const ShowCreditsPage: NextPage = () => {
  const router = useRouter();
  const { showRequestResult, retry } = useExtendedShowRequest(router);

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

  return <ShowCredits show={showRequestResult.data} />;
};

export default memo(ShowCreditsPage);
