import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import qs from "qs";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import LinkGroup from "components/common/LinkGroup";
import useCreditTypeParameter from "hooks/credit/useCreditTypeParameter";
import { CreditTypes } from "types/creditTypes";
import CastCreditList from "./CastCreditList";
import CrewCreditList from "./CrewCreditList";

type FullCreditListProps = {
  movieId: number;
  credits: MovieExtended["credits"];
};

const FullCreditList: FC<FullCreditListProps> = ({ credits, movieId }) => {
  const creditType = useCreditTypeParameter();
  const links = useMemo(
    () =>
      Object.entries(CreditTypes).map(([key, value]) => ({
        id: value,
        title: key,
        href: `/movie/${movieId}/credits?${qs.stringify({ credit_type: value })}`,
      })),
    [movieId]
  );

  return (
    <div className="grow grid grid-rows-[auto_1fr]">
      <BlockHeader title="Credits">
        <div className="w-1/2 max-w-[18rem]">
          <LinkGroup links={links} selectedId={creditType} size="medium" wide />
        </div>
      </BlockHeader>
      {creditType === CreditTypes.Cast && <CastCreditList credits={credits.cast} />}
      {creditType === CreditTypes.Crew && <CrewCreditList credits={credits.crew} />}
    </div>
  );
};

export default memo(FullCreditList);
