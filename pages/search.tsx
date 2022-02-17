import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import LinkGroup from "components/common/LinkGroup";
import SearchForm from "components/common/SearchForm";
import { useAppSelector } from "store/hooks";
import EmptySearchStates from "components/search/EmptySearchStates";
import Pagination from "components/search/Pagination";
import SearchResults from "components/search/SearchResults";
import useSearchRequests from "hooks/search/useSearchRequests";
import useTypesLinks from "hooks/search/useTypesLinks";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchState = useAppSelector((state) => state.search);

  const { submitForm, retryRequest, searchText, setSearchText } = useSearchRequests(
    router,
    searchState
  );
  const typesLinks = useTypesLinks(router.pathname, searchText);

  const areFiltersAvailable = searchState.requestStatus !== "idle";
  const areSearchResultsVisible =
    searchState.requestStatus === "succeeded" &&
    searchState.data.pages[searchState.parameters.page]?.length > 0;
  const isPaginationAvailable =
    searchState.requestStatus === "succeeded" && searchState.data.totalResults > 0;

  return (
    <div className="w-full h-full grid grid-rows-[auto_auto_auto_1fr_auto] grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-y-6 lg:gap-8">
      <h1 className="col-span-full variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      {areFiltersAvailable && (
        <>
          <div className="col-span-full sm:col-span-1">
            <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
          </div>
          <div className="col-span-full sm:col-span-1">
            <LinkGroup
              links={typesLinks}
              selectedId={searchState.parameters.type}
              size="large"
              wide
            />
          </div>
        </>
      )}

      <div className="col-span-full sm:row-span-2">
        {areSearchResultsVisible ? (
          <SearchResults />
        ) : (
          <EmptySearchStates retryRequest={retryRequest} />
        )}
      </div>

      {isPaginationAvailable && (
        <>
          <div className="col-span-2 sm:col-span-1 self-center">
            <Pagination />
          </div>
          <div className="col-span-1 justify-self-end self-center">
            <p className="text-lg font-medium text-primary text-right">
              {searchState.data.totalResults} results
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SearchPage);
