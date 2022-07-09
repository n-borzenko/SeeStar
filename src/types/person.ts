import type {
  MovieCastCredit,
  MovieCrewCredit,
  ShowCastCredit,
  ShowCrewCredit,
} from "types/credit";
import type { ExternalIds } from "types/externalIds";
import { TypedMovie } from "types/movie";
import { TypedShow } from "types/show";
import { MediaTypes } from "types/mediaTypes";

export type Person = {
  adult?: boolean;
  gender?: number | null;
  id: number;
  knownForDepartment?: string;
  knownFor?: (TypedMovie | TypedShow)[];
  name?: string;
  originalName?: string;
  popularity?: number;
  profilePath?: string | null;
};

export type TypedPerson = Person & {
  mediaType: MediaTypes.Person;
};

export type PersonDetailed = Person & {
  alsoKnownAs?: string[];
  biography?: string;
  birthday?: string | null;
  deathday?: string | null;
  imdbId?: string;
  homepage?: string;
  placeOfBirth?: string | null;
};

export type PersonExtended = PersonDetailed & {
  combinedCredits: {
    cast: (MovieCastCredit | ShowCastCredit)[];
    crew: (MovieCrewCredit | ShowCrewCredit)[];
  };
  externalIds: ExternalIds;
};
