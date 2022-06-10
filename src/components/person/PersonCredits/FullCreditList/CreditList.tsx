import type { ReactNode } from "react";
import type { AnyCredit } from "types/credit";
import { memo, Fragment, useMemo } from "react";
import { MediaTypes } from "types/mediaTypes";
import MovieCreditCard from "./MovieCreditCard";
import ShowCreditCard from "./ShowCreditCard";

type CreditListProps<T> = {
  credits: T[];
  children: (item: T) => ReactNode;
};

const sortCredits = (a: AnyCredit, b: AnyCredit) => {
  const aDate = a.mediaType === MediaTypes.Movie ? a.releaseDate : a.firstAirDate;
  const aTime = aDate ? new Date(aDate).getTime() : Number.MAX_SAFE_INTEGER;
  const bDate = b.mediaType === MediaTypes.Movie ? b.releaseDate : b.firstAirDate;
  const bTime = bDate ? new Date(bDate).getTime() : Number.MAX_SAFE_INTEGER;
  return bTime - aTime;
};

const getSortedCredits = <T extends AnyCredit>(items: T[]) => {
  const groupedCredits = items.reduce<{ [key: number]: T[] }>((result, credit) => {
    return {
      ...result,
      [credit.id]: result[credit.id] ? [...result[credit.id], credit] : [credit],
    };
  }, {});
  return Object.values(groupedCredits).sort((a, b) => sortCredits(a[0], b[0]));
};

const CreditList = <T extends AnyCredit>({ credits, children }: CreditListProps<T>) => {
  const creditGroups = useMemo(() => getSortedCredits(credits), [credits]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {creditGroups.map((group) => {
        const item = group[0];
        return (
          <Fragment key={`${item.mediaType}-${item.creditId}`}>
            {item.mediaType === MediaTypes.Movie && (
              <MovieCreditCard movie={item}>
                {group.map((credit) => (
                  <div key={credit.creditId}>{children(credit)}</div>
                ))}
              </MovieCreditCard>
            )}
            {item.mediaType === MediaTypes.Show && (
              <ShowCreditCard show={item}>
                {group.map((credit) => (
                  <div key={credit.creditId} className="flex">
                    {children(credit)}
                    {credit.mediaType === MediaTypes.Show && (
                      <span className="ml-auto shrink-0">{credit.episodeCount} ep.</span>
                    )}
                  </div>
                ))}
              </ShowCreditCard>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(CreditList) as typeof CreditList;
