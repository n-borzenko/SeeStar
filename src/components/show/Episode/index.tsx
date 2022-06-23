import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import CreditsWidget from "components/widgets/CreditsWidget";
import EpisodeSummary from "./EpisodeSummary";

type EpisodeProps = {
  episode: ShowEpisodeExtended;
  showId: number;
};

const Episode: FC<EpisodeProps> = ({ episode, showId }) => {
  return (
    <div>
      <EpisodeSummary episode={episode} />
      <CreditsWidget
        credits={episode.credits}
        href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}/credits`}
      />
    </div>
  );
};

export default memo(Episode);
