import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import EpisodesList from "./EpisodesList";
// import SeasonSummary from "./SeasonSummary";
// import SeasonDetails from "./SeasonDetails";

type SeasonProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const Season: FC<SeasonProps> = ({ season, showId }) => {
  return (
    <div>
      {season.seasonNumber} {season.name} {season.episodeCount}
      <EpisodesList episodes={season.episodes} showId={showId} />
      {/* <SeasonSummary show={show} />
      <SeasonDetails show={show} /> */}
    </div>
  );
};

export default memo(Season);
