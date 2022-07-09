import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import SearchForm from "components/common/SearchForm";
import Spinner from "components/common/Spinner";
import SearchResults from "components/search/SearchResults";
import usePageParameter from "hooks/common/usePageParameter";
import useSearchForm from "hooks/search/useSearchForm";
import useSearchParameters from "hooks/search/useSearchParameters";
import useSearchRequest from "hooks/search/useSearchRequest";
import useTypeLinks from "hooks/search/useTypeLinks";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { text, type } = useSearchParameters(router);
  const page = usePageParameter();
  const { searchText, setSearchText, submitForm } = useSearchForm(router, text, type);
  const { searchResults, retry } = useSearchRequest(router.isReady, text, type, page);
  const typeLinks = useTypeLinks(router.pathname, searchText);

  if (!router.isReady) {
    return <Spinner size="large" />;
  }

  return (
    <div className="w-full h-full grid grid-rows-[auto_auto_auto_1fr] grid-cols-2 gap-2 sm:gap-y-6 lg:gap-8">
      <h1 className="col-span-full sm:row-span-2 variant-h3 md:variant-h2">
        Search for movies, shows, people
      </h1>
      <div className="col-span-full sm:col-span-1">
        <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
      </div>
      <div className="col-span-full sm:col-span-1">
        <LinkGroup links={typeLinks} selectedId={type} size="large" wide />
      </div>

      <div className="col-span-full grid grid-rows-1">
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
    </div>
  );
};

export default memo(SearchPage);
