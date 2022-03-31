import type { FC } from "react";
import type { ShowSeason } from "types/show/season";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import PosterImage from "components/common/PosterImage";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type SeasonsListProps = {
  showId: number;
  seasons: ShowSeason[];
};

const SeasonsList: FC<SeasonsListProps> = ({ seasons, showId }) => {
  const isExtraSmallScreen = useExtraSmallScreen();

  return (
    <div>
      <BlockHeader title="Seasons" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {seasons.map((season) => (
          <Card key={season.id} href={`/show/${showId}/season/${season.seasonNumber}`}>
            <div className="flex-shrink-0">
              {isExtraSmallScreen !== undefined && (
                <PosterImage
                  src={season.posterPath}
                  type={MediaTypes.Show}
                  size={isExtraSmallScreen ? "small" : "medium"}
                  rounded="left"
                />
              )}
            </div>

            <div className="w-full grid grid-rows-[auto_auto_auto_1fr] gap-1 sm:gap-2 p-2">
              <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
                {season.name ? season.name : `Season ${season.seasonNumber}`}
              </div>

              <div className="flex items-center justify-between">
                {season.airDate && (
                  <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500">
                    {new Date(season.airDate).toLocaleDateString()}
                  </div>
                )}
                <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-primary">
                  {season.episodeCount &&
                    `${season.episodeCount} episode${season.episodeCount === 1 ? "" : "s"}`}
                </div>
              </div>

              <div className="self-end text-sm sm:text-base font-normal leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-2 sm:line-clamp-6">
                {season.overview}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(SeasonsList);
