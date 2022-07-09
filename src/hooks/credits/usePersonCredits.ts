import type {
  AnyMediaCredit,
  MovieCastCredit,
  ShowCastCredit,
  MovieCrewCredit,
  ShowCrewCredit,
  UniversalCreditDescription,
} from "types/credit";
import { useMemo } from "react";
import { getCharacterName } from "helpers/textUtilities";
import { sortMediaCredits, getTopUniqueCredits } from "helpers/getTopUniqueCredits";
import { MediaTypes } from "types/mediaTypes";

const getCreditDescription = (
  credit: AnyMediaCredit,
  getJob: (credit: AnyMediaCredit) => string
) => {
  return {
    id: credit.creditId,
    href: `/${credit.mediaType === MediaTypes.Movie ? "movie" : "show"}/${credit.id}`,
    posterPath: credit.posterPath,
    title: credit.mediaType === MediaTypes.Movie ? credit.title : credit.name,
    startDate: credit.mediaType === MediaTypes.Movie ? credit.releaseDate : credit.firstAirDate,
    voteAverage: credit.voteAverage,
    infoType: "rating",
    mediaType: credit.mediaType,
    job: getJob(credit),
  } as UniversalCreditDescription;
};

const getCastJobDescription = (credit: MovieCastCredit | ShowCastCredit) => {
  return getCharacterName(credit.character);
};

const getCrewJobDescription = (credit: MovieCrewCredit | ShowCrewCredit) => {
  return `${credit.department}, ${credit.job}`;
};

const usePersonCredits = (combinedCredits: {
  cast: (MovieCastCredit | ShowCastCredit)[];
  crew: (MovieCrewCredit | ShowCrewCredit)[];
}) => {
  const credits = useMemo(
    () => ({
      cast: getTopUniqueCredits(combinedCredits.cast, sortMediaCredits).map((item) =>
        getCreditDescription(item, getCastJobDescription)
      ),
      crew: getTopUniqueCredits(combinedCredits.crew, sortMediaCredits).map((item) =>
        getCreditDescription(item, getCrewJobDescription)
      ),
    }),
    [combinedCredits]
  );

  return credits;
};

export default usePersonCredits;
