import type { Movie } from "types/movie";
import type { Person } from "types/person";
import type { Show } from "types/show";
import type { ShowEpisode } from "types/show/episode";
import type { ShowSeason } from "types/show/season";
import { CreditTypes } from "types/creditTypes";
import { MediaTypes } from "types/mediaTypes";

type GuestStarCredit = {
  characterName?: string;
  creditId: string;
};

type CastCredit = {
  character?: string;
  creditId: string;
};

type CrewCredit = {
  creditId: string;
  department?: string;
  job?: string;
};

// Part of Person details
export type MovieCastCredit = CastCredit &
  Movie & {
    mediaType: MediaTypes.Movie;
  };

// Part of Person details
export type MovieCrewCredit = CrewCredit &
  Movie & {
    mediaType: MediaTypes.Movie;
  };

// Part of Person details
export type ShowCastCredit = CastCredit &
  Show & {
    mediaType: MediaTypes.Show;
    episodeCount?: number;
  };

// Part of Person details
export type ShowCrewCredit = CrewCredit &
  Show & {
    mediaType: MediaTypes.Show;
    episodeCount?: number;
  };

export type AnyCredit = MovieCastCredit | ShowCastCredit | MovieCrewCredit | ShowCrewCredit;

// Part of Show details
export type GuestStarMember = Person &
  GuestStarCredit & {
    order?: number;
  };

// Part of Movie and Show Episode details
export type CastMember = Person &
  CastCredit & {
    order?: number;
  };

// Part of Movie and Show Episode details
export type CrewMember = Person & CrewCredit;

// Part of Show and Show Season details
export type AggregatedCastMember = Person & {
  roles: (CastCredit & {
    episodeCount: number;
  })[];
  totalEpisodeCount: number;
  order: number;
};

// Part of Show and Show Season details
export type AggregatedCrewMember = Person &
  Pick<CrewCredit, "department"> & {
    jobs: (Pick<CrewCredit, "creditId" | "job"> & {
      episodeCount: number;
    })[];
    totalEpisodeCount: number;
  };

type CreditDetailed = {
  creditType: CreditTypes;
  id: string;
  department?: string;
  job?: string;
  person: Person;
};

export type MovieCreditDetailed = CreditDetailed & {
  mediaType: MediaTypes.Movie;
  media: Movie & {
    character?: string;
  };
};

export type ShowCreditDetailed = CreditDetailed & {
  mediaType: MediaTypes.Show;
  media: Show & {
    character?: string;
    episodes: ShowEpisode[];
    seasons: ShowSeason[];
  };
};
