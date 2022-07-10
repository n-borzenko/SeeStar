import { useRouter } from "next/router";
import { memo, useCallback, useRef, useEffect } from "react";
import LogoLink from "components/structure/LogoLink";
import HeaderMenu from "./HeaderMenu";

const MainHeader = () => {
  const router = useRouter();
  const resetSelectionElement = useRef<HTMLDivElement>(null);

  const clearMenuSelection = useCallback(() => {
    resetSelectionElement.current?.focus();
    resetSelectionElement.current?.blur();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", clearMenuSelection);
    return () => router.events.off("routeChangeComplete", clearMenuSelection);
  }, [router, clearMenuSelection]);

  return (
    <header className="fixed w-full flex justify-center bg-primary shadow-bar z-10" role="banner">
      <div style={{ width: 0, height: 0 }} tabIndex={-1} ref={resetSelectionElement} />
      <nav
        className="xl:max-w-screen-xl py-2 px-4 sm:py-3 sm:px-8 grow flex justify-between items-center h-full"
        aria-label="Main navigation"
      >
        <LogoLink onClick={clearMenuSelection} size="large" />
        <HeaderMenu />
      </nav>
    </header>
  );
};

export default memo(MainHeader);
