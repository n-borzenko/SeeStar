import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
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
    </div>
  );
};

export default memo(Movie);
