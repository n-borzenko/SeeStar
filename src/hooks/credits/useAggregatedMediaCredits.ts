import type {
  AggregatedCastMember,
  AggregatedCrewMember,
  UniversalCreditDescription,
} from "types/credit";
import { useMemo } from "react";
import { getCharacterName } from "helpers/textUtilities";
import {
  sortAggregatedMemberCredits,
  leaveSingleJob,
  leaveSingleRole,
  getTopUniqueCredits,
} from "helpers/getTopUniqueCredits";
import { MediaTypes } from "types/mediaTypes";

const getCastDescription = (credit: AggregatedCastMember) => {
  return {
    id: credit.roles[0].creditId,
    href: `/person/${credit.id}`,
    posterPath: credit.profilePath,
    title: credit.name,
    mediaType: MediaTypes.Person,
    job: getCharacterName(credit.roles[0].character),
  } as UniversalCreditDescription;
};

const getCrewDescription = (credit: AggregatedCrewMember) => {
  return {
    id: credit.jobs[0].creditId,
    href: `/person/${credit.id}`,
    posterPath: credit.profilePath,
    title: credit.name,
    mediaType: MediaTypes.Person,
    job: `${credit.department}, ${credit.jobs[0].job}`,
  } as UniversalCreditDescription;
};

const useAggregatedMediaCredits = (aggregateCredits: {
  cast: AggregatedCastMember[];
  crew: AggregatedCrewMember[];
}) => {
  const credits = useMemo(
    () => ({
      cast: getTopUniqueCredits(aggregateCredits.cast, undefined, leaveSingleRole).map(
        getCastDescription
      ),
      crew: getTopUniqueCredits(
        aggregateCredits.crew,
        sortAggregatedMemberCredits,
        leaveSingleJob
      ).map(getCrewDescription),
    }),
    [aggregateCredits]
  );

  return credits;
};

export default useAggregatedMediaCredits;
