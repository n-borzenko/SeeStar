import type { FC } from "react";
import { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import TitledPageContainer from "components/common/TitledPageContainer";
import CreditMembersList from "components/lists/CreditMembersList";
import { getPluralizedName, getSeasonName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type SeasonCreditsProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const SeasonCredits: FC<SeasonCreditsProps> = ({ season, showId }) => {
  const seasonTitle = getSeasonName(season.name, season.seasonNumber);
  return (
    <TitledPageContainer title={`SeeStar • Season credits • ${seasonTitle}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={seasonTitle}
          startDate={season.airDate}
          infoType="text"
          infoText={getPluralizedName("episode", season.episodes.length)}
        />
        <CreditMembersList
          credits={season.aggregateCredits}
          href={`/show/${showId}/season/${season.seasonNumber}/credits`}
        />
      </div>
    </TitledPageContainer>
  );
};

export default memo(SeasonCredits);
