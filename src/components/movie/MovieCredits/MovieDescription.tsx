import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import { MediaTypes } from "types/mediaTypes";

type MovieDescriptionProps = {
  movie: MovieExtended;
};

const MovieDescription: FC<MovieDescriptionProps> = ({ movie }) => {
  return (
    <div>
      <div>
        <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
          <Icon size="extra-large" type={MediaTypes.Movie} ariaLabel="Type: movie" />
        </div>
        <h1 className="inline text-3xl md:text-4xl font-black">{movie.title}</h1>
      </div>
      <div className="flex items-center mt-2 sm:mt-4">
        {movie.releaseDate && (
          <div className="text-xl font-normal text-neutral-500">
            {new Date(movie.releaseDate).toLocaleDateString()}
          </div>
        )}
        <div className="ml-auto flex">
          <Rating voteAverage={movie.voteAverage} voteCount={movie.voteCount} size="extra-large" />
        </div>
      </div>
    </div>
  );
};

export default memo(MovieDescription);
