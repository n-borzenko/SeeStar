import type { FC } from "react";
import { ShowEpisodeExtended } from "types/show/episode";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import CreditMembersList from "components/lists/CreditMembersList";
import { MediaTypes } from "types/mediaTypes";

type EpisodeCreditsProps = {
  episode: ShowEpisodeExtended;
  showId: number;
};

const EpisodeCredits: FC<EpisodeCreditsProps> = ({ episode, showId }) => {
  return (
    <div className="min-h-full flex flex-col">
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={
          (episode.seasonNumber ? `S${episode.seasonNumber}: ` : "") +
          (episode.name ? episode.name : `Episode ${episode.episodeNumber}`)
        }
        startDate={episode.airDate}
        voteAverage={episode.voteAverage}
        voteCount={episode.voteCount}
      />
      <CreditMembersList
        credits={episode.credits}
        href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}/credits`}
      />
    </div>
  );
};

export default memo(EpisodeCredits);
