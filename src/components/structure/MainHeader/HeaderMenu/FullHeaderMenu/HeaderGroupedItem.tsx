import type { FC, FocusEvent } from "react";
import Link from "next/link";
import { memo, useCallback, useRef } from "react";
import Button, { ButtonLink } from "components/common/Button";
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
      <Button
        type="button"
        onClick={toggleSubmenu}
        className={`font-semibold text-xl px-2 ${isSubmenuOpened && "bg-white/20"}`}
        size="large"
        color="white"
        variant="transparent"
        ref={submenuToggler}
        aria-expanded={isExpanded}
        aria-haspopup="true"
        narrow
      >
        {group.title}
      </Button>
      {isExpanded && (
        <ul className="mt-2 p-4 grid gap-2 justify-items-center z-50 bg-white absolute top-full right-1/2 translate-x-1/2 group-last:right-0 group-last:-translate-x-0 max-w-5xl rounded-2xl shadow-popup">
          {group.submenu.map((item) => (
            <li className={generateVisibilityClassNames(item.supportedSizes)} key={item.id}>
              <Link href={pagesData[item.id].path} passHref>
                <ButtonLink
                  className="font-semibold text-xl"
                  size="large"
                  color="primary"
                  variant="transparent"
                >
                  {pagesData[item.id].title}
                </ButtonLink>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default memo(HeaderGroupedItem);
