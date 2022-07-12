import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo } from "react";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import SearchForm from "components/common/SearchForm";
import Spinner from "components/common/Spinner";
import TitledPageContainer from "components/common/TitledPageContainer";
import SearchResults from "components/search/SearchResults";
import useMediaTypeParameter from "hooks/common/useMediaTypeParameter";
import usePageParameter from "hooks/common/usePageParameter";
import useRouterIsReady from "hooks/common/useRouterIsReady";
import useSearchForm from "hooks/search/useSearchForm";
import useSearchRequest from "hooks/search/useSearchRequest";
import useSearchTextParameter from "hooks/search/useSearchTextParameter";
import useMediaTypeLinks, { availableTypes } from "hooks/search/useMediaTypeLinks";

const SearchPage: NextPage = () => {
  const isReady = useRouterIsReady();
  const router = useRouter();
  const mediaType = useMediaTypeParameter(router, availableTypes);
  const text = useSearchTextParameter(router);
  const page = usePageParameter();
  const { searchText, setSearchText, submitForm } = useSearchForm(router, text, mediaType);
  const { searchResults, retry } = useSearchRequest(router.isReady, text, mediaType, page);
  const typeLinks = useMediaTypeLinks(router, searchText);

  if (!isReady) {
    return <Spinner size="large" />;
  }

  return (
    <TitledPageContainer title={`SeeStar • Search ${text.length > 0 ? `• ${text}` : ""}`}>
      <div className="w-full h-full grid grid-rows-[auto_auto_auto_1fr] grid-cols-2 gap-2 sm:gap-y-6 lg:gap-8">
        <h1 className="col-span-full sm:row-span-2 variant-h3 md:variant-h2">
          Search for movies, shows, people
        </h1>
        <div className="col-span-full sm:col-span-1">
          <SearchForm value={searchText} onValueChanged={setSearchText} onSubmit={submitForm} />
        </div>
        <div className="col-span-full sm:col-span-1">
          <LinkGroup links={typeLinks} selectedId={mediaType} size="large" wide />
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
    </TitledPageContainer>
  );
};

export default memo(SearchPage);
