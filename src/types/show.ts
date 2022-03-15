import type { ExternalIds } from "types/externalIds";
import type { Language } from "types/language";
import type { ProductionCompany, ProductionCountry } from "types/production";
import type { CertificationRating } from "types/release";

type ShowCreator = {
  id: number;
  creditId: string;
  name: string;
  gender?: number;
  profilePath?: string | null;
};

type ShowEpisode = {
  airDate?: string;
  episodeNumber?: number;
  id: number;
  name: string;
  overview?: string;
  productionCode?: string;
  seasonNumber?: number;
  stillPath?: string | null;
  voteAverage?: number;
  voteCount?: number;
};

type ShowSeason = {
  airDate?: string;
  episodeCount?: number;
  id: number;
  name: string;
  overview?: string;
  posterPath?: string | null;
  seasonNumber?: number;
};

type ShowNetwork = {
  name: string;
  id: number;
  logoPath?: string | null;
  originCountry?: string;
};

type ShowStatus = "Canceled" | "Ended" | "In Production" | "Pilot" | "Planned" | "Returning Series";

type ShowType =
  | "Documentary"
  | "Miniseries"
  | "News"
  | "Reality"
  | "Scripted"
  | "Talk Show"
  | "Video";

export type Show = {
  backdropPath?: string | null;
  genreIds?: number[];
  firstAirDate?: string;
  id: number;
  name?: string;
  originCountry?: string[];
  originalLanguage?: string;
  originalName?: string;
  overview?: string;
  popularity?: number;
  posterPath?: string | null;
  voteAverage?: number;
  voteCount?: number;
};

export type ShowDetailed = Exclude<Show, "genreIds"> & {
  createdBy: ShowCreator[];
  episodeRunTime?: number[];
  genres?: { id: number; name: string }[];
  homepage?: string | null;
  inProduction?: boolean;
  languages?: string[];
  lastAirDate?: string;
  lastEpisodeToAir?: ShowEpisode | null;
  nextEpisodeToAir?: ShowEpisode | null;
  networks?: ShowNetwork[];
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  productionCompanies?: ProductionCompany[];
  productionCountries?: ProductionCountry[];
  seasons: ShowSeason[];
  spokenLanguages?: Language[];
  status?: ShowStatus;
  tagline?: string | null;
  type?: ShowType;
};

// Credits to be added later
export type ShowExtended = ShowDetailed & {
  externalIds: ExternalIds;
  keywords: { results: { id: number; name: string }[] };
  contentRatings: {
    results: CertificationRating[];
  };
};
