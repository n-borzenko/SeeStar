import type { NextPage } from "next";
import { memo } from "react";
import WelcomeBlock from "components/home/WelcomeBlock";

const IndexPage: NextPage = () => {
  return (
    <>
      <WelcomeBlock />
    </>
  );
};

export default memo(IndexPage);
