import type { FC } from "react";
import type { MovieCreditDetailed, ShowCreditDetailed } from "types/credit";
import { memo } from "react";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import PersonLandscapeCard from "components/cards/PersonLandscapeCard";
import BlockHeader from "components/common/BlockHeader";
import { getGenderAndDepartment } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type CreditSummaryProps = {
  credit: MovieCreditDetailed | ShowCreditDetailed;
};

const CreditSummary: FC<CreditSummaryProps> = ({ credit }) => {
  const { person, media, mediaType } = credit;
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
          href={`/${mediaType === MediaTypes.Movie ? "movie" : "show"}/${media.id}`}
          posterPath={media.posterPath}
          mediaType={mediaType}
          title={mediaType === MediaTypes.Movie ? media.title : media.name}
          startDate={mediaType === MediaTypes.Movie ? media.releaseDate : media.firstAirDate}
          voteAverage={media.voteAverage}
          genreIds={media.genreIds}
          overview={media.overview}
        />
      </div>
    </div>
  );
};

export default memo(CreditSummary);
