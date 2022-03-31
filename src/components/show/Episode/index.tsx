import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
// import EpisodeSummary from "./EpisodeSummary";
// import EpisodeDetails from "./EpisodeDetails";

type EpisodeProps = {
  episode: ShowEpisodeExtended;
  showId: number;
};

const Episode: FC<EpisodeProps> = ({ episode, showId }) => {
  return (
    <div>
      S{episode.seasonNumber}:E{episode.episodeNumber} - {episode.name}
      {/* <EpisodeSummary show={show} />
      <EpisodeDetails show={show} /> */}
    </div>
  );
};

export default memo(Episode);
