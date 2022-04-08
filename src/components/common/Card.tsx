import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";

type CardProps = {
  href: string;
  direction?: "vertical" | "horizontal";
};

const Card: FC<PropsWithChildren<CardProps>> = ({ href, children, direction = "horizontal" }) => {
  const classes = clsx(
    "bg-white shadow-card group focus:shadow-popup focus-visible:shadow-popup hover:shadow-popup active:shadow-flying rounded-lg flex",
    {
      "flex-col h-full": direction === "vertical",
    }
  );

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default memo(Card);
