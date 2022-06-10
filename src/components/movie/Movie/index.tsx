import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";
import MovieSummary from "./MovieSummary";

type MovieProps = {
  movie: MovieExtended;
};

const Movie: FC<MovieProps> = ({ movie }) => {
  return (
    <div>
      <MovieSummary movie={movie} />
      <MovieDetails movie={movie} />
      <MovieCredits credits={movie.credits} href={`/movie/${movie.id}/credits`} />
    </div>
  );
};

export default memo(Movie);
