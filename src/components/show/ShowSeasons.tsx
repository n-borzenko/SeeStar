import type { FC } from "react";
import type { ShowDetailed } from "types/show";
import { memo } from "react";
import MediaLandscapeCard from "components/cards/MediaLandscapeCard";
import BlockHeader from "components/common/BlockHeader";
import MediaDescription from "components/common/MediaDescription";
import { getPluralizedName, getSeasonName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type ShowSeasonsProps = {
  show: ShowDetailed;
};

const ShowSeasons: FC<ShowSeasonsProps> = ({ show }) => {
  return (
    <div>
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={show.name}
        startDate={show.firstAirDate}
        endDate={show.lastAirDate}
        voteAverage={show.voteAverage}
        voteCount={show.voteCount}
        infoType="rating"
      />
      <BlockHeader title="Seasons" />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {show.seasons.map((season) => (
          <MediaLandscapeCard
            key={season.id}
            href={`/show/${show.id}/season/${season.seasonNumber}`}
            posterPath={season.posterPath}
            mediaType={MediaTypes.Show}
            title={getSeasonName(season.name, season.seasonNumber, true)}
            startDate={season.airDate}
            infoType="text"
            infoText={getPluralizedName("episode", season.episodeCount)}
            overview={season.overview}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ShowSeasons);
