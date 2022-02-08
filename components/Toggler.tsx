import { FC, memo } from "react";
import clsx from "clsx";

type TogglerProps = {
  values: string[];
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
};

const Toggler: FC<TogglerProps> = ({ values, size = "medium", color = "primary" }) => {
  const classes = clsx("flex", {
    "w-2 h-2": size === "small",
    "w-4 h-4": size === "medium",
    "w-6 h-6": size === "large",
  });

  return <span className={classes} />;
};

export default memo(Toggler);
