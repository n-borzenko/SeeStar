import type { FC } from "react";
import Image from "next/image";
import { memo } from "react";

type LoaderProps = { size?: "medium" | "large" };

const Loader: FC<LoaderProps> = ({ size = "medium" }) => {
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
      />
    </div>
  );
};

export default memo(Loader);
