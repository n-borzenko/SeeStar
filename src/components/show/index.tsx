import type { FC } from "react";
import type { ShowExtended } from "types/show";
import { memo } from "react";
import ShowSummary from "./ShowSummary";
import ShowDetails from "./ShowDetails";

type ShowProps = {
  show: ShowExtended;
};

const Show: FC<ShowProps> = ({ show }) => {
  return (
    <div>
      <ShowSummary show={show} />
      <ShowDetails show={show} />
    </div>
  );
};

export default memo(Show);
