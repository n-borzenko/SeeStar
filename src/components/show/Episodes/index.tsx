import type { FC } from "react";
import type { ShowSeasonDetailed } from "types/show/season";
import { memo } from "react";
import EpisodesList from "./EpisodesList";
import SeasonDescription from "./SeasonDescription";

type SeasonsProps = {
  showId: number;
  season: ShowSeasonDetailed;
};

const Seasons: FC<SeasonsProps> = ({ season, showId }) => {
  return (
    <div>
      <SeasonDescription season={season} />
      <EpisodesList showId={showId} episodes={season.episodes} />
    </div>
  );
};

export default memo(Seasons);
