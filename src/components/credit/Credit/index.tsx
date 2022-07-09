import type { FC } from "react";
import type { ShowCreditDetailed, MovieCreditDetailed } from "types/credit";
import { memo } from "react";
import { MediaTypes } from "types/mediaTypes";
import CreditDescription from "./CreditDescription";
import CreditShowDetails from "./CreditShowDetails";
import CreditSummary from "./CreditSummary";

type CreditProps = {
  credit: ShowCreditDetailed | MovieCreditDetailed;
};

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <div className="min-h-full flex flex-col">
      <CreditDescription credit={credit} />
      <CreditSummary credit={credit} />
      {credit.mediaType === MediaTypes.Show && <CreditShowDetails credit={credit} />}
    </div>
  );
};

export default memo(Credit);
