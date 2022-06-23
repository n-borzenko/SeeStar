import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type MovieCreditsProps = {
  movie: MovieExtended;
};

const MovieCredits: FC<MovieCreditsProps> = ({ movie }) => {
  return (
    <div className="min-h-full flex flex-col">
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
  );
};

export default memo(MovieCredits);
