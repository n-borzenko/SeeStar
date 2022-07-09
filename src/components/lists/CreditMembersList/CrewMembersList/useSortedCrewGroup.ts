import type { CrewMember, AggregatedCrewMember } from "types/credit";
import { useMemo } from "react";

type UnifiedCrewMember = (CrewMember | AggregatedCrewMember) & {
  allJobs: {
    job: string;
    creditId: string;
    episodes?: number;
  }[];
};

export const isCrewMember = (value: CrewMember | AggregatedCrewMember): value is CrewMember => {
  return "creditId" in value;
};

const getJobName = (job?: string) => {
  return job && job.length > 0 ? job : "Unknown job";
};

const sortCredits = (a: UnifiedCrewMember, b: UnifiedCrewMember) => {
  const jobComparison = a.allJobs[0].job.localeCompare(b.allJobs[0].job, "en");
  return jobComparison !== 0 ? jobComparison : (a.name || "").localeCompare(b.name || "", "en");
};

const useSortedCrewGroup = (credits: (CrewMember | AggregatedCrewMember)[]) => {
  const sortedCredits = useMemo(() => {
    const unifiedCredits = credits.map<UnifiedCrewMember>((credit) => {
      const allJobs = isCrewMember(credit)
        ? [{ job: getJobName(credit.job), creditId: credit.creditId }]
        : credit.jobs
            .map((item) => ({
              job: getJobName(item.job),
              creditId: item.creditId,
              episodes: item.episodeCount,
            }))
            .sort((a, b) => a.job.localeCompare(b.job, "en"));
      return { ...credit, allJobs };
    });
    return unifiedCredits.sort(sortCredits);
  }, [credits]);

  return sortedCredits;
};

export default useSortedCrewGroup;
