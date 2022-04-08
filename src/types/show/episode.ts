import type { GuestStarMember, CastMember, CrewMember } from "types/credit";

export type ShowEpisode = {
  airDate?: string;
  episodeNumber?: number;
  id: number;
  name: string;
  overview?: string;
  productionCode?: string;
  seasonNumber?: number;
  stillPath?: string | null;
  voteAverage?: number;
  voteCount?: number;
};

export type ShowEpisodeDetailed = ShowEpisode & {
  crew: CrewMember[];
  guestStars: CastMember[];
};

export type ShowEpisodeExtended = ShowEpisodeDetailed & {
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
    guestStars: GuestStarMember[];
  };
};
