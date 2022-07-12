import type { TypedMovie } from "types/movie";
import type { TypedPerson } from "types/person";
import type { TypedShow } from "types/show";

export type SearchItem = TypedMovie | TypedShow | TypedPerson;

export type SearchData = {
  page: number;
  results: SearchItem[];
  totalResults: number;
  totalPages: number;
};
