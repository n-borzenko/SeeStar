import type { FC } from "react";
import type { ShowSeasonExtended } from "types/show/season";
import { memo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import Block from "components/common/Block";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import UniversalCreditsWidget from "components/widgets/UniversalCreditsWidget";
import useAggregatedMediaCredits from "hooks/credits/useAggregatedMediaCredits";
import { getEpisodeName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";
import SeasonSummary from "./SeasonSummary";

type SeasonProps = {
  season: ShowSeasonExtended;
  showId: number;
};

const Season: FC<SeasonProps> = ({ season, showId }) => {
  const credits = useAggregatedMediaCredits(season.aggregateCredits);

  return (
    <div>
      <SeasonSummary season={season} />
      <Block hidingCondition={!season.episodes || season.episodes.length === 0}>
        <BlockHeader
          title="Episodes"
          href={`/show/${showId}/season/${season.seasonNumber}/episodes`}
        />
        <CardsList items={season.episodes} limited>
          {(episode) => (
            <MediumPortraitCard
              href={`/show/${showId}/season/${episode.seasonNumber}/episode/${episode.episodeNumber}`}
              posterPath={episode.stillPath}
              posterSizeName="smallLandscape"
              title={getEpisodeName(
                episode.name,
                episode.episodeNumber,
                episode.seasonNumber,
                true
              )}
              startDate={episode.airDate}
              infoType="rating"
              voteAverage={episode.voteAverage}
              mediaType={MediaTypes.Show}
              hasInfoRowAlignedToEnd
            />
          )}
        </CardsList>
      </Block>
      <UniversalCreditsWidget
        credits={credits}
        href={`/show/${showId}/season/${season.seasonNumber}/credits`}
      />
    </div>
  );
};

export default memo(Season);
