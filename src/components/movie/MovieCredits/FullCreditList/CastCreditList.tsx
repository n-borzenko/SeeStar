import type { FC } from "react";
import type { CastMember } from "types/credit";
import Link from "next/link";
import { memo, useMemo } from "react";
import EmptyState from "components/common/EmptyState";
import PersonCard from "./PersonCard";

type CastCreditListProps = {
  credits: CastMember[];
};

const sortCredits = (a: CastMember, b: CastMember) => {
  const orderDifference = (a.order || 0) - (b.order || 0);
  return orderDifference !== 0 ? orderDifference : (b.popularity || 0) - (a.popularity || 0);
};

const CastCreditList: FC<CastCreditListProps> = ({ credits }) => {
  const sortedCredits = useMemo(() => credits.sort(sortCredits), [credits]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {sortedCredits.length > 0 ? (
        sortedCredits.map((credit) => (
          <PersonCard person={credit} key={credit.creditId}>
            <Link href={`/credit/${credit.creditId}`}>
              <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                {credit.character && credit.character.length > 0
                  ? credit.character
                  : "Unknown character"}
              </a>
            </Link>
          </PersonCard>
        ))
      ) : (
        <EmptyState message={`No credits found`} />
      )}
    </div>
  );
};

export default memo(CastCreditList);
