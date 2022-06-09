import type { FC, PropsWithChildren } from "react";
import type { MovieCastCredit, MovieCrewCredit } from "types/credit";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type MovieCreditCardProps = {
  movie: MovieCastCredit | MovieCrewCredit;
};

const posterSizeName = "mediumPortrait";

const MovieCreditCard: FC<PropsWithChildren<MovieCreditCardProps>> = ({ movie, children }) => {
  const posterSize = getImageSize(posterSizeName);

  return (
    <Card href={`/movie/${movie.id}`} direction="vertical">
      <div className="flex-shrink-0">
        <PosterImage
          src={movie.posterPath}
          type={MediaTypes.Movie}
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
            <Icon size="medium" type={MediaTypes.Movie} ariaLabel="Type: movie" />
          </div>
          <span className="text-base font-medium leading-5 ml-1">{movie.title}</span>
        </div>

        <div className="flex items-center justify-between">
          {movie.releaseDate && (
            <p className="text-sm font-normal leading-4 text-neutral-500">
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
          )}
          <div className="ml-auto">
            <Rating voteAverage={movie.voteAverage} />
          </div>
        </div>

        {children && (
          <p className="text-sm font-normal italic leading-4 line-clamp-2 text-neutral-700 self-end">
            {children}
          </p>
        )}
      </div>
    </Card>
  );
};

export default memo(MovieCreditCard);
