import type { FC } from "react";
import type { ShowEpisodeDetailed } from "types/show/episode";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import CardsList from "components/common/CardsList";
import PosterImage from "components/common/PosterImage";
import Rating from "components/common/Rating";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type EpisodesListProps = {
  showId: number;
  episodes: ShowEpisodeDetailed[];
};

const posterSizeName = "smallLandscape";

const EpisodesList: FC<EpisodesListProps> = ({ episodes, showId }) => {
  const seasonNumber = episodes[0]?.seasonNumber;
  const posterSize = getImageSize(posterSizeName);

  return (
    <div>
      <BlockHeader
        title="Episodes"
        href={
          seasonNumber !== undefined ? `/show/${showId}/season/${seasonNumber}/episodes` : undefined
        }
      />
      <CardsList items={episodes}>
        {(episode) => (
          <Card
            href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
            direction="vertical"
          >
            <div className="flex-shrink-0">
              <PosterImage
                src={episode.stillPath}
                type={MediaTypes.Show}
                size={posterSizeName}
                rounded="top"
              />
            </div>

            <div
              className="w-full grid grid-rows-[auto_1fr] gap-1 sm:gap-2 p-2 flex-grow"
              style={{ maxWidth: `${posterSize.width}px` }}
            >
              <div className="text-base font-medium leading-5 line-clamp-2">
                {episode.name ? episode.name : `Episode ${episode.episodeNumber}`}
              </div>

              <div className="flex items-center justify-between self-end">
                {episode.airDate && (
                  <div className="text-sm font-normal leading-4 text-neutral-500">
                    {new Date(episode.airDate).toLocaleDateString()}
                  </div>
                )}
                <div className="ml-auto">
                  <Rating voteAverage={episode.voteAverage} />
                </div>
              </div>
            </div>
          </Card>
        )}
      </CardsList>
    </div>
  );
};

export default memo(EpisodesList);
