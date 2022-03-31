import type { FC } from "react";
import type { ShowDetailed } from "types/show";
import { memo } from "react";
import SeasonsList from "./SeasonsList";
import ShowDescription from "./ShowDescription";

type SeasonsProps = {
  show: ShowDetailed;
};

const Seasons: FC<SeasonsProps> = ({ show }) => {
  return (
    <div>
      <ShowDescription show={show} />
      <SeasonsList showId={show.id} seasons={show.seasons} />
    </div>
  );
};

export default memo(Seasons);
