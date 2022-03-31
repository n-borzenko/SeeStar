import type { FC } from "react";
import type { ShowExtended } from "types/show";
import { memo } from "react";
import SeasonsList from "./SeasonsList";
import ShowDetails from "./ShowDetails";
import ShowSummary from "./ShowSummary";

type ShowProps = {
  show: ShowExtended;
};

const Show: FC<ShowProps> = ({ show }) => {
  return (
    <div>
      <ShowSummary show={show} />
      <ShowDetails show={show} />
      <SeasonsList showId={show.id} seasons={show.seasons} />
    </div>
  );
};

export default memo(Show);
