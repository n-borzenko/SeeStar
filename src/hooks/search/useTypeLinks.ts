import qs from "qs";
import { useMemo } from "react";
import { MediaTypes } from "types/mediaTypes";

const links = [
  {
    title: "All",
    id: MediaTypes.Any,
  },
  {
    title: "Movies",
    id: MediaTypes.Movie,
  },
  {
    title: "Shows",
    id: MediaTypes.Show,
  },
  {
    title: "People",
    id: MediaTypes.Person,
  },
];

const useTypeLinks = (pathname: string, searchText: string) => {
  const typesLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        href: `${pathname}?${qs.stringify({ text: searchText, type: link.id })}`,
      })),
    [searchText, pathname]
  );

  return typesLinks;
};

export default useTypeLinks;
