import type { FC } from "react";
import type { ShowSeason } from "types/show/season";
import { memo, useMemo } from "react";
import Card from "components/common/Card";
import PosterImage from "components/common/PosterImage";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type SeasonListProps = {
  showId: number;
  seasons: ShowSeason[];
};

const sortSeasons = (a: ShowSeason, b: ShowSeason) => {
  const aTime = a.airDate ? new Date(a.airDate).getTime() : Number.MAX_SAFE_INTEGER;
  const bTime = b.airDate ? new Date(b.airDate).getTime() : Number.MAX_SAFE_INTEGER;
  return bTime - aTime;
};

const SeasonList: FC<SeasonListProps> = ({ seasons, showId }) => {
  const isExtraSmallScreen = useExtraSmallScreen();
  const sortedSeasons = useMemo(() => seasons.sort(sortSeasons), [seasons]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {sortedSeasons.map((season) => (
        <Card key={season.id} href={`/show/${showId}/season/${season.seasonNumber}`}>
          <div className="flex-shrink-0">
            {isExtraSmallScreen !== undefined && (
              <PosterImage
                src={season.posterPath}
                type={MediaTypes.Show}
                size={isExtraSmallScreen ? "smallPortrait" : "mediumPortrait"}
                rounded="left"
              />
            )}
          </div>

          <div className="w-full grid grid-rows-[auto_auto_auto_1fr] gap-1 sm:gap-2 p-2">
            <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 text-ellipsis overflow-hidden whitespace-nowrap">
              {season.name ? season.name : `Season ${season.seasonNumber}`}
            </div>

            {season.airDate && (
              <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500">
                {new Date(season.airDate).toLocaleDateString()}
              </div>
            )}

            <div className="self-end text-sm sm:text-base font-normal leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-2 sm:line-clamp-6">
              {season.overview}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default memo(SeasonList);
