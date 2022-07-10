import type { ReactNode } from "react";
import type { TypedMovie } from "types/movie";
import type { TypedShow } from "types/show";

type DataParameters = {
  startDate?: string | null;
  infoType?: "rating" | "text" | "none";
  infoText?: string;
  genreIds?: number[];
  knownFor?: (TypedMovie | TypedShow)[];
  overview?: string | null;
  children?: ReactNode;
};

const getDataAvailability = ({
  startDate,
  infoType,
  infoText,
  genreIds,
  knownFor,
  overview,
  children,
}: DataParameters) => {
  const hasInfoText = infoType === "text" && infoText && infoText.length > 0;
  const hasInfoRow = startDate || infoType === "rating" || hasInfoText;

  return {
    hasInfoRow,
    hasGenreIds: genreIds && genreIds.length > 0,
    hasKnownFor: knownFor && knownFor.length > 0,
    hasOverview: overview && overview.length > 0,
    hasChildren: children !== undefined && children !== null,
  };
};

export default getDataAvailability;
