import { useRouter } from "next/router";
import { useMemo } from "react";

const parsePage = (page?: string | string[]) => {
  if (!page) {
    return undefined;
  }
  const expectedPage = parseInt(typeof page === "string" ? page : page[0], 10);
  return isNaN(expectedPage) || expectedPage < 1 ? undefined : expectedPage;
};

const usePageParameter = () => {
  const router = useRouter();
  const page = useMemo(() => parsePage(router.query.page) ?? 1, [router.query.page]);
  return page;
};

export default usePageParameter;
