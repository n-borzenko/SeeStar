import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import Icon from "components/common/Icon";

type RatingProps = { size?: "medium" | "extra-large"; voteAverage?: number; voteCount?: number };

const Rating: FC<RatingProps> = ({ size = "medium", voteAverage = 0, voteCount }) => {
  return (
    <div className={clsx("flex items-center", { "opacity-50": !voteAverage })}>
      <div className="flex-shrink-0">
        <Icon size={size} type="star-filled" ariaLabel="Rating" />
      </div>
      <div
        className={clsx({
          "ml-1 text-base font-normal leading-4": size === "medium",
          "ml-2 text-xl font-semibold": size === "extra-large",
        })}
      >
        {voteAverage}
      </div>
      {voteCount ? (
        <div
          className={clsx("text-neutral-500", {
            "ml-1 text-base font-normal leading-4": size === "medium",
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
