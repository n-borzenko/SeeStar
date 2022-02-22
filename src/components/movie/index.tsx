import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import MovieMainInfo from "./MovieMainInfo";
import MovieSummary from "./MovieSummary";

type MovieProps = {
  movie: MovieExtended;
};

const Movie: FC<MovieProps> = ({ movie }) => {
  return (
    <div>
      <MovieSummary movie={movie} />
      <MovieMainInfo movie={movie} />
    </div>
  );
};

export default memo(Movie);
