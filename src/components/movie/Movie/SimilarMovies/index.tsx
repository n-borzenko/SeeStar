import type { FC } from "react";
import type { Movie } from "types/movie";
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

type SimilarMoviesProps = {
  movies: Movie[];
};

const posterSizeName = "mediumPortrait";

const SimilarMovies: FC<SimilarMoviesProps> = ({ movies }) => {
  const posterSize = getImageSize(posterSizeName);

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Similar movies" />
      <CardsList items={movies}>
        {(movie) => (
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

              <div className="w-full self-end">
                <GenresList ids={movie.genreIds} type={MediaTypes.Movie} />
              </div>
            </div>
          </Card>
        )}
      </CardsList>
    </div>
  );
};

export default memo(SimilarMovies);
