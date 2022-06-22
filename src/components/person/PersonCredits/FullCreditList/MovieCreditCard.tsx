import type { FC, PropsWithChildren } from "react";
import type { MovieCastCredit, MovieCrewCredit } from "types/credit";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import PosterImage from "components/common/PosterImage";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type MovieCreditCardProps = {
  movie: MovieCastCredit | MovieCrewCredit;
};

const MovieCreditCard: FC<PropsWithChildren<MovieCreditCardProps>> = ({ movie, children }) => {
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

        <div className="w-full grid grid-rows-[auto_1fr] gap-1 sm:gap-2 p-2">
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

          <div className="text-sm sm:text-base font-normal italic leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-3 sm:line-clamp-5">
            {children}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(MovieCreditCard);
