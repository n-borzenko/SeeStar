import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { memo } from "react";
import GenresList from "components/common/GenresList";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import CardOverview from "./blocks/CardOverview";
import LandscapeCardContainer from "./blocks/LandscapeCardContainer";
import getDataAvailability from "./helpers/getDataAvailability";

type MediaLandscapeCardProps = {
  href: string;
  cardSize?: "small" | "adaptive";
  posterPath?: string | null;
  mediaType: MediaTypes.Movie | MediaTypes.Show;
  title?: string;
  startDate?: string | null;
  voteAverage?: number;
  genreIds?: number[];
  infoType?: "rating" | "text";
  infoText?: string;
  overview?: string | null;
};

// Movie, Show or Season cards with description and optional interactive content
const MediaLandscapeCard: FC<PropsWithChildren<MediaLandscapeCardProps>> = ({
  href,
  cardSize = "adaptive",
  posterPath,
  mediaType,
  title,
  startDate,
  voteAverage,
  genreIds,
  infoType = "rating",
  infoText,
  overview,
  children,
}) => {
  const { hasInfoRow, hasGenreIds, hasOverview, hasChildren } = getDataAvailability({
    startDate,
    infoType,
    infoText,
    genreIds,
    overview,
    children,
  });

  const overviewClasses = clsx({
    "line-clamp-2": hasChildren && !hasGenreIds,
    "sm:line-clamp-5": ((hasChildren && !hasGenreIds) || !hasChildren) && cardSize === "adaptive",
    "line-clamp-3": !hasChildren,
    hidden: hasChildren && hasGenreIds,
    "sm:line-clamp-4": hasChildren && hasGenreIds && cardSize === "adaptive",
    "self-end": !hasChildren,
  });

  const gridTemplateRows = [
    "auto",
    hasInfoRow ? (hasChildren || hasOverview || hasGenreIds ? "auto" : "1fr") : "",
    hasGenreIds ? (hasChildren || hasOverview ? "auto" : "1fr") : "",
    hasOverview ? (hasChildren ? "auto" : "1fr") : "",
    hasChildren ? "1fr" : "",
  ].join(" ");

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
        isInfoTextAlignedRight
      />
      {hasGenreIds && <GenresList ids={genreIds} type={mediaType} />}
      <CardOverview cardSize={cardSize} overview={overview} className={overviewClasses} />
      {hasChildren && <div className="flex items-center justify-between self-end">{children}</div>}
    </LandscapeCardContainer>
  );
};

export default memo(MediaLandscapeCard);
