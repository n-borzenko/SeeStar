import { FC, useState, useCallback, useRef, useEffect, FocusEvent } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { HeaderMenuGroup, pagesData } from "configurations/pagesData";

const delayAfterOpeningSubmenu = 300;

type HeaderGroupedItemProps = {
  group: HeaderMenuGroup;
  isSubmenuOpened: boolean;
  openSubmenuById: (id: string) => void;
  closeSubmenuById: (id: string) => void;
  toggleSubmenuById: (id: string) => void;
  resetMenuSelection: () => void;
};

const HeaderGroupedItem: FC<HeaderGroupedItemProps> = ({
  group,
  isSubmenuOpened,
  openSubmenuById,
  closeSubmenuById,
  toggleSubmenuById,
  resetMenuSelection,
}) => {
  const toggleTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [isTogglingAvailable, setIsTogglingAvailable] = useState(true);

  const groupContainer = useRef<HTMLDivElement>(null);
  const submenuToggler = useRef<HTMLButtonElement>(null);
  const openSubmenu = useCallback(
    (e: FocusEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (e.target === submenuToggler.current && !isSubmenuOpened) {
        setIsTogglingAvailable(false);
        toggleTimeout.current = setTimeout(
          () => setIsTogglingAvailable(true),
          delayAfterOpeningSubmenu
        );
        openSubmenuById(group.id);
      }
    },
    [group.id, isSubmenuOpened, openSubmenuById]
  );

  const closeSubmenu = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      if (!groupContainer.current?.contains(e.relatedTarget)) {
        closeSubmenuById(group.id);
      }
    },
    [group.id, closeSubmenuById]
  );
  const toggleSubmenu = useCallback(() => {
    if (isTogglingAvailable) {
      toggleSubmenuById(group.id);
    }
  }, [group.id, toggleSubmenuById, isTogglingAvailable]);

  useEffect(
    () => () => {
      if (toggleTimeout.current) {
        clearTimeout(toggleTimeout.current);
        toggleTimeout.current = undefined;
      }
    },
    []
  );

  return (
    <div
      className="group relative"
      onFocus={openSubmenu}
      onBlur={closeSubmenu}
      ref={groupContainer}
    >
      <button
        type="button"
        onClick={toggleSubmenu}
        className="focus:rounded-full mx-2 my-1.5 group2"
        ref={submenuToggler}
      >
        <h6
          className={clsx(
            "text-white px-2 py-1 rounded-full group2-hover:bg-white/20 group2-focus:bg-white/20",
            isSubmenuOpened && "bg-white/20"
          )}
        >
          {group.title}
        </h6>
      </button>
      {isSubmenuOpened && group.submenu.length && (
        <div className="p-2 flex flex-col items-center z-50 bg-white absolute top-full right-1/2 translate-x-1/2 group-last:right-0 group-last:-translate-x-0 max-w-5xl rounded-2xl shadow-menu">
          {group.submenu.map((item) => (
            <NextLink href={pagesData[item.id].path} key={item.id} passHref>
              <a className="mx-2 my-1.5 group1 focus:rounded-full" onClick={resetMenuSelection}>
                <h6 className="text-primary rounded-full px-2 py-1 group1-focus:bg-primary/10 group1-hover:bg-primary/10 group1-active:bg-primary/20">
                  {pagesData[item.id].title}
                </h6>
              </a>
            </NextLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderGroupedItem;
