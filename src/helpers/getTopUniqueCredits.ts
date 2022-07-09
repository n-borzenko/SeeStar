import type { AnyCredit, AnyMediaCredit } from "types/credit";
import type { CastMember, CrewMember } from "types/credit";
import type { AggregatedCastMember, AggregatedCrewMember } from "types/credit";
import { listLengthLimit } from "components/common/CardsList";
import { MediaTypes } from "types/mediaTypes";

// Sort Person credits
export const sortMediaCredits = (a: AnyMediaCredit, b: AnyMediaCredit) => {
  if (a.mediaType === MediaTypes.Show && b.mediaType === MediaTypes.Show) {
    const result = (b.episodeCount || 0) - (a.episodeCount || 0);
    if (result !== 0) {
      return result;
    }
  }
  return (b.popularity || 0) - (a.popularity || 0);
};

// Sort Movie or Show Episode credits
export const sortMemberCredits = <T extends CastMember | CrewMember>(a: T, b: T) => {
  return (b.popularity || 0) - (a.popularity || 0);
};

// Sort Show or Show Season credits
export const sortAggregatedMemberCredits = <T extends AggregatedCastMember | AggregatedCrewMember>(
  a: T,
  b: T
) => {
  const episodesDifference = (b.totalEpisodeCount || 0) - (a.totalEpisodeCount || 0);
  return episodesDifference !== 0 ? episodesDifference : (b.popularity || 0) - (a.popularity || 0);
};

// Remove extra roles for AggregatedCastMember
export const leaveSingleRole = (credit: AggregatedCastMember) => {
  if (credit.roles.length <= 1) {
    return credit;
  }
  const sortedRoles = credit.roles.sort((a, b) => (b.episodeCount || 0) - (a.episodeCount || 0));
  return {
    ...credit,
    roles: sortedRoles.slice(0, 1),
  };
};

// Remove extra jobs for AggregatedCrewMember
export const leaveSingleJob = (credit: AggregatedCrewMember) => {
  if (credit.jobs.length <= 1) {
    return credit;
  }
  const sortedJobs = credit.jobs.sort((a, b) => (b.episodeCount || 0) - (a.episodeCount || 0));
  return {
    ...credit,
    jobs: sortedJobs.slice(0, 1),
  };
};

export const getTopUniqueCredits = <T extends AnyCredit>(
  items: T[],
  preSortItems?: (a: T, b: T) => number,
  postProcessCredit?: (credit: T) => T
) => {
  const processedItems = preSortItems ? items.sort(preSortItems) : items;
  return processedItems.reduce<T[]>((result, credit) => {
    if (
      result.length >= listLengthLimit ||
      result.findIndex((item) => item.id === credit.id) !== -1
    ) {
      return result;
    }
    return [...result, postProcessCredit ? postProcessCredit(credit) : credit];
  }, []);
};
