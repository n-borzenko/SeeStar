import type { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";

type LinkData = {
  title: string;
  href: string;
  id: string;
};

type LinkGroupProps = {
  links: LinkData[];
  selectedId: string;
  color?: "primary" | "secondary" | "white";
  size?: "medium" | "large";
  wide?: boolean;
};

const LinkGroup: FC<LinkGroupProps> = ({
  links,
  selectedId,
  size = "medium",
  color = "primary",
  wide,
}) => {
  const containerClasses = clsx("inline-flex border rounded-full", {
    "h-8": size === "medium",
    "h-10": size === "large",
    "w-full": wide,
    "border-primary": color === "primary",
    "border-secondary": color === "secondary",
    "border-white": color === "white",
  });
  const defaultItemClasses = clsx("flex justify-center items-center rounded-full", {
    "h-full px-1 md:px-3 text-sm": size === "medium",
    "h-full px-1.5 md:px-4 text-lg": size === "large",
  });
  const itemClasses = clsx(defaultItemClasses, {
    "text-primary bg-primary/0 focus:bg-primary/10 hover:bg-primary/10 active:bg-primary/20":
      color === "primary",
    "text-secondary bg-secondary/0 focus:bg-secondary/10 hover:bg-secondary/10 active:bg-secondary/20":
      color === "secondary",
    "text-white bg-white/0 focus:bg-white/20 hover:bg-white/20 active:bg-white/40":
      color === "white",
  });
  const selectedItemClasses = clsx(defaultItemClasses, {
    "text-white bg-primary focus:bg-primary/80 hover:bg-primary/80 active:bg-primary/60":
      color === "primary",
    "text-white bg-secondary focus:bg-secondary/80 hover:bg-secondary/80 active:bg-secondary/60":
      color === "secondary",
    "text-primary bg-white focus:bg-white/80 hover:bg-white/80 active:bg-white/60":
      color === "white",
  });
  const itemStyle = wide
    ? {
        flexBasis: `${100 / links.length}%`,
      }
    : {};

  return (
    <div className={containerClasses}>
      {links.map(({ id, title, href }) => (
        <Link key={id} href={href}>
          <a
            aria-current={id === selectedId ? true : undefined}
            className={id === selectedId ? selectedItemClasses : itemClasses}
            style={itemStyle}
          >
            {title}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default memo(LinkGroup);
