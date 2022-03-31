import type { AggregatedCastMember, AggregatedCrewMember } from "types/credit";
import type { ShowEpisodeDetailed } from "types/show/episode";

export type ShowSeason = {
  airDate?: string;
  episodeCount?: number;
  id: number;
  name: string;
  overview?: string;
  posterPath?: string | null;
  seasonNumber?: number;
};

export type ShowSeasonDetailed = Exclude<ShowSeason, "episodeCount"> & {
  episodes: ShowEpisodeDetailed[];
};

export type ShowSeasonExtended = ShowSeasonDetailed & {
  aggregateCredits: {
    cast: AggregatedCastMember[];
    crew: AggregatedCrewMember[];
  };
};
