import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
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
    </div>
  );
};

export default memo(Season);
