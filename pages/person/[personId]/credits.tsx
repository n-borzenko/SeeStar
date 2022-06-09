import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import PersonCredits from "components/person/PersonCredits";
import usePersonRequest from "hooks/person/usePersonRequest";

const PersonCreditsPage: NextPage = () => {
  const router = useRouter();
  const { personRequestResult, retry } = usePersonRequest(router);

  if (personRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (personRequestResult.state === "failed") {
    return (
      <EmptyState
        message={personRequestResult.errorMessage}
        buttonTitle={personRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={personRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <PersonCredits person={personRequestResult.data} />;
};

export default memo(PersonCreditsPage);
