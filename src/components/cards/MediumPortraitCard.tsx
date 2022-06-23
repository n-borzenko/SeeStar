import type { FC } from "react";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import GenresList from "components/common/GenresList";
import PosterImage from "components/common/PosterImage";
import Rating from "components/common/Rating";
import getImageSize from "helpers/getImageSize";
import getMediaName from "helpers/getMediaName";
import { MediaTypes } from "types/mediaTypes";

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
}) => {
  const posterSize = getImageSize(posterSizeName);
  const hasInfoText = infoType === "text" && infoText && infoText.length > 0;
  const hasInfoLine = startDate || infoType === "rating" || hasInfoText;
  const hasGenresList =
    genreIds &&
    genreIds.length > 0 &&
    (mediaType === MediaTypes.Movie || mediaType === MediaTypes.Show);
  const hasJob = job && job.length > 0;

  return (
    <Card href={href} direction="vertical">
      <div className="flex-shrink-0">
        <PosterImage
          src={posterPath}
          type={MediaTypes.Person}
          size={posterSizeName}
          rounded="top"
        />
      </div>

      <div
        className="w-full h-full grid gap-2 p-2"
        style={{
          maxWidth: `${posterSize.width}px`,
          gridTemplateRows: `auto ${hasInfoLine ? "auto" : ""} ${
            hasGenresList || hasJob ? "1fr" : ""
          }`,
        }}
      >
        <div className="line-clamp-2">
          <div className="inline-block mr-1">
            <Icon size="medium" type={mediaType} ariaLabel={`Type: ${getMediaName(mediaType)}`} />
          </div>
          <span className="text-base font-medium leading-5 break-words">{title}</span>
        </div>

        {hasInfoLine && (
          <div className="flex items-center justify-between">
            {startDate && (
              <span className="text-sm font-normal leading-4 text-neutral-500 mr-2 last:mr-0">
                {new Date(startDate).toLocaleDateString()}
              </span>
            )}
            {infoType === "rating" && (
              <div className="ml-auto">
                <Rating voteAverage={voteAverage} />
              </div>
            )}
            {hasInfoText && (
              <span className="text-sm font-normal leading-4 text-neutral-700">{infoText}</span>
            )}
          </div>
        )}

        {hasGenresList && (
          <div className="w-full self-end">
            <GenresList ids={genreIds} type={mediaType} />
          </div>
        )}

        {hasJob && (
          <p className="text-sm font-normal italic leading-4 line-clamp-2 text-neutral-700 self-end break-words">
            {job}
          </p>
        )}
      </div>
    </Card>
  );
};

export default memo(MediumPortraitCard);
