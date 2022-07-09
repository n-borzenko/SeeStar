import type { FC } from "react";
import type { CrewMember, AggregatedCrewMember } from "types/credit";
import { memo, useState, useCallback, useMemo } from "react";
import Button from "components/common/Button";
import CreditLandscapeCard from "components/cards/CreditLandscapeCard";
import { getGenderAndDepartment } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type UnifiedCrewMember = (CrewMember | AggregatedCrewMember) & {
  allJobs: {
    job: string;
    creditId: string;
    episodes?: number;
  }[];
};

type CrewMembersGroupProps = {
  groupTitle: string;
  credits: (CrewMember | AggregatedCrewMember)[];
};

const isCrewMember = (value: CrewMember | AggregatedCrewMember): value is CrewMember => {
  return "creditId" in value;
};

const getJobName = (job?: string) => {
  return job && job.length > 0 ? job : "Unknown job";
};

const sortCredits = (a: UnifiedCrewMember, b: UnifiedCrewMember) => {
  const jobComparison = a.allJobs[0].job.localeCompare(b.allJobs[0].job, "en");
  return jobComparison !== 0 ? jobComparison : (a.name || "").localeCompare(b.name || "", "en");
};

const CrewMembersGroup: FC<CrewMembersGroupProps> = ({ credits, groupTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleGroup = useCallback(() => setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen), []);

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

  return (
    <div className="mb-4 lg:mb-8 last:mb-0 last:lg:mb-0">
      <div className="flex justify-between items-center mb-2 lg:mb-4">
        <h6 className="text-primary">{groupTitle}</h6>
        <Button icon={`arrow-${isOpen ? "up" : "down"}`} variant="outlined" onClick={toggleGroup} />
      </div>
      {isOpen && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {sortedCredits.map((item) => (
            <CreditLandscapeCard
              key={isCrewMember(item) ? item.creditId : item.id}
              href={`/person/${item.id}`}
              cardSize="small"
              posterPath={item.profilePath}
              mediaType={MediaTypes.Person}
              title={item.name}
              infoType="text"
              infoText={getGenderAndDepartment(item.gender, item.knownForDepartment)}
              jobs={item.allJobs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CrewMembersGroup);
