import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback, useRef, useEffect } from "react";
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
    <header className="fixed w-full flex justify-center bg-primary shadow-bar z-1" role="banner">
      <div style={{ width: 0, height: 0 }} tabIndex={-1} ref={resetSelectionElement} />
      <nav
        className="xl:max-w-screen-xl py-2 px-4 grow flex justify-between items-center h-full"
        aria-label="Main navigation"
      >
        <Link href="/">
          <a
            className="leading-0 flex items-center focus:rounded-full"
            onClick={clearMenuSelection}
            aria-label="See star home page"
          >
            <Image
              src="/assets/logo.svg"
              priority
              alt="Logo"
              layout="fixed"
              quality="100"
              width="40"
              height="40"
            />
            <span className="text-white ml-4 variant-h4">See Star</span>
          </a>
        </Link>
        <HeaderMenu />
      </nav>
    </header>
  );
};

export default memo(MainHeader);
