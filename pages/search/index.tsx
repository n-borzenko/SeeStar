import { useState, useMemo, useCallback, useEffect } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
import SearchForm from "components/SearchForm";
import LinkGroup from "components/LinkGroup";
import ButtonLikeLink from "components/ButtonLikeLink";
import { MediaTypes } from "types/search";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchSearchResults } from "store/fields/search";

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

const getSearchText = (text?: string | string[]) => {
  if (!text) {
    return undefined;
  }
  return typeof text === "string" ? text : text[0];
};

const getSelectedId = (type?: string | string[]) => {
  if (!type) {
    return undefined;
  }
  const expectedType = typeof type === "string" ? type : type[0];
  return links.find(({ id }) => id === expectedType)?.id ?? undefined;
};

const getPage = (page?: string | string[]) => {
  if (!page) {
    return undefined;
  }
  const expectedPage = parseInt(typeof page === "string" ? page : page[0], 10);
  return isNaN(expectedPage) || expectedPage < 1 ? undefined : expectedPage;
};

const SearchPage: NextPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(getSearchText(router.query.text));
  const searchState = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const fullLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        href: `${router.pathname}?${qs.stringify({ text: searchText, type: link.id })}`,
      })),
    [searchText, router.pathname]
  );

  const submitForm = useCallback(
    () =>
      router.push(
        `${router.pathname}?${qs.stringify({
          text: searchText,
          type: searchState.parameters.type,
        })}`
      ),
    [router, searchText, searchState.parameters.type]
  );

  useEffect(() => {
    const type = getSelectedId(router.query.type);
    const text = getSearchText(router.query.text);
    const page = getPage(router.query.page);
    setSearchText(text);
    const promise = dispatch(fetchSearchResults({ text, type, page }));
    return () => {
      promise.abort();
    };
  }, [router.query, dispatch]);

  const isNextPageAvailable =
    searchState.parameters.page > 0 && searchState.parameters.page < searchState.data.totalPages;
  const isPreviousPageAvailable = searchState.parameters.page > 1;

  return (
    <>
      <h1 className="variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      <div className="grid grid-rows-2 sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8 mt-6">
        <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
        <LinkGroup links={fullLinks} selectedId={searchState.parameters.type} size="large" wide />

        <div className="grid grid-cols-3 grid-gap-4">
          {isPreviousPageAvailable && (
            <div className="self-center justify-self-center">
              <NextLink
                href={`${router.pathname}?${qs.stringify({
                  ...searchState.parameters,
                  page: searchState.parameters.page - 1,
                })}`}
                passHref
              >
                <ButtonLikeLink
                  icon="arrow-left"
                  variant="outlined"
                  size="large"
                  ariaLabel="Previous page"
                />
              </NextLink>
            </div>
          )}
          <span className="self-center justify-self-center col-start-2 col-end-3">
            {searchState.parameters.page}
          </span>
          {isNextPageAvailable && (
            <div className="self-center justify-self-center">
              <NextLink
                href={`${router.pathname}?${qs.stringify({
                  ...searchState.parameters,
                  page: searchState.parameters.page + 1,
                })}`}
                passHref
              >
                <ButtonLikeLink
                  icon="arrow-right"
                  variant="outlined"
                  size="large"
                  ariaLabel="Next page"
                />
              </NextLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
