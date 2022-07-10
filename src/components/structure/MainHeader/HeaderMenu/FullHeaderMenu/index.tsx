import type { FC } from "react";
import Link from "next/link";
import { memo } from "react";
import { ButtonLink } from "components/common/Button";
import { pagesData, headerMenuStructure, isHeaderMenuGroup } from "components/structure/pagesData";
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
    <ul className="hidden sm:grid grid-flow-col gap-1 md:gap-4">
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
          <li className={generateVisibilityClassNames(item.supportedSizes)} key={item.id}>
            <Link href={pagesData[item.id].path} passHref>
              <ButtonLink
                className="font-semibold text-xl px-2"
                size="large"
                color="white"
                variant="transparent"
                narrow
              >
                {pagesData[item.id].title}
              </ButtonLink>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default memo(FullHeaderMenu);
