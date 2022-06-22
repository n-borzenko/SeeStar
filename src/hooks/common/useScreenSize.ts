import { useState, useCallback, useEffect, useMemo } from "react";

export enum ScreenSize {
  Xs = 1,
  Sm = 640,
  Md = 768,
  Lg = 1024,
  Xl = 1200,
}

const sizes = [ScreenSize.Xs, ScreenSize.Sm, ScreenSize.Md, ScreenSize.Lg, ScreenSize.Xl];

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>();
  const isWindowAvailable = typeof window !== "undefined";

  const queries = useMemo(() => {
    if (!isWindowAvailable) {
      return undefined;
    }
    return sizes.map((size) => ({
      query: window.matchMedia(`(min-width: ${size}px)`),
      size,
    }));
  }, [isWindowAvailable]);

  const checkBreakpoints = useCallback(() => {
    if (!queries) {
      return;
    }
    for (let i = queries.length - 1; i >= 0; i--) {
      if (queries[i].query.matches) {
        setScreenSize(queries[i].size);
        return;
      }
    }
  }, [queries]);

  useEffect(() => {
    checkBreakpoints();
    queries?.forEach(({ query }) => {
      query.addEventListener("change", checkBreakpoints);
    });

    return () => {
      queries?.forEach(({ query }) => {
        query.removeEventListener("change", checkBreakpoints);
      });
    };
  }, [queries, checkBreakpoints]);

  return screenSize;
};

export default useScreenSize;
