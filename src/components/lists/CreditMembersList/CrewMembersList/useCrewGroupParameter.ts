import { useRouter } from "next/router";
import { useMemo } from "react";

const parseCrewGroup = (group?: string | string[]) => {
  if (!group) {
    return undefined;
  }
  return typeof group === "string" ? group : group[0];
};

const useCrewGroupParameter = () => {
  const router = useRouter();
  const crewGroup = useMemo(() => parseCrewGroup(router.query["crew_group"]), [router.query]);

  return crewGroup;
};

export default useCrewGroupParameter;
