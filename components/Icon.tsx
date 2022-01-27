import { FC, memo } from "react";
import clsx from "clsx";

export type IconTypes =
  | "arrow-left"
  | "arrow-right"
  | "burger"
  | "close"
  | "go-to-arrow"
  | "star-filled";

type IconProps = {
  type: IconTypes;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
};

const Icon: FC<IconProps> = ({ type, size = "medium", color = "primary" }) => {
  const classes = clsx("block bg-contain bg-no-repeat", {
    "w-2 h-2": size === "small",
    "w-4 h-4": size === "medium",
    "w-6 h-6": size === "large",
    "bg-[url('/assets/arrow-left.svg')]": type === "arrow-left" && color === "primary",
    "bg-[url('/assets/arrow-left-white.svg')]": type === "arrow-left" && color === "secondary",
    "bg-[url('/assets/arrow-right.svg')]": type === "arrow-right" && color === "primary",
    "bg-[url('/assets/arrow-right-white.svg')]": type === "arrow-right" && color === "secondary",
    "bg-[url('/assets/burger.svg')]": type === "burger" && color === "primary",
    "bg-[url('/assets/burger-white.svg')]": type === "burger" && color === "secondary",
    "bg-[url('/assets/close.svg')]": type === "close" && color === "primary",
    "bg-[url('/assets/close-white.svg')]": type === "close" && color === "secondary",
    "bg-[url('/assets/go-to-arrow.svg')]": type === "go-to-arrow" && color === "primary",
    "bg-[url('/assets/go-to-arrow-white.svg')]": type === "go-to-arrow" && color === "secondary",
    "bg-[url('/assets/star-filled.svg')]": type === "star-filled" && color === "primary",
    "bg-[url('/assets/star-filled-white.svg')]": type === "star-filled" && color === "secondary",
  });

  return <span className={classes} />;
};

export default memo(Icon);
