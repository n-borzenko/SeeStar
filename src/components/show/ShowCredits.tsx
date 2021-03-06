import type { FC } from "react";
import { ShowExtended } from "types/show";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import TitledPageContainer from "components/common/TitledPageContainer";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type ShowCreditsProps = {
  show: ShowExtended;
};

const ShowCredits: FC<ShowCreditsProps> = ({ show }) => {
  return (
    <TitledPageContainer title={`SeeStar • Show credits • ${show.name}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={show.name}
          startDate={show.firstAirDate}
          endDate={show.lastAirDate}
          voteAverage={show.voteAverage}
          voteCount={show.voteCount}
          infoType="rating"
        />
        <CreditMembersList credits={show.aggregateCredits} href={`/show/${show.id}/credits`} />
      </div>
    </TitledPageContainer>
  );
};

export default memo(ShowCredits);
