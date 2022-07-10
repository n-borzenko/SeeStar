import type { FC } from "react";
import { memo } from "react";
import Card from "components/common/Card";
import GenresList from "components/common/GenresList";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import CardOverview from "./blocks/CardOverview";
import getDataAvailability from "./helpers/getDataAvailability";

type MediumPortraitCardProps = {
  href: string;
  posterSizeName?: "mediumPortrait" | "smallLandscape";
  posterPath?: string | null;
  mediaType: MediaTypes;
  title?: string;
  startDate?: string | null;
  voteAverage?: number;
  genreIds?: number[];
  job?: string;
  infoType?: "rating" | "text" | "none";
  infoText?: string;
  hasInfoRowAlignedToEnd?: boolean;
};

const MediumPortraitCard: FC<MediumPortraitCardProps> = ({
  href,
  posterSizeName = "mediumPortrait",
  posterPath,
  mediaType,
  title,
  startDate,
  voteAverage,
  genreIds,
  job,
  infoType = "none",
  infoText,
  hasInfoRowAlignedToEnd = false,
}) => {
  const { hasInfoRow, hasGenreIds, hasOverview } = getDataAvailability({
    startDate,
    infoText,
    infoType,
    genreIds,
    overview: job,
  });
  const posterSize = getImageSize(posterSizeName);
  const hasGenresList =
    hasGenreIds && (mediaType === MediaTypes.Movie || mediaType === MediaTypes.Show);
  const gridTemplateRows =
    (!hasGenresList && !hasOverview) || !hasInfoRow ? "auto 1fr" : "auto auto 1fr";

  return (
    <Card href={href} direction="vertical">
      <div className="flex-shrink-0">
        <PosterImage src={posterPath} type={mediaType} size={posterSizeName} rounded="top" />
      </div>

      <div
        className="w-full h-full grid gap-2 p-2"
        style={{
          maxWidth: `${posterSize.width}px`,
          gridTemplateRows,
        }}
      >
        <CardHeader cardSize="small" mediaType={mediaType} title={title} isMultilined />
        <CardInfoRow
          cardSize="small"
          startDate={startDate}
          voteAverage={voteAverage}
          infoType={infoType}
          infoText={infoText}
          isInfoTextAlignedRight
          aligned={hasInfoRowAlignedToEnd ? "end" : "start"}
        />
        {hasGenresList && (
          <div className="w-full self-end">
            <GenresList ids={genreIds} type={mediaType} />
          </div>
        )}
        <CardOverview cardSize="small" overview={job} className="line-clamp-2 self-end" />
      </div>
    </Card>
  );
};

export default memo(MediumPortraitCard);
