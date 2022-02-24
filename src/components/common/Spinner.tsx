import type { FC } from "react";
import Image from "next/image";
import { memo } from "react";

type SpinnerProps = { size?: "medium" | "large" };

const Spinner: FC<SpinnerProps> = ({ size = "medium" }) => {
  const dimension = size === "medium" ? "32" : "64";
  return (
    <div className="min-h-full flex justify-center items-center">
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
