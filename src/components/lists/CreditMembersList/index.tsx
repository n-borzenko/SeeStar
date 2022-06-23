import type { FC } from "react";
import type {
  CastMember,
  CrewMember,
  AggregatedCastMember,
  AggregatedCrewMember,
} from "types/credit";
import qs from "qs";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import LinkGroup from "components/common/LinkGroup";
import useCreditTypeParameter from "hooks/credit/useCreditTypeParameter";
import { CreditTypes } from "types/creditTypes";
import CastMembersList from "./CastMembersList";
import CrewMembersList from "./CrewMembersList";

type CreditMembersListProps = {
  href: string;
  credits:
    | {
        cast: CastMember[];
        crew: CrewMember[];
      }
    | {
        cast: AggregatedCastMember[];
        crew: AggregatedCrewMember[];
      };
};

const CreditMembersList: FC<CreditMembersListProps> = ({ credits, href }) => {
  const creditType = useCreditTypeParameter();
  const links = useMemo(
    () =>
      Object.entries(CreditTypes).map(([key, value]) => ({
        id: value,
        title: key,
        href: `${href}?${qs.stringify({ credit_type: value })}`,
      })),
    [href]
  );

  return (
    <div className="grow grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credits">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={creditType} size="medium" wide />
        </div>
      </BlockHeader>
      {creditType === CreditTypes.Cast && <CastMembersList credits={credits.cast} />}
      {creditType === CreditTypes.Crew && <CrewMembersList credits={credits.crew} />}
    </div>
  );
};

export default memo(CreditMembersList);
