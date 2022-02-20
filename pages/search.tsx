import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import SearchForm from "components/common/SearchForm";
import Spinner from "components/common/Spinner";
import Pagination from "components/search/Pagination";
import SearchResults from "components/search/SearchResults";
import useSearchForm from "hooks/search/useSearchForm";
import useSearchParameters from "hooks/search/useSearchParameters";
import useSearchRequest from "hooks/search/useSearchRequest";
import useTypeLinks from "hooks/search/useTypeLinks";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const parameters = useSearchParameters(router);
  const { searchText, setSearchText, submitForm } = useSearchForm(
    router,
    parameters.text,
    parameters.type
  );
  const { searchResults, retry } = useSearchRequest(router.isReady, parameters);
  const typeLinks = useTypeLinks(router.pathname, searchText);

  if (!router.isReady) {
    return <Spinner size="large" />;
  }

  return (
    <div className="w-full h-full grid grid-rows-[auto_auto_auto_1fr_auto] grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-y-6 lg:gap-8">
      <h1 className="col-span-full variant-h3 md:variant-h2">Search for movies, shows, people</h1>
      <div className="col-span-full sm:col-span-1">
        <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
      </div>
      <div className="col-span-full sm:col-span-1">
        <LinkGroup links={typeLinks} selectedId={parameters.type} size="large" wide />
      </div>

      <div className="col-span-full sm:row-span-2">
        {searchResults.state === "loading" && <Spinner size="large" />}
        {searchResults.state === "failed" && (
          <EmptyState
            message={searchResults.errorMessage}
            buttonTitle={searchResults.isRetryAvailable ? "Try again" : undefined}
            onClick={searchResults.isRetryAvailable ? retry : undefined}
          />
        )}
        {searchResults.state === "succeeded" && <SearchResults data={searchResults.data} />}
      </div>

      {searchResults.state === "succeeded" && searchResults.data.totalResults > 0 && (
        <>
          <div className="col-span-2 sm:col-span-1 self-center">
            {searchResults.data.totalPages > 1 && (
              <Pagination parameters={parameters} totalPages={searchResults.data.totalPages} />
            )}
          </div>
          <div className="col-span-1 justify-self-end self-center">
            <p className="text-lg font-medium text-primary text-right">
              {searchResults.data.totalResults} results
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SearchPage);
