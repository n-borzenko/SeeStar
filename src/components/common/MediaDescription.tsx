import type { FC, PropsWithChildren } from "react";
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
  isRatingHidden?: boolean;
};

const MediaDescription: FC<PropsWithChildren<MediaDescriptionProps>> = ({
  mediaType,
  title,
  startDate,
  endDate,
  voteAverage,
  voteCount,
  isRatingHidden = false,
  children,
}) => {
  const screenSize = useScreenSize();
  return (
    <div className="grid gap-2 md:gap-4">
      <div>
        <div className="inline-block mr-2 md:mr-4">
          <Icon
            size="extra-large"
            type={mediaType}
            ariaLabel={`"Type: ${getMediaName(mediaType)}"`}
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
          {isRatingHidden && children ? children : null}
          {!isRatingHidden && screenSize ? (
            <Rating
              voteAverage={voteAverage}
              voteCount={voteCount}
              size={screenSize < ScreenSize.Md ? "large" : "extra-large"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(MediaDescription);
