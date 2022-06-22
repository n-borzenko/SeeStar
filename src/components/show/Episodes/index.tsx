import type { FC } from "react";
import type { ShowSeasonDetailed } from "types/show/season";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import { MediaTypes } from "types/mediaTypes";
import EpisodesList from "./EpisodesList";

type EpisodesProps = {
  showId: number;
  season: ShowSeasonDetailed;
};

const Episodes: FC<EpisodesProps> = ({ season, showId }) => {
  return (
    <div>
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={season.name ? season.name : `Season ${season.seasonNumber}`}
        startDate={season.airDate}
        isRatingHidden
      >
        <span className="text-lg leading-6 md:text-xl font-normal text-neutral-700">
          {season.episodes.length} episode{season.episodes.length !== 1 && "s"}
        </span>
      </MediaDescription>
      <EpisodesList showId={showId} episodes={season.episodes} />
    </div>
  );
};

export default memo(Episodes);
