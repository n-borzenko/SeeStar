import type { FC } from "react";
import type { CrewMember, AggregatedCrewMember } from "types/credit";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import CreditLandscapeCard from "components/cards/CreditLandscapeCard";
import { ButtonLink } from "components/common/Button";
import PaginationContainer from "components/common/PaginationContainer";
import { getGenderAndDepartment } from "helpers/textUtilities";
import usePageParameter from "hooks/common/usePageParameter";
import { MediaTypes } from "types/mediaTypes";
import useSortedCrewGroup, { isCrewMember } from "./useSortedCrewGroup";

type CrewMembersGroupProps = {
  groupTitle: string;
  credits: (CrewMember | AggregatedCrewMember)[];
  isSelected: boolean;
};

const getQueryParameters = (
  parameters: {
    [key: string]: string | string[] | undefined;
  },
  isSelected: boolean,
  groupTitle: string
) => {
  const { page, crew_group, ...query } = parameters;
  return isSelected ? query : { ...query, ["crew_group"]: groupTitle };
};

const CrewMembersGroup: FC<CrewMembersGroupProps> = ({ credits, groupTitle, isSelected }) => {
  const router = useRouter();
  const page = usePageParameter();
  const sortedCredits = useSortedCrewGroup(credits);

  return (
    <div className="mb-4 lg:mb-8 last:mb-0 last:lg:mb-0">
      <div className="flex justify-between items-center mb-2 lg:mb-4">
        <h6 className="text-primary">{groupTitle}</h6>
        <Link
          href={{
            pathname: router.pathname,
            query: getQueryParameters(router.query, isSelected, groupTitle),
          }}
          passHref
        >
          <ButtonLink
            icon={`arrow-${isSelected ? "up" : "down"}`}
            variant="outlined"
            ariaLabel={`${isSelected ? "Close" : "Open"} ${groupTitle} crew group`}
          />
        </Link>
      </div>

      {isSelected && (
        <PaginationContainer items={sortedCredits} page={page}>
          {(limitedCredits) => (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              {limitedCredits.map((item) => (
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
        </PaginationContainer>
      )}
    </div>
  );
};

export default memo(CrewMembersGroup);
