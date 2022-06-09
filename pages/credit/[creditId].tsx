import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import Spinner from "components/common/Spinner";
import Credit from "components/credit/Credit";
import useCreditRequest from "hooks/credit/useCreditRequest";

const CreditPage: NextPage = () => {
  const router = useRouter();
  const { creditRequestResult, retry } = useCreditRequest(router);

  if (creditRequestResult.state === "loading") {
    return <Spinner size="large" />;
  }

  if (creditRequestResult.state === "failed") {
    return (
      <EmptyState
        message={creditRequestResult.errorMessage}
        buttonTitle={creditRequestResult.isRetryAvailable ? "Try again" : undefined}
        onClick={creditRequestResult.isRetryAvailable ? retry : undefined}
      />
    );
  }

  return <Credit credit={creditRequestResult.data} />;
};

export default memo(CreditPage);
