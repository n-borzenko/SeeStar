import type { Movie } from "types/movie";
import type { Person } from "types/person";
import type { Show } from "types/show";
import { MediaTypes } from "types/mediaTypes";

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

// Part of Movie details
export type CastMember = Person &
  CastCredit & {
    castId: number;
    order?: number;
  };

// Part of Movie details
export type CrewMember = Person &
  CrewCredit & {
    crewId: number;
  };
