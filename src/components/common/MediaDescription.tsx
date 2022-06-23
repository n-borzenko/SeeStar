import type { FC } from "react";
import { memo } from "react";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import getMediaName from "helpers/getMediaName";
import useScreenSize, { ScreenSize } from "hooks/common/useScreenSize";
import { MediaTypes } from "types/mediaTypes";

type MediaDescriptionProps = {
  mediaType: MediaTypes;
  title?: string;
  startDate?: string | null;
  endDate?: string | null;
  voteAverage?: number;
  voteCount?: number;
  infoType?: "rating" | "text" | "none";
  infoText?: string;
};

const MediaDescription: FC<MediaDescriptionProps> = ({
  mediaType,
  title,
  startDate,
  endDate,
  voteAverage,
  voteCount,
  infoType = "none",
  infoText,
}) => {
  const screenSize = useScreenSize();
  const hasInfoText = infoType === "text" && infoText && infoText.length > 0;
  const hasRating = infoType === "rating" && screenSize;

  return (
    <div className="grid gap-2 md:gap-4">
      <div>
        <div className="inline-block mr-2 md:mr-4">
          <Icon
            size="extra-large"
            type={mediaType}
            ariaLabel={`Type: ${getMediaName(mediaType)}`}
          />
        </div>
        <h2 className="inline text-3xl md:text-4xl font-black">{title}</h2>
      </div>
      <div className="flex items-center">
        {startDate && (
          <span className="mr-4 last:mr-0 text-lg leading-6 md:text-xl font-normal text-neutral-500">
            {new Date(startDate).toLocaleDateString()}
            {endDate && ` - ${new Date(endDate).toLocaleDateString()}`}
          </span>
        )}
        <div className="ml-auto">
          {hasRating && (
            <Rating
              voteAverage={voteAverage}
              voteCount={voteCount}
              size={screenSize < ScreenSize.Md ? "large" : "extra-large"}
            />
          )}
          {hasInfoText && (
            <span className="text-lg leading-6 md:text-xl font-normal text-neutral-700">
              {infoText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MediaDescription);
