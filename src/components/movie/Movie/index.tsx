import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import Block from "components/common/Block";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import CreditsWidget from "components/widgets/CreditsWidget";
import { MediaTypes } from "types/mediaTypes";
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
      <CreditsWidget credits={movie.credits} href={`/movie/${movie.id}/credits`} />
      <Block
        hidingCondition={
          !movie.recommendations.results || movie.recommendations.results.length === 0
        }
      >
        <BlockHeader title="Recommendations" />
        <CardsList items={movie.recommendations.results}>
          {(item) => (
            <MediumPortraitCard
              href={`/movie/${item.id}`}
              posterPath={item.posterPath}
              title={item.title}
              startDate={item.releaseDate}
              voteAverage={item.voteAverage}
              infoType="rating"
              genreIds={item.genreIds}
              mediaType={MediaTypes.Movie}
            />
          )}
        </CardsList>
      </Block>
    </div>
  );
};

export default memo(Movie);
