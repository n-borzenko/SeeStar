import { useRouter } from "next/router";
import { useMemo } from "react";

const mainPage = {
  href: "/",
  title: "home",
};

const usePathname = () => {
  const router = useRouter();

  const pathElements = useMemo(() => {
    if (!router.isReady) {
      return [];
    }

    const chunks = router.pathname
      .split("/")
      .slice(1)
      .map((chunk) => {
        const isPattern = chunk.startsWith("[");
        const value = isPattern ? router.query[chunk.replaceAll(/[\[\]]/g, "")] : chunk;
        return {
          value: Array.isArray(value) ? value[0] : value,
          isPattern,
        };
      });

    return chunks.reduce(
      (result, chunk, index) => {
        if (chunk.isPattern || !chunk.value) {
          return result;
        }
        const linkLength = chunks[index + 1] && chunks[index + 1].isPattern ? index + 2 : index + 1;
        return [
          ...result,
          {
            href: `/${chunks
              .map(({ value }) => value)
              .slice(0, linkLength)
              .join("/")}`,
            title: chunk.value,
          },
        ];
      },
      [mainPage]
    );
  }, [router.pathname, router.query, router.isReady]);

  return pathElements;
};

export default usePathname;
