import type { FC } from "react";
import type { Show } from "types/show";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import CardsList from "components/common/CardsList";
import Icon from "components/common/Icon";
import GenresList from "components/common/GenresList";
import PosterImage from "components/common/PosterImage";
import Rating from "components/common/Rating";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type SimilarShowsProps = {
  shows: Show[];
};

const posterSizeName = "mediumPortrait";

const SimilarShows: FC<SimilarShowsProps> = ({ shows }) => {
  const posterSize = getImageSize(posterSizeName);

  if (!shows || shows.length === 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Similar shows" />
      <CardsList items={shows}>
        {(show) => (
          <Card href={`/show/${show.id}`} direction="vertical">
            <div className="flex-shrink-0">
              <PosterImage
                src={show.posterPath}
                type={MediaTypes.Show}
                size={posterSizeName}
                rounded="top"
              />
            </div>

            <div
              className="w-full h-full grid grid-rows-[auto_auto_1fr] gap-1 sm:gap-2 p-2"
              style={{ maxWidth: `${posterSize.width}px` }}
            >
              <div className="line-clamp-2">
                <div className="inline-block">
                  <Icon size="medium" type={MediaTypes.Show} ariaLabel="Type: show" />
                </div>
                <span className="text-base font-medium leading-5 ml-1">{show.name}</span>
              </div>

              <div className="flex items-center justify-between">
                {show.firstAirDate && (
                  <p className="text-sm font-normal leading-4 text-neutral-500">
                    {new Date(show.firstAirDate).toLocaleDateString()}
                  </p>
                )}
                <div className="ml-auto">
                  <Rating voteAverage={show.voteAverage} />
                </div>
              </div>

              <div className="w-full self-end">
                <GenresList ids={show.genreIds} type={MediaTypes.Show} />
              </div>
            </div>
          </Card>
        )}
      </CardsList>
    </div>
  );
};

export default memo(SimilarShows);
