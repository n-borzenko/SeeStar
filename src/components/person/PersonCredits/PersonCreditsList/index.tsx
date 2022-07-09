import type { FC } from "react";
import type {
  MovieCastCredit,
  MovieCrewCredit,
  ShowCastCredit,
  ShowCrewCredit,
} from "types/credit";
import qs from "qs";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import { getCharacterName } from "helpers/textUtilities";
import useCreditTypeParameter from "hooks/credit/useCreditTypeParameter";
import { CreditTypes } from "types/creditTypes";
import PersonCreditsSubList from "./PersonCreditsSubList";

type PersonCreditsListProps = {
  personId: number;
  credits: {
    cast: (MovieCastCredit | ShowCastCredit)[];
    crew: (MovieCrewCredit | ShowCrewCredit)[];
  };
};

const getCastJobDescription = (credit: MovieCastCredit | ShowCastCredit) => {
  return getCharacterName(credit.character);
};

const getCrewJobDescription = (credit: MovieCrewCredit | ShowCrewCredit) => {
  return `${credit.department}, ${credit.job}`;
};

const PersonCreditsList: FC<PersonCreditsListProps> = ({ credits, personId }) => {
  const creditType = useCreditTypeParameter();
  const links = useMemo(
    () =>
      Object.entries(CreditTypes).map(([key, value]) => ({
        id: value,
        title: key,
        href: `/person/${personId}/credits?${qs.stringify({ credit_type: value })}`,
      })),
    [personId]
  );

  return (
    <div className="grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credits">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={creditType} size="medium" wide />
        </div>
      </BlockHeader>
      {creditType === CreditTypes.Cast && (
        <>
          {credits.cast.length > 0 ? (
            <PersonCreditsSubList credits={credits.cast} getJobName={getCastJobDescription} />
          ) : (
            <EmptyState message={`No credits as a ${creditType} member found`} />
          )}
        </>
      )}
      {creditType === CreditTypes.Crew && (
        <>
          {credits.crew.length > 0 ? (
            <PersonCreditsSubList credits={credits.crew} getJobName={getCrewJobDescription} />
          ) : (
            <EmptyState message={`No credits as a ${creditType} member found`} />
          )}
        </>
      )}
    </div>
  );
};

export default memo(PersonCreditsList);
