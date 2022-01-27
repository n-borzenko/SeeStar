import { useEffect, memo } from "react";
import { useRouter } from "next/router";
import FullHeaderMenu from "./FullHeaderMenu";
import CompactHeaderMenu from "./CompactHeaderMenu";
import useSelectedSubmenu from "./useSelectedSubmenu";

const HeaderMenu = () => {
  const router = useRouter();
  const { selectedGroupId, closeSubmenuById, toggleSubmenuById, resetSubmenuSelection } =
    useSelectedSubmenu();

  useEffect(() => {
    router.events.on("routeChangeComplete", resetSubmenuSelection);
    return () => router.events.off("routeChangeComplete", resetSubmenuSelection);
  }, [router, resetSubmenuSelection]);

  return (
    <>
      <FullHeaderMenu
        selectedGroupId={selectedGroupId}
        closeSubmenuById={closeSubmenuById}
        toggleSubmenuById={toggleSubmenuById}
      />
      <CompactHeaderMenu />
    </>
  );
};

export default memo(HeaderMenu);
