import type { FC } from "react";
import { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import CreditMembersList from "components/lists/CreditMembersList";
import { getPluralizedName, getSeasonName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type SeasonCreditsProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const SeasonCredits: FC<SeasonCreditsProps> = ({ season, showId }) => {
  return (
    <div className="min-h-full grid grid-rows-[auto_1fr]">
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={getSeasonName(season.name, season.seasonNumber)}
        startDate={season.airDate}
        infoType="text"
        infoText={getPluralizedName("episode", season.episodes.length)}
      />
      <CreditMembersList
        credits={season.aggregateCredits}
        href={`/show/${showId}/season/${season.seasonNumber}/credits`}
      />
    </div>
  );
};

export default memo(SeasonCredits);
