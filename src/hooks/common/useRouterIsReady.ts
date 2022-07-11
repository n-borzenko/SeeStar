import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useRouterIsReady = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return isReady;
};

export default useRouterIsReady;
