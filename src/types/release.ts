export enum ReleaseType {
  Premiere = 1,
  TheatricalLimited = 2,
  Theatrical = 3,
  Digital = 4,
  Physical = 5,
  TV = 6,
}

export type ReleaseDate = {
  certification: string;
  iso_639_1: string;
  note: string;
  releaseDate: string;
  type: ReleaseType;
};

export type CountryCertification = {
  iso_3166_1: string;
  releaseDates: ReleaseDate[];
};
