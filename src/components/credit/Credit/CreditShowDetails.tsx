import type { FC } from "react";
import type { ShowCreditDetailed } from "types/credit";
import type { ShowEpisode } from "types/show/episode";
import type { ShowSeason } from "types/show/season";
import qs from "qs";
import { memo, useMemo } from "react";
import EpisodeLandscapeCard from "components/cards/EpisodeLandscapeCard";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import BlockHeader from "components/common/BlockHeader";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import PaginationContainer from "components/common/PaginationContainer";
import useShowListParameter, { showListTypes } from "hooks/credit/useShowListParameter";
import usePageParameter from "hooks/common/usePageParameter";
import { getEpisodeName, getPluralizedName, getSeasonName } from "helpers/textUtilities";

type CreditShowDetailsProps = {
  credit: ShowCreditDetailed;
};

const sortItems = <T extends ShowSeason | ShowEpisode>(a: T, b: T) => {
  const aTime = a.airDate ? new Date(a.airDate).getTime() : Number.MAX_SAFE_INTEGER;
  const bTime = b.airDate ? new Date(b.airDate).getTime() : Number.MAX_SAFE_INTEGER;
  return bTime - aTime;
};

const CreditShowDetails: FC<CreditShowDetailsProps> = ({ credit }) => {
  const showList = useShowListParameter();
  const page = usePageParameter();

  const links = useMemo(
    () =>
      showListTypes.map((type) => ({
        id: type,
        title: `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`,
        href: `/credit/${credit.id}?${qs.stringify({ show_list: type })}`,
      })),
    [credit]
  );

  const sortedItems = useMemo(
    () => ({
      episodes: showList === "episodes" ? credit.media.episodes.sort(sortItems) : [],
      seasons: showList === "seasons" ? credit.media.seasons.sort(sortItems) : [],
    }),
    [credit.media, showList]
  );

  return (
    <div className="grow grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credited in">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={showList} size="medium" wide />
        </div>
      </BlockHeader>

      {sortedItems[showList].length > 0 ? (
        <>
          {showList === "episodes" && (
            <PaginationContainer items={sortedItems.episodes} page={page}>
              {(episodes) => (
                <div className="w-full place-self-start grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  {episodes.map((episode) => (
                    <EpisodeLandscapeCard
                      key={episode.id}
                      cardSize="small"
                      href={`/show/${credit.media.id}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
                      posterPath={episode.stillPath}
                      title={getEpisodeName(
                        episode.name,
                        episode.episodeNumber,
                        episode.seasonNumber,
                        true
                      )}
                      startDate={episode.airDate}
                      voteAverage={episode.voteAverage}
                      overview={episode.overview}
                    />
                  ))}
                </div>
              )}
            </PaginationContainer>
          )}
          {showList === "seasons" && (
            <PaginationContainer items={sortedItems.seasons} page={page}>
              {(seasons) => (
                <div className="w-full place-self-start grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  {seasons.map((season) => (
                    <MediaLandscapeCard
                      key={season.id}
                      cardSize="small"
                      href={`/show/${credit.media.id}/season/${season.seasonNumber}`}
                      posterPath={season.posterPath}
                      mediaType={credit.mediaType}
                      title={getSeasonName(season.name, season.seasonNumber)}
                      startDate={season.airDate}
                      infoType="text"
                      infoText={getPluralizedName("episode", season.episodeCount)}
                      overview={season.overview}
                    />
                  ))}
                </div>
              )}
            </PaginationContainer>
          )}
        </>
      ) : (
        <EmptyState message="No credits found" />
      )}
    </div>
  );
};

export default memo(CreditShowDetails);
