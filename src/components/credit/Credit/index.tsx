import type { FC } from "react";
import type { ShowCreditDetailed, MovieCreditDetailed } from "types/credit";
import { memo } from "react";
import TitledPageContainer from "components/common/TitledPageContainer";
import { MediaTypes } from "types/mediaTypes";
import CreditDescription from "./CreditDescription";
import CreditShowDetails from "./CreditShowDetails";
import CreditSummary from "./CreditSummary";

type CreditProps = {
  credit: ShowCreditDetailed | MovieCreditDetailed;
};

const Credit: FC<CreditProps> = ({ credit }) => {
  return (
    <TitledPageContainer
      title={`SeeStar • Credit • ${credit.person.name} in ${
        credit.mediaType === MediaTypes.Movie ? credit.media.title : credit.media.name
      }`}
    >
      <div className="min-h-full flex flex-col">
        <CreditDescription credit={credit} />
        <CreditSummary credit={credit} />
        {credit.mediaType === MediaTypes.Show && <CreditShowDetails credit={credit} />}
      </div>
    </TitledPageContainer>
  );
};

export default memo(Credit);
