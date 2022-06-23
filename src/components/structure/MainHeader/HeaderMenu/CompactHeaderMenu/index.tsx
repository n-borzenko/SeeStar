import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import Button from "components/common/Button";
import { pagesData, headerMenuStructure, isHeaderMenuGroup } from "components/structure/pagesData";
import generateVisibilityClassNames from "../generateVisibilityClassNames";
import useCompactMenuState from "./useCompactMenuState";
import useFocusLoop from "./useFocusLoop";
import useRouteChange from "./useRouteChange";
import useScreenWidthChange from "./useScreenWidthChange";

const headerHeight = 3.5;

const CompactHeaderMenu = () => {
  const { burgerButton, itemsListContainer, setFocusOnBurgerButton, setFocusOnLastLink } =
    useFocusLoop();

  const { menuState, toggleMenuVisibility, updateStateAfterAnimation, closeMenu } =
    useCompactMenuState();

  useScreenWidthChange(closeMenu);
  useRouteChange(closeMenu);

  return (
    <div className="sm:hidden">
      {menuState === "isVisible" && (
        <div style={{ width: 0, height: 0 }} tabIndex={0} onFocus={setFocusOnLastLink} />
      )}
      <Button
        type="button"
        icon={menuState === "isSlidingIn" || menuState === "isVisible" ? "close" : "burger"}
        variant="outlined"
        color="white"
        ref={burgerButton}
        onClick={toggleMenuVisibility}
        ariaExpanded={menuState === "isSlidingIn" || menuState === "isVisible"}
        ariaHasPopup="true"
        ariaLabel={
          menuState === "isSlidingIn" || menuState === "isVisible" ? "Close menu" : "Open menu"
        }
      />
      <div
        onAnimationEnd={updateStateAfterAnimation}
        className={clsx(
          "bg-primary absolute will-change-transform overflow-x-hidden overflow-y-auto max-width-w-screen z-20",
          menuState === "isSlidingIn" && "animate-slide-in-from-right",
          menuState === "isSlidingOut" && "animate-slide-out-to-right",
          menuState === "isInvisible" ? "w-0 left-full" : "w-screen left-0"
        )}
        style={{ height: `calc(100vh - ${headerHeight}rem)`, top: `${headerHeight}rem` }}
      >
        {menuState === "isVisible" && (
          <>
            <ul className="flex flex-col mx-4 my-2" ref={itemsListContainer}>
              {headerMenuStructure.map((item) => (
                <li
                  className={`flex my-2 ${generateVisibilityClassNames(item.supportedSizes)}`}
                  key={item.id}
                >
                  {isHeaderMenuGroup(item) && (
                    <>
                      <p className="basis-5/12 variant-h6 text-white m-1.5 px-2 py-1 opacity-70">
                        {item.title}:
                      </p>
                      <ul className="flex flex-col">
                        {item.submenu.map((item) => (
                          <li
                            className={`my-1.5 js-compact-menu-item ${generateVisibilityClassNames(
                              item.supportedSizes
                            )}`}
                            key={item.id}
                          >
                            <Link href={pagesData[item.id].path}>
                              <a className="variant-h6 inline-block text-white px-2 py-1 rounded-full focus:bg-white/20 hover:bg-white/20 active:bg-white/40 js-compact-menu-link">
                                {pagesData[item.id].title}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div tabIndex={0} style={{ width: 0, height: 0 }} onFocus={setFocusOnBurgerButton} />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CompactHeaderMenu);
