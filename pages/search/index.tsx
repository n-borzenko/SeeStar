import { useState, useMemo, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import qs from "qs";
import SearchForm from "components/SearchForm";
import LinkGroup from "components/LinkGroup";

const links = [
  {
    title: "All",
    id: "all",
  },
  {
    title: "Movies",
    id: "movies",
  },
  {
    title: "Shows",
    id: "shows",
  },
  {
    title: "People",
    id: "people",
  },
];

const getSearchText = (text?: string | string[]) => {
  if (!text) {
    return "";
  }
  return typeof text === "string" ? text : text[0];
};

const getSelectedId = (type?: string | string[]) => {
  if (!type) {
    return links[0].id;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return links.find(({ id }) => id === expectedType)?.id ?? links[0].id;
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(getSearchText(router.query.text));
  const [selectedId, setSelectedId] = useState(getSelectedId(router.query.type));

  const fullLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        href: `${router.pathname}?${qs.stringify({ text: searchText, type: link.id })}`,
      })),
    [searchText, router.pathname]
  );

  const submitForm = useCallback(
    () => router.push(`${router.pathname}?${qs.stringify({ text: searchText, type: selectedId })}`),
    [router, searchText, selectedId]
  );

  useEffect(() => {
    const type = getSelectedId(router.query.type);
    setSelectedId(type);
    const text = getSearchText(router.query.text);
    setSearchText(text);
    console.log("initiate request with ", type, text);
    // make api request with type + router.query.text and start loading
  }, [router.query]);

  return (
    <>
      <h1 className="variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      <div className="grid grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8 mt-6">
        <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
        <LinkGroup links={fullLinks} selectedId={selectedId} size="large" wide />
      </div>
    </>
  );
};

export default SearchPage;
