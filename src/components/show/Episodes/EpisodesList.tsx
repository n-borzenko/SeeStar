import type { FC } from "react";
import type { ShowEpisodeDetailed } from "types/show/episode";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import PosterImage from "components/common/PosterImage";
import Rating from "components/common/Rating";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type EpisodesListProps = {
  showId: number;
  episodes: ShowEpisodeDetailed[];
};

const EpisodesList: FC<EpisodesListProps> = ({ episodes, showId }) => {
  const isExtraSmallScreen = useExtraSmallScreen();

  return (
    <div>
      <BlockHeader title="Episodes" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {episodes.map((episode) => {
          const hasOverview = episode.overview && episode.overview.length > 0;
          return (
            <Card
              key={episode.id}
              href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
            >
              <div className="w-full grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
                <PosterImage
                  src={episode.stillPath}
                  type={MediaTypes.Show}
                  size={isExtraSmallScreen ? "smallLandscape" : "mediumLandscape"}
                  rounded={hasOverview ? "top-left" : "left"}
                />

                <div className="w-full grid grid-rows-[auto_1fr] gap-1 sm:gap-2 p-2">
                  <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
                    {episode.name ? episode.name : `Episode ${episode.episodeNumber}`}
                  </div>

                  <div className="flex items-center justify-between self-start">
                    {episode.airDate && (
                      <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500">
                        {new Date(episode.airDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="ml-auto">
                      <Rating voteAverage={episode.voteAverage} />
                    </div>
                  </div>
                </div>

                {hasOverview && (
                  <div className="p-2 row-start-2 col-span-full">
                    <div className="text-sm sm:text-base font-normal leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-6">
                      {episode.overview}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default memo(EpisodesList);
