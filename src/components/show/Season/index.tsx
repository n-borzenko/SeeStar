import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import AggregatedCreditsWidget from "components/widgets/AggregatedCreditsWidget";
import EpisodesList from "./EpisodesList";
import SeasonSummary from "./SeasonSummary";

type SeasonProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const Season: FC<SeasonProps> = ({ season, showId }) => {
  return (
    <div>
      <SeasonSummary season={season} />
      <EpisodesList episodes={season.episodes} showId={showId} />
      <AggregatedCreditsWidget
        credits={season.aggregateCredits}
        href={`/show/${showId}/season/${season.seasonNumber}/credits`}
      />
    </div>
  );
};

export default memo(Season);
