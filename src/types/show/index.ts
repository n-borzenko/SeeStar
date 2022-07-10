import type { AggregatedCastMember, AggregatedCrewMember } from "types/credit";
import type { ExternalIds } from "types/externalIds";
import type { Language } from "types/language";
import type { ProductionCompany, ProductionCountry } from "types/production";
import type { CertificationRating } from "types/release";
import type { ShowEpisode } from "types/show/episode";
import type { ShowSeason } from "types/show/season";
import { MediaTypes } from "types/mediaTypes";

type ShowCreator = {
  id: number;
  creditId: string;
  name: string;
  gender?: number;
  profilePath?: string | null;
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

export type TypedShow = Show & {
  mediaType: MediaTypes.Show;
};

export type ShowDetailed = Omit<Show, "genreIds"> & {
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

export type ShowExtended = ShowDetailed & {
  externalIds: ExternalIds;
  keywords: { results: { id: number; name: string }[] };
  contentRatings: {
    results: CertificationRating[];
  };
  aggregateCredits: {
    cast: AggregatedCastMember[];
    crew: AggregatedCrewMember[];
  };
  recommendations: {
    results: Show[];
  };
};
