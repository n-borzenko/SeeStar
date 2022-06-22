import type { FC } from "react";
import type { ShowExtended } from "types/show";
import { memo } from "react";
import AggregatedCreditsWidget from "components/widgets/AggregatedCreditsWidget";
import SeasonsList from "./SeasonsList";
import SimilarShows from "./SimilarShows";
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
      <AggregatedCreditsWidget credits={show.aggregateCredits} href={`/show/${show.id}/credits`} />
      <SimilarShows shows={show.similar.results} />
    </div>
  );
};

export default memo(Show);
