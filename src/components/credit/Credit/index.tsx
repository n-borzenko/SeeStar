import type { FC } from "react";
import type { ShowCreditDetailed, MovieCreditDetailed } from "types/credit";
import { memo } from "react";
import { MediaTypes } from "types/mediaTypes";
import CreditDescription from "./CreditDescription";
import CreditSummary from "./CreditSummary";
import ShowDetails from "./ShowDetails";

type CreditProps = {
  credit: ShowCreditDetailed | MovieCreditDetailed;
};

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <div>
      <CreditDescription credit={credit} />
      <CreditSummary credit={credit} />
      {credit.mediaType === MediaTypes.Show && <ShowDetails credit={credit} />}
    </div>
  );
};

export default memo(Credit);
