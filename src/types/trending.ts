import { TypedMovie } from "types/movie";
import { TypedShow } from "types/show";

export type TrendingItem = TypedMovie | TypedShow;

export type TrendingData = {
  page: number;
  results: TrendingItem[];
  totalResults: number;
  totalPages: number;
};
