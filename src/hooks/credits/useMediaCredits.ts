import type { CastMember, CrewMember, UniversalCreditDescription } from "types/credit";
import { useMemo } from "react";
import { getCharacterName } from "helpers/textUtilities";
import { sortMemberCredits, getTopUniqueCredits } from "helpers/getTopUniqueCredits";
import { MediaTypes } from "types/mediaTypes";

const getCreditDescription = <T extends CastMember | CrewMember>(
  credit: T,
  getJob: (credit: T) => string
) => {
  return {
    id: credit.creditId,
    href: `/person/${credit.id}`,
    posterPath: credit.profilePath,
    title: credit.name,
    mediaType: MediaTypes.Person,
    job: getJob(credit),
  } as UniversalCreditDescription;
};

const getCastJobDescription = (credit: CastMember) => {
  return getCharacterName(credit.character);
};

const getCrewJobDescription = (credit: CrewMember) => {
  return `${credit.department}, ${credit.job}`;
};

const useAggregatedMediaCredits = (mediaCredits: { cast: CastMember[]; crew: CrewMember[] }) => {
  const credits = useMemo(
    () => ({
      cast: getTopUniqueCredits(mediaCredits.cast).map((item) =>
        getCreditDescription(item, getCastJobDescription)
      ),
      crew: getTopUniqueCredits(mediaCredits.crew, sortMemberCredits).map((item) =>
        getCreditDescription(item, getCrewJobDescription)
      ),
    }),
    [mediaCredits]
  );

  return credits;
};

export default useAggregatedMediaCredits;
