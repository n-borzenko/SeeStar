import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import Rating from "components/common/Rating";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type EpisodeSummaryProps = {
  episode: ShowEpisodeExtended;
};

const posterSizeName = "largeLandscape";

const EpisodeSummary: FC<EpisodeSummaryProps> = ({ episode }) => {
  const posterSize = getImageSize(posterSizeName);
  const posterRatio = (posterSize.height / posterSize.width) * 100;

  return (
    <div
      className="md:grid md:gap-4 lg:gap-8"
      style={{ gridTemplateColumns: `${posterSize.width}px 1fr` }}
    >
      <div className="md:col-start-2 md:row-end-1 flex flex-col">
        <div>
          <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
            <Icon size="extra-large" type={MediaTypes.Show} ariaLabel="Type: show" />
          </div>
          <h1 className="inline text-3xl md:text-4xl font-black">
            {episode.seasonNumber ? `S${episode.seasonNumber}: ` : ""}
            {episode.name ? episode.name : `Episode ${episode.episodeNumber}`}
          </h1>
        </div>

        <div className="flex items-center mt-2 sm:mt-4">
          {episode.airDate && (
            <div className="text-xl font-normal text-neutral-500">
              {new Date(episode.airDate).toLocaleDateString()}
            </div>
          )}
          <div className="ml-auto flex">
            <Rating
              voteAverage={episode.voteAverage}
              voteCount={episode.voteCount}
              size="extra-large"
            />
          </div>
        </div>
      </div>

      <div className="md:col-start-1 md:col-end-1 my-2 sm:my-4 md:my-0 flex justify-center">
        <div
          className="w-full relative h-0 overflow-hidden"
          style={{
            paddingTop: `min(${posterRatio}%, ${posterSize.height}px)`,
            maxWidth: posterSize.width,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <PosterImage size={posterSizeName} type={MediaTypes.Show} src={episode.stillPath} />
          </div>
        </div>
      </div>

      <div className="md:col-span-full">
        {episode.overview && episode.overview.length > 0 && (
          <>
            <h5>Overview</h5>
            <p className="text-lg font-normal leading-6 text-neutral-700">{episode.overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(EpisodeSummary);
