import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";

type LabelsListProps = {
  size?: "medium" | "large";
  labels?: { id: number; name: string }[];
  isMultilined?: boolean;
};

const LabelsList: FC<LabelsListProps> = ({ labels, size = "medium", isMultilined = false }) => {
  if (!labels || labels.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx("w-full flex flex-wrap", {
        "-mb-1": size === "medium" && isMultilined,
        "-mb-2": size === "large" && isMultilined,
        "h-4 overflow-hidden": size === "medium" && !isMultilined,
        "h-6 overflow-hidden": size === "large" && !isMultilined,
      })}
      aria-label="Genres list"
    >
      {labels.map(({ id, name }) => (
        <div
          key={id}
          className={clsx("bg-primary/10 text-primary rounded-full last:mr-0", {
            "h-4 px-1 mr-1 mb-1 text-xs font-normal": size === "medium",
            "h-6 px-2 mr-2 mb-2 text-lg font-normal leading-6": size === "large",
          })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default memo(LabelsList);
