import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import Rating from "components/common/Rating";

type CardInfoRowProps = {
  cardSize: "small" | "adaptive";
  startDate?: string | null;
  voteAverage?: number;
  infoType?: "rating" | "text" | "none";
  infoText?: string;
  isInfoTextAlignedRight?: boolean;
  aligned?: "start" | "end";
};

const CardInfoRow: FC<CardInfoRowProps> = ({
  cardSize,
  startDate,
  voteAverage,
  infoType,
  infoText,
  isInfoTextAlignedRight = false,
  aligned = "start",
}) => {
  const hasInfoText = infoType === "text" && infoText && infoText.length > 0;
  const hasInfoRow = startDate || infoType === "rating" || hasInfoText;

  const rowClasses = clsx(
    "flex items-center justify-between self-start min-w-1",
    aligned === "start" ? "self-start" : "self-end"
  );
  const textClasses = clsx(
    "text-sm leading-4 font-normal",
    cardSize === "adaptive" && "sm:text-base sm:leading-5"
  );

  if (!hasInfoRow) {
    return null;
  }

  return (
    <div className={rowClasses}>
      {startDate && (
        <span className={`${textClasses} text-neutral-500 mr-2 last:mr-0`}>
          {new Date(startDate).toLocaleDateString()}
        </span>
      )}
      {infoType === "rating" && (
        <div className="ml-auto">
          <Rating voteAverage={voteAverage} />
        </div>
      )}
      {hasInfoText && (
        <span
          className={`${textClasses} text-neutral-700 text-ellipsis overflow-hidden whitespace-nowrap ${
            isInfoTextAlignedRight ? "ml-auto" : "first-letter:uppercase"
          }`}
        >
          {infoText}
        </span>
      )}
    </div>
  );
};

export default memo(CardInfoRow);
