import type { FC } from "react";
import { memo } from "react";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import CardJobList from "./blocks/CardJobList";
import LandscapeCardContainer from "./blocks/LandscapeCardContainer";
import getDataAvailability from "./helpers/getDataAvailability";

type CreditLandscapeCardProps = {
  href: string;
  cardSize?: "small" | "adaptive";
  posterPath?: string | null;
  mediaType: MediaTypes;
  title?: string;
  startDate?: string | null;
  voteAverage?: number;
  jobs?: { job: string; creditId: string; episodes?: number }[];
  infoType?: "rating" | "text" | "none";
  infoText?: string;
};

// Person, Movie or Show cards with credit list
const CreditLandscapeCard: FC<CreditLandscapeCardProps> = ({
  href,
  cardSize = "adaptive",
  posterPath,
  mediaType,
  title,
  startDate,
  voteAverage,
  jobs,
  infoType = "none",
  infoText,
}) => {
  const { hasInfoRow } = getDataAvailability({ startDate, infoType, infoText });
  const gridTemplateRows = hasInfoRow ? "auto auto 1fr" : "auto 1fr";

  return (
    <LandscapeCardContainer
      href={href}
      cardSize={cardSize}
      posterPath={posterPath}
      mediaType={mediaType}
      gridTemplateRows={gridTemplateRows}
    >
      <CardHeader cardSize={cardSize} mediaType={mediaType} title={title} />
      <CardInfoRow
        cardSize={cardSize}
        startDate={startDate}
        voteAverage={voteAverage}
        infoType={infoType}
        infoText={infoText}
      />
      <CardJobList cardSize={cardSize} jobs={jobs} />
    </LandscapeCardContainer>
  );
};

export default memo(CreditLandscapeCard);
