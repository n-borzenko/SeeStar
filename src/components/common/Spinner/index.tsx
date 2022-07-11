import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import LoadingImage from "./loading.svg";

type SpinnerProps = { size?: "medium" | "large" };

const Spinner: FC<SpinnerProps> = ({ size = "medium" }) => {
  const dimension = size === "medium" ? "48" : "64";
  const classes = clsx("flex justify-center items-center py-16", {
    "min-h-full": size === "large",
  });

  return (
    <div className={classes}>
      <div className="animate-spin-slow">
        <LoadingImage width={dimension} height={dimension} />
      </div>
    </div>
  );
};

export default memo(Spinner);
