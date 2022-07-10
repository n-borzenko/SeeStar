import type { FC } from "react";
import type { MovieCreditDetailed, ShowCreditDetailed } from "types/credit";
import { memo } from "react";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import PersonLandscapeCard from "components/cards/PersonLandscapeCard";
import BlockHeader from "components/common/BlockHeader";
import { getGenderAndDepartment } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type CreditSummaryProps<T extends MovieCreditDetailed | ShowCreditDetailed> = {
  credit: T;
};

const CreditSummary = <T extends MovieCreditDetailed | ShowCreditDetailed>({
  credit,
}: CreditSummaryProps<T>) => {
  const { person, media } = credit;
  return (
    <div>
      <BlockHeader title="Find out more" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <PersonLandscapeCard
          href={`/person/${person.id}`}
          posterPath={person.profilePath}
          title={person.name}
          infoText={getGenderAndDepartment(person.gender, person.knownForDepartment)}
          knownFor={person.knownFor}
        />
        <MediaLandscapeCard
          href={`/${credit.mediaType === MediaTypes.Movie ? "movie" : "show"}/${media.id}`}
          posterPath={media.posterPath}
          mediaType={credit.mediaType}
          title={credit.mediaType === MediaTypes.Movie ? credit.media.title : credit.media.name}
          startDate={
            credit.mediaType === MediaTypes.Movie
              ? credit.media.releaseDate
              : credit.media.firstAirDate
          }
          voteAverage={media.voteAverage}
          genreIds={media.genreIds}
          overview={media.overview}
        />
      </div>
    </div>
  );
};

export default memo(CreditSummary);
