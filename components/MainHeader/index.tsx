import { useCallback, useRef, useEffect, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import logoImage from "assets/logo.svg";
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
    <header className="flex justify-center bg-primary shadow-bar z-1" role="banner">
      <div style={{ width: 0, height: 0 }} tabIndex={-1} ref={resetSelectionElement} />
      <nav
        className="xl:max-w-screen-xl py-2 px-4 grow flex justify-between items-center h-full"
        aria-label="Main navigation"
      >
        <NextLink href="/" passHref>
          <a
            className="leading-0 flex items-center focus:rounded-full"
            onClick={clearMenuSelection}
            aria-label="See star home page"
          >
            <Image
              src={logoImage}
              priority
              alt="Logo"
              layout="fixed"
              quality="100"
              width="40"
              height="40"
            />
            <span className="text-white ml-4 variant-h4">See Star</span>
          </a>
        </NextLink>
        <HeaderMenu />
      </nav>
    </header>
  );
};

export default memo(MainHeader);
