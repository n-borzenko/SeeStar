import type { FC } from "react";
import { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import TitledPageContainer from "components/common/TitledPageContainer";
import CreditMembersList from "components/lists/CreditMembersList";
import { getEpisodeName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type EpisodeCreditsProps = {
  episode: ShowEpisodeExtended;
  showId: number;
};

const EpisodeCredits: FC<EpisodeCreditsProps> = ({ episode, showId }) => {
  const episodeTitle = getEpisodeName(
    episode.name,
    episode.episodeNumber,
    episode.seasonNumber,
    true
  );
  return (
    <TitledPageContainer title={`SeeStar • Episode credits • ${episodeTitle}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Show}
          title={episodeTitle}
          startDate={episode.airDate}
          voteAverage={episode.voteAverage}
          voteCount={episode.voteCount}
          infoType="rating"
        />
        <CreditMembersList
          credits={episode.credits}
          href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}/credits`}
        />
      </div>
    </TitledPageContainer>
  );
};

export default memo(EpisodeCredits);
