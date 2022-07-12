import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import TitledPageContainer from "components/common/TitledPageContainer";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type MovieCreditsProps = {
  movie: MovieExtended;
};

const MovieCredits: FC<MovieCreditsProps> = ({ movie }) => {
  return (
    <TitledPageContainer title={`SeeStar • Movie credits • ${movie.title}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Movie}
          title={movie.title}
          startDate={movie.releaseDate}
          voteAverage={movie.voteAverage}
          voteCount={movie.voteCount}
          infoType="rating"
        />
        <CreditMembersList credits={movie.credits} href={`/movie/${movie.id}/credits`} />
      </div>
    </TitledPageContainer>
  );
};

export default memo(MovieCredits);
