import { useCallback, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import logoImage from "assets/logo.svg";
import HeaderMenu from "./HeaderMenu";

const MainHeader = () => {
  const resetSelectionElement = useRef<HTMLDivElement>(null);
  const resetMenuSelection = useCallback(() => {
    resetSelectionElement.current?.focus();
    resetSelectionElement.current?.blur();
  }, []);

  return (
    <div className="flex justify-center py-2 px-4 bg-primary shadow-bar">
      <div style={{ width: 0, height: 0 }} tabIndex={-1} ref={resetSelectionElement} />
      <div className="flex justify-between items-center grow max-w-screen-lg">
        <NextLink href="/" passHref>
          <a
            className="leading-0 flex items-center focus:rounded-full"
            onClick={resetMenuSelection}
          >
            <Image
              src={logoImage}
              alt="Logo"
              layout="fixed"
              priority
              quality="100"
              width="40"
              height="40"
            />
            <h4 className="text-white ml-4">See Star</h4>
          </a>
        </NextLink>
        <HeaderMenu resetMenuSelection={resetMenuSelection} />
      </div>
    </div>
  );
};

export default MainHeader;
