import type { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";

type CardJobListProps = {
  cardSize: "small" | "adaptive";
  jobs?: { job: string; creditId: string; episodes?: number }[];
};

const CardJobList: FC<CardJobListProps> = ({ cardSize, jobs }) => {
  const rowClasses = clsx(
    "text-sm leading-4 font-normal italic text-neutral-700 line-clamp-3 self-end",
    cardSize === "adaptive" && "sm:text-base sm:leading-5"
  );

  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className={rowClasses}>
      {jobs.map(({ job, creditId, episodes }, index) => (
        <p key={creditId} className="inline-flex items-baseline max-w-full">
          <Link href={`/credit/${creditId}`}>
            <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">{job}</a>
          </Link>
          {episodes !== undefined && episodes > 0 && (
            <span className="shrink-0 last:pr-1">[{episodes} ep.]</span>
          )}
          {index < jobs.length - 1 && <span className="mr-2">,</span>}
        </p>
      ))}
    </div>
  );
};

export default memo(CardJobList);
