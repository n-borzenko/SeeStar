export type ProductionCompany = {
  name: string;
  id: number;
  logoPath?: string | null;
  originCountry?: string;
};

export type ProductionCountry = { iso_3166_1: string; name: string };
