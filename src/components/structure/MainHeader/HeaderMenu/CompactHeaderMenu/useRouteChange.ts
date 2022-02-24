import { useRouter } from "next/router";
import { useEffect } from "react";

const useRouteChange = (closeMenu: () => void) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", closeMenu);
    return () => router.events.off("routeChangeComplete", closeMenu);
  }, [router, closeMenu]);
};

export default useRouteChange;
