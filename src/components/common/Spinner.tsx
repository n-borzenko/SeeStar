import type { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

type SpinnerProps = { size?: "medium" | "large" };

const Spinner: FC<SpinnerProps> = ({ size = "medium" }) => {
  const dimension = size === "medium" ? "48" : "64";
  const classes = clsx("flex justify-center items-center py-16", {
    "min-h-full": size === "large",
  });

  return (
    <div className={classes}>
      <Image
        src="/assets/loading.svg"
        alt="Loading"
        quality="100"
        width={dimension}
        height={dimension}
        objectPosition="center"
        className="leading-0 animate-spin-slow"
        priority
      />
    </div>
  );
};

export default memo(Spinner);
