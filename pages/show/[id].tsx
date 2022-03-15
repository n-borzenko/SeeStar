import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Show from "components/show";
import useShowRequest from "hooks/show/useShowRequest";

const ShowPage: NextPage = () => {
  const router = useRouter();
  const { show, retry } = useShowRequest(router);

  if (show.state === "loading") {
    return <Spinner size="large" />;
  }

  if (show.state === "failed") {
    return (
      <EmptyState
        message={show.errorMessage}
        buttonTitle={show.isRetryAvailable ? "Try again" : undefined}
        onClick={show.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <Show show={show.data} />;
};

export default memo(ShowPage);
