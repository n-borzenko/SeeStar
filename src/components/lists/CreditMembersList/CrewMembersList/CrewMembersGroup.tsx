import type { FC } from "react";
import type { CrewMember, AggregatedCrewMember } from "types/credit";
import Link from "next/link";
import { memo, useState, useCallback, useMemo } from "react";
import Button from "components/common/Button";
import SmallLandscapePersonCard from "components/cards/person/SmallLandscapePersonCard";

type AnyCrewMember = CrewMember | AggregatedCrewMember;

type CrewMembersGroupProps = {
  groupTitle: string;
  credits: AnyCrewMember[];
};

const isCrewMember = (value: AnyCrewMember): value is CrewMember => {
  return "creditId" in value;
};

const getJobName = (job?: string) => {
  return job && job.length > 0 ? job : "Unknown job";
};

const sortJobs = (
  a: AggregatedCrewMember["jobs"][number],
  b: AggregatedCrewMember["jobs"][number]
) => {
  return getJobName(a.job).localeCompare(getJobName(b.job), "en");
};

const sortCredits = (a: AnyCrewMember, b: AnyCrewMember) => {
  const aJob = getJobName(isCrewMember(a) ? a.job : a.jobs[0].job);
  const bJob = getJobName(isCrewMember(b) ? b.job : b.jobs[0].job);
  const jobComparison = aJob.localeCompare(bJob, "en");
  return jobComparison !== 0 ? jobComparison : (a.name || "").localeCompare(b.name || "", "en");
};

const CrewMembersGroup: FC<CrewMembersGroupProps> = ({ credits, groupTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleGroup = useCallback(() => setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen), []);

  const sortedCredits = useMemo(() => {
    const preSortedCredits = credits.map<AnyCrewMember>((credit) =>
      isCrewMember(credit) ? credit : { ...credit, jobs: credit.jobs.sort(sortJobs) }
    );
    return preSortedCredits.sort(sortCredits);
  }, [credits]);

  return (
    <div className="mb-4 lg:mb-8 last:mb-0 last:lg:mb-0">
      <div className="flex justify-between items-center mb-2 lg:mb-4">
        <h6 className="text-primary">{groupTitle}</h6>
        <Button icon={`arrow-${isOpen ? "up" : "down"}`} variant="outlined" onClick={toggleGroup} />
      </div>
      {isOpen && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {sortedCredits.map((credit) =>
            isCrewMember(credit) ? (
              <SmallLandscapePersonCard person={credit} key={credit.creditId}>
                <Link href={`/credit/${credit.creditId}`}>
                  <a className="link text-ellipsis overflow-hidden whitespace-nowrap">
                    {getJobName(credit.job)}
                  </a>
                </Link>
              </SmallLandscapePersonCard>
            ) : (
              <SmallLandscapePersonCard person={credit} key={credit.id}>
                {credit.jobs.map((job, index) => (
                  <div key={job.creditId} className="inline-flex items-baseline max-w-full">
                    <Link href={`/credit/${job.creditId}`}>
                      <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                        {getJobName(job.job)}
                      </a>
                    </Link>
                    <span className="shrink-0">[{job.episodeCount} ep.]</span>
                    {index < credit.jobs.length - 1 && <span className="mr-2">,</span>}
                  </div>
                ))}
              </SmallLandscapePersonCard>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default memo(CrewMembersGroup);
