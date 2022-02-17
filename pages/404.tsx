import type { NextPage } from "next";
import EmptyState from "components/EmptyState";

const NotFoundPage: NextPage = () => {
  return <EmptyState message="404 - Page was not found" />;
};

export default NotFoundPage;
