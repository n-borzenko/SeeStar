import type { FC } from "react";
import { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type SeasonCreditsProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const SeasonCredits: FC<SeasonCreditsProps> = ({ season, showId }) => {
  return (
    <div className="min-h-full flex flex-col">
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={season.name ? season.name : `Season ${season.seasonNumber}`}
        startDate={season.airDate}
        infoType="text"
        infoText={`${season.episodes.length} episode${season.episodes.length !== 1 && "s"}`}
      />
      <CreditMembersList
        credits={season.aggregateCredits}
        href={`/show/${showId}/season/${season.seasonNumber}/credits`}
      />
    </div>
  );
};

export default memo(SeasonCredits);
