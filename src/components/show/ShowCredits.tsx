import type { FC } from "react";
import { ShowExtended } from "types/show";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type ShowCreditsProps = {
  show: ShowExtended;
};

const ShowCredits: FC<ShowCreditsProps> = ({ show }) => {
  return (
    <div className="min-h-full flex flex-col">
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={show.name}
        startDate={show.firstAirDate}
        endDate={show.lastAirDate}
        voteAverage={show.voteAverage}
        voteCount={show.voteCount}
      />
      <CreditMembersList credits={show.aggregateCredits} href={`/show/${show.id}/credits`} />
    </div>
  );
};

export default memo(ShowCredits);
