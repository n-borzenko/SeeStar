import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import EpisodeSummary from "./EpisodeSummary";

type EpisodeProps = {
  episode: ShowEpisodeExtended;
};

const Episode: FC<EpisodeProps> = ({ episode }) => {
  return (
    <div>
      <EpisodeSummary episode={episode} />
    </div>
  );
};

export default memo(Episode);
