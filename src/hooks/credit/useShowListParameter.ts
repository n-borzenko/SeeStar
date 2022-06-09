import { useRouter } from "next/router";
import { useMemo } from "react";

type ShowListType = "episodes" | "seasons";

export const showListTypes: ShowListType[] = ["episodes", "seasons"];

const parseShowList = (type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return showListTypes.find((id) => id === expectedType) ?? undefined;
};

const useShowListParameter = () => {
  const router = useRouter();
  const creditType = useMemo(
    () => parseShowList(router.query["show_list"]) ?? showListTypes[0],
    [router.query]
  );

  return creditType;
};

export default useShowListParameter;
