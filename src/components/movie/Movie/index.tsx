import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import CreditsWidget from "components/widgets/CreditsWidget";
import MovieDetails from "./MovieDetails";
import MovieSummary from "./MovieSummary";
import SimilarMovies from "./SimilarMovies";

type MovieProps = {
  movie: MovieExtended;
};

const Movie: FC<MovieProps> = ({ movie }) => {
  return (
    <div>
      <MovieSummary movie={movie} />
      <MovieDetails movie={movie} />
      <CreditsWidget credits={movie.credits} href={`/movie/${movie.id}/credits`} />
      <SimilarMovies movies={movie.similar.results} />
    </div>
  );
};

export default memo(Movie);
