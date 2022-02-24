import type { NextPage } from "next";
import EmptyState from "components/common/EmptyState";

const ServerErrorPage: NextPage = () => {
  return <EmptyState message="500 - Server error occured" />;
};

export default ServerErrorPage;
