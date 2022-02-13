import type { NextPage } from "next";
import { useRouter } from "next/router";
import SearchForm from "components/SearchForm";
import LinkGroup from "components/LinkGroup";
import Loader from "components/Loader";
import { useAppSelector } from "store/hooks";
import SearchResults from "./components/SearchResults";
import Pagination from "./components/Pagination";
import EmptySearchStates from "./components/EmptySearchStates";
import useSearchRequests from "./hooks/useSearchRequests";
import useTypesLinks from "./hooks/useTypesLinks";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchState = useAppSelector((state) => state.search);

  const { submitForm, retryRequest, searchText, setSearchText } = useSearchRequests(
    router,
    searchState
  );
  const typesLinks = useTypesLinks(router.pathname, searchText);

  const areSearchResultsVisible =
    searchState.requestStatus === "succeeded" &&
    searchState.data.pages[searchState.parameters.page]?.length > 0;
  const isPaginationAvailable =
    searchState.requestStatus === "succeeded" && searchState.data.totalResults > 0;

  return (
    <div className="w-full h-full grid grid-rows-[auto_auto_auto_1fr_auto] grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-y-6 lg:gap-8">
      <h1 className="col-span-full variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      {router.isReady ? (
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
                <p className="title text-primary text-right">
                  {searchState.data.totalResults} results
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="col-span-full row-start-4 row-end-4">
          <Loader size="large" />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
