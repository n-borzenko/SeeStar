import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import FullCreditList from "./FullCreditList";
import MovieDescription from "./MovieDescription";

type MovieCreditsProps = {
  movie: MovieExtended;
};

const MovieCredits: FC<MovieCreditsProps> = ({ movie }) => {
  return (
    <div className="min-h-full flex flex-col">
      <MovieDescription movie={movie} />
      <FullCreditList credits={movie.credits} movieId={movie.id} />
    </div>
  );
};

export default memo(MovieCredits);
