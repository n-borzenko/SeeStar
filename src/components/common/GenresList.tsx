import { FC, useMemo } from "react";
import { memo } from "react";
import LabelsList from "components/common/LabelsList";
import isDefined from "helpers/isDefined";
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

  const genreLabels = useMemo(() => {
    if (!ids || ids.length === 0 || genres.state !== "succeeded") {
      return [];
    }
    return ids
      .map((id) => {
        const genreName = genres.data.get(id);
        return genreName ? { id, name: genreName } : undefined;
      })
      .filter(isDefined);
  }, [ids, genres]);

  return <LabelsList labels={genreLabels} size={size} isMultilined={isMultilined} />;
};

export default memo(GenresList);
