import type { FC } from "react";
import type { CrewMember } from "types/credit";
import Link from "next/link";
import { memo, useMemo } from "react";
import EmptyState from "components/common/EmptyState";
import CrewCreditGroup from "./CrewCreditGroup";

type CrewCreditListProps = {
  credits: CrewMember[];
};

const sortCredits = (a: CrewMember, b: CrewMember) => {
  const jobComparison = (a.job || "").localeCompare(b.job || "", "en");
  return jobComparison !== 0 ? jobComparison : (a.name || "").localeCompare(b.name || "", "en");
};

const groupCredits = (credits: CrewMember[]) => {
  const unsortedCredits = credits.reduce<{ [key: string]: CrewMember[] }>((result, credit) => {
    const key = credit.department || "Unknown department";
    return {
      ...result,
      [key]: result[key] ? [...result[key], credit] : [credit],
    };
  }, {});

  const groupedCredits = Object.keys(unsortedCredits).reduce<{ [key: string]: CrewMember[] }>(
    (result, key) => ({ ...result, [key]: unsortedCredits[key].sort(sortCredits) }),
    {}
  );

  return {
    keys: Object.keys(groupedCredits).sort((a, b) => a.localeCompare(b, "en")),
    groupedCredits,
  };
};

const CrewCreditList: FC<CrewCreditListProps> = ({ credits }) => {
  const { keys, groupedCredits } = useMemo(() => groupCredits(credits), [credits]);

  return (
    <div>
      {keys.length > 0 ? (
        keys.map((key) => (
          <CrewCreditGroup key={key} credits={groupedCredits[key]} groupTitle={key} />
        ))
      ) : (
        <EmptyState message={`No credits found`} />
      )}
    </div>
  );
};

export default memo(CrewCreditList);
