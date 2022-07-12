import type { NextPage } from "next";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import Spinner from "components/common/Spinner";
import TitledPageContainer from "components/common/TitledPageContainer";
import TrendingResults from "components/trending/TrendingResults";
import useMediaTypeParameter from "hooks/common/useMediaTypeParameter";
import usePageParameter from "hooks/common/usePageParameter";
import useRouterIsReady from "hooks/common/useRouterIsReady";
import useTrendingRequest from "hooks/trending/useTrendingRequest";
import { getMediaName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

export const availableTypes = [MediaTypes.Movie, MediaTypes.Show];

const TrendingPage: NextPage = () => {
  const isReady = useRouterIsReady();
  const router = useRouter();
  const mediaType = useMediaTypeParameter(router, availableTypes);
  const page = usePageParameter();
  const { trendingRequestResult, retry } = useTrendingRequest(router, mediaType, page);
  const typeLinks = useMemo(
    () =>
      availableTypes.map((type) => ({
        title: getMediaName(type),
        id: type,
        href: { pathname: router.pathname, query: { ["media_type"]: type } },
      })),
    [router.pathname]
  );

  if (!isReady) {
    return <Spinner size="large" />;
  }

  return (
    <TitledPageContainer title={`SeeStar • Trending • ${getMediaName(mediaType)}`}>
      <div className="w-full h-full grid grid-rows-[auto_auto_1fr]">
        <h2 className="text-3xl md:text-4xl font-black">Trending media</h2>
        <BlockHeader title="Trending now">
          <div className="w-1/2 max-w-[18rem]">
            <LinkGroup links={typeLinks} selectedId={mediaType} size="medium" wide />
          </div>
        </BlockHeader>
        <div>
          {trendingRequestResult.state === "loading" && <Spinner size="large" />}
          {trendingRequestResult.state === "failed" && (
            <EmptyState
              message={trendingRequestResult.errorMessage}
              buttonTitle={trendingRequestResult.isRetryAvailable ? "Try again" : undefined}
              onClick={trendingRequestResult.isRetryAvailable ? retry : undefined}
            />
          )}
          {trendingRequestResult.state === "succeeded" && (
            <TrendingResults data={trendingRequestResult.data} />
          )}
        </div>
      </div>
    </TitledPageContainer>
  );
};

export default memo(TrendingPage);
