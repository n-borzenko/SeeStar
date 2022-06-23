import type { FC } from "react";
import type { ShowExtended } from "types/show";
import { memo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import Block from "components/common/Block";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import AggregatedCreditsWidget from "components/widgets/AggregatedCreditsWidget";
import { MediaTypes } from "types/mediaTypes";
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
      <Block hidingCondition={!show.seasons || show.seasons.length === 0}>
        <BlockHeader title="Seasons" href={`/show/${show.id}/seasons`} />
        <CardsList items={show.seasons}>
          {(season) => (
            <MediumPortraitCard
              href={`/show/${show.id}/season/${season.seasonNumber}`}
              posterPath={season.posterPath}
              title={season.name ? season.name : `Season ${season.seasonNumber}`}
              startDate={season.airDate}
              infoType="text"
              infoText={season.episodeCount ? `${season.episodeCount} ep.` : undefined}
              mediaType={MediaTypes.Show}
            />
          )}
        </CardsList>
      </Block>
      <AggregatedCreditsWidget credits={show.aggregateCredits} href={`/show/${show.id}/credits`} />
      <Block
        hidingCondition={!show.recommendations.results || show.recommendations.results.length === 0}
      >
        <BlockHeader title="Recommendations" />
        <CardsList items={show.recommendations.results}>
          {(item) => (
            <MediumPortraitCard
              href={`/show/${item.id}`}
              posterPath={item.posterPath}
              title={item.name}
              startDate={item.firstAirDate}
              voteAverage={item.voteAverage}
              infoType="rating"
              genreIds={item.genreIds}
              mediaType={MediaTypes.Show}
            />
          )}
        </CardsList>
      </Block>
    </div>
  );
};

export default memo(Show);
