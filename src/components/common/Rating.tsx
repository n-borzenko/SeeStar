import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import Icon from "components/common/Icon";

type RatingProps = {
  size?: "medium" | "large" | "extra-large";
  voteAverage?: number;
  voteCount?: number;
};

const Rating: FC<RatingProps> = ({ size = "medium", voteAverage = 0, voteCount }) => {
  return (
    <div
      className={clsx("flex items-center not-italic text-neutral-900", {
        "opacity-50": !voteAverage,
      })}
    >
      <div className="flex-shrink-0">
        <Icon size={size} type="star-filled" ariaLabel="Rating" />
      </div>
      <div
        className={clsx({
          "ml-1 text-base font-normal leading-4": size === "medium",
          "ml-1 text-lg leading-6 font-medium": size === "large",
          "ml-2 text-xl font-medium": size === "extra-large",
        })}
      >
        {voteAverage % 1 === 0 ? voteAverage : voteAverage.toFixed(1)}
      </div>
      {voteCount ? (
        <div
          className={clsx("text-neutral-500", {
            "ml-1 text-base font-normal leading-4": size === "medium",
            "ml-1 text-lg leading-6 font-normal": size === "large",
            "ml-2 text-xl font-normal": size === "extra-large",
          })}
        >
          ({voteCount}
          <span className="hidden sm:inline"> votes</span>)
        </div>
      ) : null}
    </div>
  );
};

export default memo(Rating);
