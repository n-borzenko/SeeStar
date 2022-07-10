import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";

type CardOverviewProps = {
  cardSize: "small" | "adaptive";
  overview?: string | null;
  className?: string;
};

const CardOverview: FC<CardOverviewProps> = ({ cardSize, overview, className }) => {
  const overviewClasses = clsx(
    "text-sm leading-[1.15rem] font-normal italic text-neutral-700 break-words",
    cardSize === "adaptive" && "sm:text-base",
    className
  );

  if (!overview || overview.length === 0) {
    return null;
  }

  return <p className={overviewClasses}>{overview}</p>;
};

export default memo(CardOverview);
