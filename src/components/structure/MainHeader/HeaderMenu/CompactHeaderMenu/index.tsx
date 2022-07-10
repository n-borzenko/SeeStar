import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import Button, { ButtonLink } from "components/common/Button";
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
            <ul className="grid gap-4 m-4" ref={itemsListContainer}>
              {headerMenuStructure.map((item) => (
                <li
                  className={`flex ${generateVisibilityClassNames(item.supportedSizes)}`}
                  key={item.id}
                >
                  {isHeaderMenuGroup(item) && (
                    <>
                      <p className="basis-5/12 flex items-center h-10 text-xl font-semibold text-white/70 px-4">
                        {item.title}:
                      </p>
                      <ul className="grid gap-2">
                        {item.submenu.map((item) => (
                          <li
                            className={`js-compact-menu-item ${generateVisibilityClassNames(
                              item.supportedSizes
                            )}`}
                            key={item.id}
                          >
                            <Link href={pagesData[item.id].path} passHref>
                              <ButtonLink
                                className="font-semibold text-xl js-compact-menu-link"
                                size="large"
                                color="white"
                                variant="transparent"
                              >
                                {pagesData[item.id].title}
                              </ButtonLink>
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
