import type { FC } from "react";
import type { MovieCreditDetailed, ShowCreditDetailed } from "types/credit";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import { CreditTypes } from "types/creditTypes";
import { MediaTypes } from "types/mediaTypes";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import ShowCard from "./ShowCard";

type CreditSummaryProps = {
  credit: MovieCreditDetailed | ShowCreditDetailed;
};

const CreditSummary: FC<CreditSummaryProps> = ({ credit }) => {
  return (
    <div>
      <BlockHeader title="Find out more" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <PersonCard person={credit.person} />
        {credit.mediaType === MediaTypes.Movie ? (
          <MovieCard movie={credit.media} />
        ) : (
          <ShowCard show={credit.media} />
        )}
      </div>
    </div>
  );
};

export default memo(CreditSummary);
