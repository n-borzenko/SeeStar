import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
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
      <div className="md:col-start-2 md:col-end-2 flex flex-col">
        <div>
          <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
            <Icon size="extra-large" type={MediaTypes.Show} ariaLabel="Type: show" />
          </div>
          <h1 className="inline text-3xl md:text-4xl font-black">
            {season.name ? season.name : `Season ${season.seasonNumber}`}
          </h1>
        </div>

        <div className="flex items-center mt-2 sm:mt-4">
          {season.airDate && (
            <div className="text-xl font-normal text-neutral-500">
              {new Date(season.airDate).toLocaleDateString()}
            </div>
          )}
          <div className="ml-auto flex">
            <div className="text-xl font-normal text-primary">
              {season.episodes.length &&
                `${season.episodes.length} episode${season.episodes.length === 1 ? "" : "s"}`}
            </div>
          </div>
        </div>
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
            <h5>Overview</h5>
            <p className="text-lg font-normal leading-6 text-neutral-700">{season.overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(SeasonSummary);
