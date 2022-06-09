import type { FC } from "react";
import type { PersonExtended } from "types/person";
import Link from "next/link";
import qs from "qs";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import EmptyState from "components/common/EmptyState";
import LinkGroup from "components/common/LinkGroup";
import useCreditTypeParameter from "hooks/credit/useCreditTypeParameter";
import { CreditTypes } from "types/creditTypes";
import CreditList from "./CreditList";

type FullCreditListProps = {
  personId: number;
  credits: PersonExtended["combinedCredits"];
};

const FullCreditList: FC<FullCreditListProps> = ({ credits, personId }) => {
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
    <div className="grow grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credits">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={creditType} size="medium" wide />
        </div>
      </BlockHeader>
      {creditType === CreditTypes.Cast && (
        <>
          {credits.cast.length > 0 ? (
            <CreditList credits={credits.cast}>
              {(item) => (
                <Link href={`/credit/${item.creditId}`}>
                  <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                    {item.character && item.character.length > 0
                      ? item.character
                      : "Unknown character"}
                  </a>
                </Link>
              )}
            </CreditList>
          ) : (
            <EmptyState message={`No credits as a ${creditType} member found`} />
          )}
        </>
      )}
      {creditType === CreditTypes.Crew && (
        <>
          {credits.crew.length > 0 ? (
            <CreditList credits={credits.crew}>
              {(item) => (
                <Link href={`/credit/${item.creditId}`}>
                  <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                    {item.department}, {item.job}
                  </a>
                </Link>
              )}
            </CreditList>
          ) : (
            <EmptyState message={`No credits as a ${creditType} member found`} />
          )}
        </>
      )}
    </div>
  );
};

export default memo(FullCreditList);
