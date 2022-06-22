import type { FC } from "react";
import type { CastMember, AggregatedCastMember } from "types/credit";
import Link from "next/link";
import { memo } from "react";
import SmallLandscapePersonCard from "components/cards/person/SmallLandscapePersonCard";
import EmptyState from "components/common/EmptyState";

type CastMembersListProps = {
  credits: (CastMember | AggregatedCastMember)[];
};

const isCastMember = (value: CastMember | AggregatedCastMember): value is CastMember => {
  return "creditId" in value;
};

const getCharacterName = (character?: string) => {
  return character && character.length > 0 ? character : "Unknown character";
};

const CastMembersList: FC<CastMembersListProps> = ({ credits }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {credits.length > 0 ? (
        credits.map((credit) => (
          <SmallLandscapePersonCard person={credit} key={credit.id}>
            {isCastMember(credit) ? (
              <Link href={`/credit/${credit.creditId}`}>
                <a className="link text-ellipsis overflow-hidden whitespace-nowrap">
                  {getCharacterName(credit.character)}
                </a>
              </Link>
            ) : (
              credit.roles.map((role, index) => (
                <div key={role.creditId} className="inline-flex items-baseline max-w-full">
                  <Link href={`/credit/${role.creditId}`}>
                    <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                      {getCharacterName(role.character)}
                    </a>
                  </Link>
                  <span className="shrink-0">[{role.episodeCount} ep.]</span>
                  {index < credit.roles.length - 1 && <span className="mr-2">,</span>}
                </div>
              ))
            )}
          </SmallLandscapePersonCard>
        ))
      ) : (
        <EmptyState message={`No credits found`} />
      )}
    </div>
  );
};

export default memo(CastMembersList);
