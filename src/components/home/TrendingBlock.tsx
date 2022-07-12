import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import Spinner from "components/common/Spinner";
import useMediaTypeParameter from "hooks/common/useMediaTypeParameter";
import useTrendingRequest from "hooks/trending/useTrendingRequest";
import { getMediaName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

export const availableTypes = [MediaTypes.Movie, MediaTypes.Show];

const TrendingBlock = () => {
  const router = useRouter();
  const mediaType = useMediaTypeParameter(router, availableTypes);
  const { trendingRequestResult } = useTrendingRequest(router, mediaType, 1);
  const links = useMemo(
    () =>
      availableTypes.map((type) => ({
        id: type,
        title: getMediaName(type),
        href: {
          pathname: router.pathname,
          query: { ...router.query, ["media_type"]: type },
        },
      })),
    [router.pathname, router.query]
  );

  return (
    <>
      <BlockHeader title="Trending now">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={mediaType} size="medium" wide />
        </div>
      </BlockHeader>
      <div>
        {trendingRequestResult.state === "loading" && <Spinner size="medium" />}
        {trendingRequestResult.state === "failed" && (
          <EmptyState message={trendingRequestResult.errorMessage} />
        )}
        {trendingRequestResult.state === "succeeded" && (
          <CardsList items={trendingRequestResult.data.results}>
            {(item) => (
              <MediumPortraitCard
                href={`/${item.mediaType === MediaTypes.Movie ? "movie" : "show"}/${item.id}`}
                posterPath={item.posterPath}
                mediaType={item.mediaType}
                title={item.mediaType === MediaTypes.Movie ? item.title : item.name}
                startDate={
                  item.mediaType === MediaTypes.Movie ? item.releaseDate : item.firstAirDate
                }
                voteAverage={item.voteAverage}
                genreIds={item.genreIds}
                infoType="rating"
              />
            )}
          </CardsList>
        )}
      </div>
    </>
  );
};

export default memo(TrendingBlock);
