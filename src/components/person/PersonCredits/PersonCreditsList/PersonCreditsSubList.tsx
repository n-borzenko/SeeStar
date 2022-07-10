import type { AnyMediaCredit } from "types/credit";
import { memo, useMemo } from "react";
import CreditLandscapeCard from "components/cards/CreditLandscapeCard";
import PaginationContainer from "components/common/PaginationContainer";
import usePageParameter from "hooks/common/usePageParameter";
import { MediaTypes } from "types/mediaTypes";

type PersonCreditsSubListProps<T> = {
  credits: T[];
  getJobName: (credit: T) => string;
};

const sortCredits = (a: AnyMediaCredit, b: AnyMediaCredit) => {
  const aDate = a.mediaType === MediaTypes.Movie ? a.releaseDate : a.firstAirDate;
  const aTime = aDate ? new Date(aDate).getTime() : Number.MAX_SAFE_INTEGER;
  const bDate = b.mediaType === MediaTypes.Movie ? b.releaseDate : b.firstAirDate;
  const bTime = bDate ? new Date(bDate).getTime() : Number.MAX_SAFE_INTEGER;
  return bTime - aTime;
};

const getSortedCredits = <T extends AnyMediaCredit>(
  items: T[],
  getJobName: (credit: T) => string
) => {
  const groupedCredits = items.reduce<{ [key: number]: T[] }>((result, credit) => {
    return {
      ...result,
      [credit.id]: result[credit.id] ? [...result[credit.id], credit] : [credit],
    };
  }, {});

  return Object.values(groupedCredits)
    .sort((a, b) => sortCredits(a[0], b[0]))
    .map((group) => ({
      ...group[0],
      title: group[0].mediaType === MediaTypes.Movie ? group[0].title : group[0].name,
      startDate:
        group[0].mediaType === MediaTypes.Movie ? group[0].releaseDate : group[0].firstAirDate,
      jobs: group.map((credit) => ({
        job: getJobName(credit),
        creditId: credit.creditId,
        episodes: credit.mediaType === MediaTypes.Show ? credit.episodeCount : undefined,
      })),
    }));
};

const PersonCreditsSubList = <T extends AnyMediaCredit>({
  credits,
  getJobName,
}: PersonCreditsSubListProps<T>) => {
  const page = usePageParameter();
  const groupedCredits = useMemo(
    () => getSortedCredits(credits, getJobName),
    [credits, getJobName]
  );

  return (
    <PaginationContainer items={groupedCredits} page={page}>
      {(limitedCredits) => (
        <div className="w-full place-self-start grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {limitedCredits.map((item) => (
            <CreditLandscapeCard
              key={`${item.mediaType}-${item.creditId}`}
              href={`/${item.mediaType === MediaTypes.Movie ? "movie" : "show"}/${item.id}`}
              posterPath={item.posterPath}
              mediaType={item.mediaType}
              title={item.title}
              startDate={item.startDate}
              voteAverage={item.voteAverage}
              infoType="rating"
              jobs={item.jobs}
            />
          ))}
        </div>
      )}
    </PaginationContainer>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(PersonCreditsSubList) as typeof PersonCreditsSubList;
