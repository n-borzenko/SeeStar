import type { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { memo } from "react";

type CardProps = {
  href: string;
};

const Card: FC<PropsWithChildren<CardProps>> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="bg-white shadow-card group focus:shadow-popup focus-visible:shadow-popup hover:shadow-popup active:shadow-flying rounded-lg flex">
        {children}
      </a>
    </Link>
  );
};

export default memo(Card);
