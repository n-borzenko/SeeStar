export type ProductionCompany = {
  name: string;
  id: number;
  logoPath?: string | null;
  originCountry?: string;
};

export type ProductionCountry = { iso31661: string; name: string };
