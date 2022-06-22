import type { FC } from "react";
import type { CrewMember, AggregatedCrewMember } from "types/credit";
import { memo, useMemo } from "react";
import EmptyState from "components/common/EmptyState";
import CrewMembersGroup from "./CrewMembersGroup";

type CrewMembersListProps = {
  credits: (CrewMember | AggregatedCrewMember)[];
};

const groupCredits = (credits: (CrewMember | AggregatedCrewMember)[]) => {
  const groupedCredits = credits.reduce<{ [key: string]: (CrewMember | AggregatedCrewMember)[] }>(
    (result, credit) => {
      const key = credit.department || "Unknown department";
      return {
        ...result,
        [key]: result[key] ? [...result[key], credit] : [credit],
      };
    },
    {}
  );

  return {
    keys: Object.keys(groupedCredits).sort((a, b) => a.localeCompare(b, "en")),
    groupedCredits,
  };
};

const CrewMembersList: FC<CrewMembersListProps> = ({ credits }) => {
  const { keys, groupedCredits } = useMemo(() => groupCredits(credits), [credits]);

  return (
    <div>
      {keys.length > 0 ? (
        keys.map((key) => (
          <CrewMembersGroup key={key} credits={groupedCredits[key]} groupTitle={key} />
        ))
      ) : (
        <EmptyState message={`No credits found`} />
      )}
    </div>
  );
};

export default memo(CrewMembersList);
