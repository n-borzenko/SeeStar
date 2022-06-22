import type { FC } from "react";
import type { ShowDetailed } from "types/show";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import { MediaTypes } from "types/mediaTypes";
import SeasonsList from "./SeasonsList";

type SeasonsProps = {
  show: ShowDetailed;
};

const Seasons: FC<SeasonsProps> = ({ show }) => {
  return (
    <div>
      <MediaDescription
        mediaType={MediaTypes.Show}
        title={show.name}
        startDate={show.firstAirDate}
        endDate={show.lastAirDate}
        voteAverage={show.voteAverage}
        voteCount={show.voteCount}
      />
      <SeasonsList showId={show.id} seasons={show.seasons} />
    </div>
  );
};

export default memo(Seasons);
