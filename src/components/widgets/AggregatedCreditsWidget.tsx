import type { FC } from "react";
import type { AggregatedCastMember, AggregatedCrewMember } from "types/credit";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import CardsList, { listLengthLimit } from "components/common/CardsList";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import { MediaTypes } from "types/mediaTypes";

type AggregatedCreditsWidgetProps = {
  credits: {
    cast: AggregatedCastMember[];
    crew: AggregatedCrewMember[];
  };
  href: string;
};

const sortCredits = <T extends AggregatedCastMember | AggregatedCrewMember>(a: T, b: T) => {
  const episodesDifference = (b.totalEpisodeCount || 0) - (a.totalEpisodeCount || 0);
  return episodesDifference !== 0 ? episodesDifference : (b.popularity || 0) - (a.popularity || 0);
};

const leaveSingleRole = (credit: AggregatedCastMember) => {
  if (credit.roles.length <= 1) {
    return credit;
  }
  const sortedRoles = credit.roles.sort((a, b) => (b.episodeCount || 0) - (a.episodeCount || 0));
  return {
    ...credit,
    roles: sortedRoles.slice(0, 1),
  };
};

const leaveSingleJob = (credit: AggregatedCrewMember) => {
  if (credit.jobs.length <= 1) {
    return credit;
  }
  const sortedJobs = credit.jobs.sort((a, b) => (b.episodeCount || 0) - (a.episodeCount || 0));
  return {
    ...credit,
    jobs: sortedJobs.slice(0, 1),
  };
};

const getTopUniqueCredits = <T extends AggregatedCastMember | AggregatedCrewMember>(
  items: T[],
  updateCreditJobList: (credit: T) => T
) => {
  return items.reduce<T[]>((result, credit) => {
    if (
      result.length >= listLengthLimit ||
      result.findIndex((item) => item.id === credit.id) !== -1
    ) {
      return result;
    }
    return [...result, updateCreditJobList(credit)];
  }, []);
};

const AggregatedCreditsWidget: FC<AggregatedCreditsWidgetProps> = ({ credits, href }) => {
  const items = useMemo(
    () => ({
      cast: getTopUniqueCredits(credits.cast, leaveSingleRole),
      crew: getTopUniqueCredits(credits.crew.sort(sortCredits), leaveSingleJob),
    }),
    [credits]
  );

  if (items.cast.length === 0 && items.crew.length === 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Top credits" href={href} />
      {items.cast.length > 0 && (
        <>
          <h6 className="lg:mb-4 text-primary">Cast</h6>
          <CardsList items={items.cast}>
            {(credit) => (
              <MediumPortraitCard
                href={`/person/${credit.id}`}
                posterPath={credit.profilePath}
                title={credit.name}
                mediaType={MediaTypes.Person}
                job={credit.roles[0].character || "Unknown character"}
              />
            )}
          </CardsList>
        </>
      )}
      {items.crew.length > 0 && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">Crew</h6>
          <CardsList items={items.crew}>
            {(credit) => (
              <MediumPortraitCard
                href={`/person/${credit.id}`}
                posterPath={credit.profilePath}
                title={credit.name}
                mediaType={MediaTypes.Person}
                job={`${credit.department}, ${credit.jobs[0].job}`}
              />
            )}
          </CardsList>
        </>
      )}
    </div>
  );
};

export default memo(AggregatedCreditsWidget);
