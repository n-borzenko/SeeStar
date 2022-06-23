import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import PosterImage from "components/common/PosterImage";
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
      <div className="md:col-start-2 md:row-end-1">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={
            (episode.seasonNumber ? `S${episode.seasonNumber}: ` : "") +
            (episode.name ? episode.name : `Episode ${episode.episodeNumber}`)
          }
          startDate={episode.airDate}
          voteAverage={episode.voteAverage}
          voteCount={episode.voteCount}
          infoType="rating"
        />
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
            <h5 className="mb-1 sm:mb-2">Overview</h5>
            <p className="text-lg font-normal leading-6 text-neutral-700">{episode.overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(EpisodeSummary);
