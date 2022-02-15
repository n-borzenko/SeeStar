import type { NextPage } from "next";
import { memo } from "react";
import WelcomeBlock from "./blocks/WelcomeBlock";

const IndexPage: NextPage = () => {
  return (
    <>
      <WelcomeBlock />
    </>
  );
};

export default memo(IndexPage);
