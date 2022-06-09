import type { FC } from "react";
import type { Movie } from "types/movie";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import PosterImage from "components/common/PosterImage";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const isExtraSmallScreen = useExtraSmallScreen();

  return (
    <Card href={`/movie/${movie.id}`}>
      <div className="w-full grid grid-cols-[auto_1fr]">
        <PosterImage
          src={movie.posterPath}
          type={MediaTypes.Movie}
          size={isExtraSmallScreen ? "smallPortrait" : "mediumPortrait"}
          rounded="left"
        />

        <div className="w-full grid grid-rows-[auto_1fr_auto] gap-1 sm:gap-2 p-2">
          <div className="flex items-center min-w-1">
            <div className="flex-shrink-0">
              <Icon size="medium" type={MediaTypes.Movie} ariaLabel="Type: movie" />
            </div>
            <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {movie.title}
            </div>
          </div>

          <div className="flex items-center justify-between self-start">
            {movie.releaseDate && (
              <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500">
                {new Date(movie.releaseDate).toLocaleDateString()}
              </div>
            )}
            <div className="ml-auto">
              <Rating voteAverage={movie.voteAverage} />
            </div>
          </div>

          {movie.overview && (
            <div className="text-sm sm:text-base font-normal leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-4">
              {movie.overview}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default memo(MovieCard);
