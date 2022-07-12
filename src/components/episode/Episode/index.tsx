import type { FC } from "react";
import type { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import TitledPageContainer from "components/common/TitledPageContainer";
import UniversalCreditsWidget from "components/widgets/UniversalCreditsWidget";
import { getEpisodeName } from "helpers/textUtilities";
import useMediaCredits from "hooks/credits/useMediaCredits";
import EpisodeSummary from "./EpisodeSummary";

type EpisodeProps = {
  episode: ShowEpisodeExtended;
  showId: number;
};

const Episode: FC<EpisodeProps> = ({ episode, showId }) => {
  const credits = useMediaCredits(episode.credits);

  return (
    <TitledPageContainer
      title={`SeeStar • Episode • ${getEpisodeName(
        episode.name,
        episode.episodeNumber,
        episode.seasonNumber,
        true
      )}`}
    >
      <div>
        <EpisodeSummary episode={episode} />
        <UniversalCreditsWidget
          credits={credits}
          href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}/credits`}
        />
      </div>
    </TitledPageContainer>
  );
};

export default memo(Episode);
