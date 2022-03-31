import type { FC } from "react";
import type { ShowSeason } from "types/show/season";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import CardsList from "components/common/CardsList";
import PosterImage from "components/common/PosterImage";
import { MediaTypes } from "types/mediaTypes";

type SeasonsListProps = {
  showId: number;
  seasons: ShowSeason[];
};

const SeasonsList: FC<SeasonsListProps> = ({ seasons, showId }) => {
  return (
    <div>
      <BlockHeader title="Seasons" href={`/show/${showId}/seasons`} />
      <CardsList items={seasons}>
        {(season) => (
          <Card href={`/show/${showId}/season/${season.seasonNumber}`} direction="vertical">
            <div className="flex-shrink-0">
              <PosterImage
                src={season.posterPath}
                type={MediaTypes.Show}
                size="medium"
                rounded="top"
              />
            </div>

            <div className="w-full grid grid-rows-[auto_1fr] gap-1 sm:gap-2 p-2">
              <div className="text-base font-medium leading-5 line-clamp-2">
                {season.name ? season.name : `Season ${season.seasonNumber}`}
              </div>

              <div className="flex items-center justify-between">
                {season.airDate && (
                  <div className="text-sm font-normal leading-4 text-neutral-500">
                    {new Date(season.airDate).toLocaleDateString()}
                  </div>
                )}
                <div className="text-sm font-normal leading-4 text-primary">
                  {season.episodeCount && `${season.episodeCount} ep.`}
                </div>
              </div>
            </div>
          </Card>
        )}
      </CardsList>
    </div>
  );
};

export default memo(SeasonsList);
