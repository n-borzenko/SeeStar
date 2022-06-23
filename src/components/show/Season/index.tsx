import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import Block from "components/common/Block";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import AggregatedCreditsWidget from "components/widgets/AggregatedCreditsWidget";
import SeasonSummary from "./SeasonSummary";
import { MediaTypes } from "types/mediaTypes";

type SeasonProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const Season: FC<SeasonProps> = ({ season, showId }) => {
  return (
    <div>
      <SeasonSummary season={season} />
      <Block hidingCondition={!season.episodes || season.episodes.length === 0}>
        <BlockHeader
          title="Episodes"
          href={`/show/${showId}/season/${season.seasonNumber}/episodes`}
        />
        <CardsList items={season.episodes}>
          {(episode) => (
            <MediumPortraitCard
              href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
              posterPath={episode.stillPath}
              posterSizeName="smallLandscape"
              title={episode.name ? episode.name : `Episode ${episode.episodeNumber}`}
              startDate={episode.airDate}
              infoType="rating"
              voteAverage={episode.voteAverage}
              mediaType={MediaTypes.Show}
            />
          )}
        </CardsList>
      </Block>
      <AggregatedCreditsWidget
        credits={season.aggregateCredits}
        href={`/show/${showId}/season/${season.seasonNumber}/credits`}
      />
    </div>
  );
};

export default memo(Season);
