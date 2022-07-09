import type { FC } from "react";
import type { CastMember, AggregatedCastMember } from "types/credit";
import { memo } from "react";
import CreditLandscapeCard from "components/cards/CreditLandscapeCard";
import EmptyState from "components/common/EmptyState";
import { getCharacterName, getGenderAndDepartment } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type CastMembersListProps = {
  credits: (CastMember | AggregatedCastMember)[];
};

const isCastMember = (value: CastMember | AggregatedCastMember): value is CastMember => {
  return "creditId" in value;
};

const CastMembersList: FC<CastMembersListProps> = ({ credits }) => {
  return (
    <div className="w-full place-self-start grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {credits.length > 0 ? (
        credits.map((item) => {
          const jobs = isCastMember(item)
            ? [{ job: getCharacterName(item.character), creditId: item.creditId }]
            : item.roles.map((role) => ({
                job: getCharacterName(role.character),
                creditId: role.creditId,
                episodes: role.episodeCount,
              }));

          return (
            <CreditLandscapeCard
              key={isCastMember(item) ? item.creditId : item.id}
              href={`/person/${item.id}`}
              cardSize="small"
              posterPath={item.profilePath}
              mediaType={MediaTypes.Person}
              title={item.name}
              infoType="text"
              infoText={getGenderAndDepartment(item.gender, item.knownForDepartment)}
              jobs={jobs}
            />
          );
        })
      ) : (
        <EmptyState message={`No credits found`} />
      )}
    </div>
  );
};

export default memo(CastMembersList);
