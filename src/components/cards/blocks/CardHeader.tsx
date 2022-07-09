import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import Icon from "components/common/Icon";
import { getMediaName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type CardHeaderProps = {
  cardSize: "small" | "adaptive";
  mediaType: MediaTypes;
  title?: string;
  isIconHidden?: boolean;
  isMultilined?: boolean;
};

const CardHeader: FC<CardHeaderProps> = ({
  cardSize,
  mediaType,
  title,
  isIconHidden = false,
  isMultilined = false,
}) => {
  const headerClasses = clsx("leading-5", {
    "sm:leading-6": cardSize === "adaptive",
    "line-clamp-1 break-all": !isMultilined,
    "line-clamp-2": isMultilined,
  });
  const titleClasses = clsx(
    "text-base leading-5 font-medium break-words",
    cardSize === "adaptive" && "sm:text-lg sm:leading-6"
  );

  return (
    <div className={headerClasses}>
      <div className="inline-block mr-1 align-text-top">
        {!isIconHidden && (
          <Icon size="medium" type={mediaType} ariaLabel={`Type: ${getMediaName(mediaType)}`} />
        )}
      </div>
      <span className={titleClasses}>{title}</span>
    </div>
  );
};

export default memo(CardHeader);
