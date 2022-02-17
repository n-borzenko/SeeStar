import type { Movie } from "types/movie";
import type { Person } from "types/person";
import type { Show } from "types/show";
import { MediaTypes } from "types/mediaTypes";

export type SearchItemMovie = Movie & {
  mediaType: MediaTypes.Movie;
};

export type SearchItemShow = Show & {
  mediaType: MediaTypes.Show;
};

export type SearchItemPerson = Person & {
  mediaType: MediaTypes.Person;
  knownFor?: (SearchItemMovie | SearchItemShow)[];
};

export type SearchItem = SearchItemMovie | SearchItemShow | SearchItemPerson;
