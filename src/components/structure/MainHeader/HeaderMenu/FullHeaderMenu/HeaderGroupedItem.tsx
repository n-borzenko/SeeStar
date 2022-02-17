import type { FC, FocusEvent } from "react";
import clsx from "clsx";
import NextLink from "next/link";
import { memo, useCallback, useRef } from "react";
import { HeaderMenuGroup, pagesData } from "components/structure/pagesData";
import generateVisibilityClassNames from "../generateVisibilityClassNames";

type HeaderGroupedItemProps = {
  group: HeaderMenuGroup;
  isSubmenuOpened: boolean;
  closeSubmenuById: (id: string) => void;
  toggleSubmenuById: (id: string) => void;
};

const HeaderGroupedItem: FC<HeaderGroupedItemProps> = ({
  group,
  isSubmenuOpened,
  closeSubmenuById,
  toggleSubmenuById,
}) => {
  const groupContainer = useRef<HTMLLIElement>(null);
  const submenuToggler = useRef<HTMLButtonElement>(null);

  const closeSubmenu = useCallback(
    (e: FocusEvent<HTMLLIElement>) => {
      if (!groupContainer.current?.contains(e.relatedTarget)) {
        closeSubmenuById(group.id);
      }
    },
    [group.id, closeSubmenuById]
  );

  const toggleSubmenu = useCallback(
    () => toggleSubmenuById(group.id),
    [group.id, toggleSubmenuById]
  );

  const isExpanded = group.submenu.length > 0 && isSubmenuOpened;

  return (
    <li
      className={`group m-0 relative ${generateVisibilityClassNames(group.supportedSizes)}`}
      onBlur={closeSubmenu}
      ref={groupContainer}
    >
      <button
        type="button"
        onClick={toggleSubmenu}
        className={clsx(
          "variant-h6 text-white mx-2 my-1.5 px-2 py-1 rounded-full hover:bg-white/20 focus:bg-white/20",
          isSubmenuOpened && "bg-white/20"
        )}
        ref={submenuToggler}
        aria-expanded={isExpanded}
        aria-haspopup="true"
      >
        {group.title}
      </button>
      {isExpanded && (
        <ul className="p-2 flex flex-col items-center z-50 bg-white absolute top-full right-1/2 translate-x-1/2 group-last:right-0 group-last:-translate-x-0 max-w-5xl rounded-2xl shadow-popup">
          {group.submenu.map((item) => (
            <li
              className={`mx-2 my-1.5 ${generateVisibilityClassNames(item.supportedSizes)}`}
              key={item.id}
            >
              <NextLink href={pagesData[item.id].path} passHref>
                <a className="variant-h6 inline-block text-primary rounded-full px-2 py-1 focus:bg-primary/10 hover:bg-primary/10 active:bg-primary/20">
                  {pagesData[item.id].title}
                </a>
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(HeaderGroupedItem);
