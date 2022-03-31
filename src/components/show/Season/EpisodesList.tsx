import type { FC } from "react";
import type { ShowEpisodeDetailed } from "types/show/episode";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type EpisodesListProps = {
  showId: number;
  episodes: ShowEpisodeDetailed[];
};

const EpisodesList: FC<EpisodesListProps> = ({ episodes, showId }) => {
  const posterSize = getImageSize("medium");
  const posterRatio = (posterSize.height / posterSize.width) * 100;

  return (
    <div>
      <BlockHeader title="Episodes" />
      <div className="w-full grid gap-4 lg:gap-8">
        {episodes.map((episode) => (
          <Card
            key={episode.id}
            href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
          >
            S{episode.seasonNumber}E{episode.episodeNumber} -{episode.name}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(EpisodesList);
