import type { FC } from "react";
import type { ShowSeasonDetailed } from "types/show/season";
import { memo } from "react";
import EpisodeLandscapeCard from "components/cards/EpisodeLandscapeCard";
import BlockHeader from "components/common/BlockHeader";
import MediaDescription from "components/common/MediaDescription";
import PaginationContainer from "components/common/PaginationContainer";
import TitledPageContainer from "components/common/TitledPageContainer";
import { getEpisodeName, getPluralizedName, getSeasonName } from "helpers/textUtilities";
import usePageParameter from "hooks/common/usePageParameter";
import { MediaTypes } from "types/mediaTypes";

type SeasonEpisodesProps = {
  showId: number;
  season: ShowSeasonDetailed;
};

const SeasonEpisodes: FC<SeasonEpisodesProps> = ({ season, showId }) => {
  const page = usePageParameter();
  const seasonTitle = getSeasonName(season.name, season.seasonNumber);

  return (
    <TitledPageContainer title={`SeeStar • Season episodes • ${seasonTitle}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={seasonTitle}
          startDate={season.airDate}
          infoType="text"
          infoText={getPluralizedName("episode", season.episodes.length)}
        />
        <div className="grid grid-rows-[auto_1fr]">
          <BlockHeader title="Episodes" />
          <PaginationContainer items={season.episodes} page={page}>
            {(episodes) => (
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {episodes.map((episode) => (
                  <EpisodeLandscapeCard
                    key={episode.id}
                    href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
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
        </div>
      </div>
    </TitledPageContainer>
  );
};

export default memo(SeasonEpisodes);
