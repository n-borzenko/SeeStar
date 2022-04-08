import { memo, useState, useCallback, useEffect } from "react";

const useExtraSmallScreen = () => {
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState<boolean>();
  const checkBreakpoint = useCallback(
    (query: MediaQueryListEvent) => setIsExtraSmallScreen(query.matches),
    []
  );

  useEffect(() => {
    const smallScreenQuery = window.matchMedia("(max-width: 639px)");
    setIsExtraSmallScreen(smallScreenQuery.matches);
    smallScreenQuery.addEventListener("change", checkBreakpoint);
    return () => {
      smallScreenQuery.removeEventListener("change", checkBreakpoint);
    };
  }, [checkBreakpoint]);

  return isExtraSmallScreen;
};

export default useExtraSmallScreen;
