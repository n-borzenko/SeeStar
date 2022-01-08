import { FC, useState, useCallback } from "react";
import NextLink from "next/link";
import { pagesData, headerMenuStructure, isHeaderMenuGroup } from "configurations/pagesData";
import HeaderGroupedItem from "./HeaderGroupedItem";

type HeaderMenuProps = {
  resetMenuSelection: () => void;
};

const HeaderMenu: FC<HeaderMenuProps> = ({ resetMenuSelection }) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>();
  const openSubmenuById = useCallback((id: string) => {
    setSelectedGroupId(id);
  }, []);
  const closeSubmenuById = useCallback(
    (id: string) => {
      if (id === selectedGroupId) {
        setSelectedGroupId(undefined);
      }
    },
    [selectedGroupId]
  );
  const toggleSubmenuById = useCallback(
    (id: string) => setSelectedGroupId(id === selectedGroupId ? undefined : id),
    [selectedGroupId]
  );

  return (
    <nav className="flex items-center">
      {headerMenuStructure.map((item) =>
        isHeaderMenuGroup(item) ? (
          <HeaderGroupedItem
            key={item.id}
            group={item}
            isSubmenuOpened={selectedGroupId === item.id}
            openSubmenuById={openSubmenuById}
            closeSubmenuById={closeSubmenuById}
            toggleSubmenuById={toggleSubmenuById}
            resetMenuSelection={resetMenuSelection}
          />
        ) : (
          <NextLink key={item.id} href={pagesData[item.id].path} passHref>
            <a className="mx-2 my-1.5 group focus:rounded-full" onClick={resetMenuSelection}>
              <h6 className="text-white rounded-full px-2 py-1 group-focus:bg-white/20 group-hover:bg-white/20 group-active:bg-white/40">
                {pagesData[item.id].title}
              </h6>
            </a>
          </NextLink>
        )
      )}
    </nav>
  );
};

export default HeaderMenu;
