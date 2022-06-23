import type { FC } from "react";
import type { ShowDetailed } from "types/show";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import { MediaTypes } from "types/mediaTypes";
import SeasonsList from "./SeasonsList";

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
      <SeasonsList showId={show.id} seasons={show.seasons} />
    </div>
  );
};

export default memo(ShowSeasons);
