import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { getPluralizedName, getSeasonName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type SeasonSummaryProps = {
  season: ShowSeasonExtended;
};

const posterSizeName = "largePortrait";

const SeasonSummary: FC<SeasonSummaryProps> = ({ season }) => {
  const posterSize = getImageSize(posterSizeName);
  const posterRatio = (posterSize.height / posterSize.width) * 100;

  return (
    <div
      className="md:grid md:grid-rows-[auto_auto] md:gap-4 lg:gap-8"
      style={{ gridTemplateColumns: `${posterSize.width}px 1fr` }}
    >
      <div className="md:col-start-2 md:col-end-2">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={getSeasonName(season.name, season.seasonNumber)}
          startDate={season.airDate}
          infoType="text"
          infoText={getPluralizedName("episode", season.episodes.length)}
        />
      </div>

      <div className="md:col-start-1 md:col-end-1 md:row-span-full my-2 sm:my-4 md:my-0 flex justify-center">
        <div
          className="w-full relative h-0 overflow-hidden"
          style={{
            paddingTop: `min(${posterRatio}%, ${posterSize.height}px)`,
            maxWidth: posterSize.width,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <PosterImage size={posterSizeName} type={MediaTypes.Show} src={season.posterPath} />
          </div>
        </div>
      </div>

      <div className="md:col-start-2 md:col-end-2 self-end">
        {season.overview && season.overview.length > 0 && (
          <>
            <h5 className="mb-1 sm:mb-2">Overview</h5>
            <p className="text-lg font-normal leading-6 text-neutral-700">{season.overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(SeasonSummary);
