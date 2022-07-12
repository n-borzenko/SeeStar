import type { NextPage } from "next";
import { memo } from "react";
import Spinner from "components/common/Spinner";
import TrendingBlock from "components/home/TrendingBlock";
import WelcomeBlock from "components/home/WelcomeBlock";
import useRouterIsReady from "hooks/common/useRouterIsReady";

const IndexPage: NextPage = () => {
  const isReady = useRouterIsReady();

  return (
    <div className="h-full flex flex-col">
      <WelcomeBlock />
      <div className="grow h-full flex flex-col">
        {isReady ? <TrendingBlock /> : <Spinner size="large" />}
      </div>
    </div>
  );
};

export default memo(IndexPage);
