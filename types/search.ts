export enum MediaTypes {
  Any = "multi",
  Movie = "movie",
  Show = "tv",
  Person = "person",
}

export type SearchItemMovie = {
  id: number;
  adult?: boolean;
  title?: string;
  posterPath?: string | null;
  overview?: string;
  releaseDate?: string;
  originalTitle?: string;
  genreIds?: number[];
  mediaType: MediaTypes.Movie;
  originalLanguage?: string;
  backdropPath?: string | null;
  popularity?: number;
  voteCount?: number;
  video?: boolean;
  voteAverage?: number;
};

export type SearchItemShow = {
  id: number;
  posterPath?: string | null;
  popularity?: number;
  overview?: string;
  backdropPath?: string | null;
  voteAverage?: number;
  mediaType: MediaTypes.Show;
  firstAirDate?: string;
  originCountry?: string[];
  genreIds?: number[];
  originalLanguage?: string;
  voteCount?: number;
  name?: string;
  originalName?: string;
};

export type SearchItemPerson = {
  id: number;
  profile_path?: string | null;
  adult?: boolean;
  mediaType: MediaTypes.Person;
  knownFor?: SearchItemMovie | SearchItemShow[];
  name?: string;
  popularity?: number;
};

export type SearchItem = SearchItemMovie | SearchItemShow | SearchItemPerson;
