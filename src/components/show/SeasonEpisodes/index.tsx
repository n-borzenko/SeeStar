import type { FC } from "react";
import type { ShowSeasonDetailed } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import { MediaTypes } from "types/mediaTypes";
import EpisodesList from "./EpisodesList";

type SeasonEpisodesProps = {
  showId: number;
  season: ShowSeasonDetailed;
};

const SeasonEpisodes: FC<SeasonEpisodesProps> = ({ season, showId }) => {
  return (
    <div>
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={season.name ? season.name : `Season ${season.seasonNumber}`}
        startDate={season.airDate}
        infoType="text"
        infoText={`${season.episodes.length} episode${season.episodes.length !== 1 && "s"}`}
      />
      <EpisodesList showId={showId} episodes={season.episodes} />
    </div>
  );
};

export default memo(SeasonEpisodes);
