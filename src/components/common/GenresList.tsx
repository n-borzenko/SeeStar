import type { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import useGenresRequest from "hooks/genres/useGenresRequest";
import { MediaTypes } from "types/mediaTypes";

type GenresListProps = {
  size?: "medium" | "large";
  type: MediaTypes.Show | MediaTypes.Movie;
  ids?: number[];
  isMultilined?: boolean;
};

const GenresList: FC<GenresListProps> = ({ size = "medium", type, ids, isMultilined = false }) => {
  const genres = useGenresRequest(type);

  if (!ids || ids.length === 0 || genres.state !== "succeeded") {
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
      {ids.map((id) => {
        const genreName = genres.data.get(id);
        return (
          genreName && (
            <div
              key={id}
              className={clsx("bg-primary/10 text-primary rounded-full last:mr-0", {
                "h-4 px-1 mr-1 mb-1 text-xs font-normal": size === "medium",
                "h-6 px-2 mr-2 mb-2 text-lg font-normal leading-6": size === "large",
              })}
            >
              {genreName}
            </div>
          )
        );
      })}
    </div>
  );
};

export default memo(GenresList);
