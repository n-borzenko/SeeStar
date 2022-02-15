import type { FC } from "react";

import NextLink from "next/link";
import { memo } from "react";

import { pagesData, headerMenuStructure, isHeaderMenuGroup } from "configurations/pagesData";

import generateVisibilityClassNames from "../generateVisibilityClassNames";
import HeaderGroupedItem from "./HeaderGroupedItem";

type FullHeaderMenuProps = {
  selectedGroupId?: string;
  closeSubmenuById: (id: string) => void;
  toggleSubmenuById: (id: string) => void;
};

const FullHeaderMenu: FC<FullHeaderMenuProps> = ({
  selectedGroupId,
  closeSubmenuById,
  toggleSubmenuById,
}) => {
  return (
    <ul className="hidden sm:flex items-center h-full -mr-1.5">
      {headerMenuStructure.map((item) =>
        isHeaderMenuGroup(item) ? (
          <HeaderGroupedItem
            key={item.id}
            group={item}
            isSubmenuOpened={selectedGroupId === item.id}
            closeSubmenuById={closeSubmenuById}
            toggleSubmenuById={toggleSubmenuById}
          />
        ) : (
          <li
            className={`mx-2 my-1.5 ${generateVisibilityClassNames(item.supportedSizes)}`}
            key={item.id}
          >
            <NextLink href={pagesData[item.id].path} passHref>
              <a className="variant-h6 inline-block text-white px-2 py-1 rounded-full focus:bg-white/20 hover:bg-white/20 active:bg-white/40">
                {pagesData[item.id].title}
              </a>
            </NextLink>
          </li>
        )
      )}
    </ul>
  );
};

export default memo(FullHeaderMenu);
