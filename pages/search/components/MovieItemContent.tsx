import type { FC } from "react";
import type { SearchItemMovie } from "types/search";
import clsx from "clsx";
import { memo } from "react";
import Icon from "components/Icon";
import GenresList from "components/GenresList";
import PosterImage from "components/PosterImage";
import Rating from "components/Rating";
import { MediaTypes } from "types/mediaTypes";

type MovieItemContentProps = {
  item: SearchItemMovie;
  posterSize: "small" | "medium" | "large";
};

const mediaType = MediaTypes.Movie;

const MovieItemContent: FC<MovieItemContentProps> = ({ item, posterSize }) => {
  return (
    <div className="bg-white shadow-card rounded-lg flex">
      <div className="flex-shrink-0">
        <PosterImage src={item.posterPath} type={mediaType} size={posterSize} rounded="left" />
      </div>

      <div className="w-full grid grid-rows-[auto_auto_auto_1fr] gap-1 p-2">
        <div className="flex items-center min-w-1">
          <div className="flex-shrink-0">
            <Icon size="medium" type={mediaType} ariaLabel="Type: movie" />
          </div>
          <div className="text-base font-medium leading-5 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
            {item.title}
          </div>
        </div>

        <div className="flex items-center">
          {item.releaseDate && (
            <div className="text-sm font-normal leading-4 text-neutral-500">
              {new Date(item.releaseDate).toLocaleDateString()}
            </div>
          )}
          <div className="ml-auto flex">
            <Rating voteAverage={item.voteAverage} />
          </div>
        </div>

        <div className="w-full">
          <GenresList ids={item.genreIds} type={mediaType} />
        </div>

        <div
          className={clsx(
            "self-end text-sm font-normal leading-[1.15rem] text-neutral-700 line-clamp-3",
            {
              "line-clamp-4": !item.genreIds?.length,
            }
          )}
        >
          {item.overview}
        </div>
      </div>
    </div>
  );
};

export default memo(MovieItemContent);
