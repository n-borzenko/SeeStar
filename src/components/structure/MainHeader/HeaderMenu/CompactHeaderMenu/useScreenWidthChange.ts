import { useCallback, useEffect } from "react";

const useScreenWidthChange = (closeMenu: () => void) => {
  const checkBreakpoint = useCallback(
    (query: MediaQueryListEvent) => {
      if (query.matches) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    const smallScreenQuery = window.matchMedia("(min-width: 640px)");
    smallScreenQuery.addEventListener("change", checkBreakpoint);
    return () => {
      smallScreenQuery.removeEventListener("change", checkBreakpoint);
    };
  }, [checkBreakpoint]);
};

export default useScreenWidthChange;
