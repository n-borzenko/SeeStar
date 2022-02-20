import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import { MediaTypes } from "types/mediaTypes";

type MovieProps = {
  movie: MovieExtended;
};

const Movie: FC<MovieProps> = ({ movie }) => {
  return <div className="grid grid-cols-2 grid-rows-20-auto -mb-4 lg:-mb-8">{movie.title}</div>;
};

export default memo(Movie);
