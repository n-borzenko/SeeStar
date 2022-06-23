import type { CastMember, CrewMember } from "types/credit";
import type { ExternalIds } from "types/externalIds";
import type { Language } from "types/language";
import type { ProductionCompany, ProductionCountry } from "types/production";
import type { CountryCertification } from "types/release";

type MovieCollection = {
  id: number;
  name: string;
  posterPath?: string | null;
  backdropPath?: string | null;
};

type MovieStatus =
  | "Rumored"
  | "Planned"
  | "In Production"
  | "Post Production"
  | "Released"
  | "Canceled";

export type Movie = {
  adult?: boolean;
  backdropPath?: string | null;
  genreIds?: number[];
  id: number;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: string | null;
  popularity?: number;
  posterPath?: string | null;
  releaseDate?: string;
  title?: string;
  video?: boolean;
  voteAverage?: number;
  voteCount?: number;
};

export type MovieDetailed = Omit<Movie, "genreIds"> & {
  belongsToCollection?: null | MovieCollection;
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string | null;
  imdbId?: string | null;
  productionCompanies?: ProductionCompany[];
  productionCountries?: ProductionCountry[];
  revenue?: number;
  runtime?: number | null;
  spokenLanguages?: Language[];
  status?: MovieStatus;
  tagline?: string | null;
};

export type MovieExtended = MovieDetailed & {
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  externalIds: ExternalIds;
  keywords: { keywords: { id: number; name: string }[] };
  releaseDates: {
    results: CountryCertification[];
  };
  recommendations: {
    results: Movie[];
  };
};
