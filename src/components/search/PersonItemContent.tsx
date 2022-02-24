import type { FC } from "react";
import type { SearchItemPerson } from "types/search";
import { memo } from "react";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getGenderName from "helpers/getGenderName";
import { MediaTypes } from "types/mediaTypes";
import WorkItemsList from "./WorkItemsList";

type PersonItemContentProps = {
  item: SearchItemPerson;
  posterSize: "small" | "medium" | "large";
};

const mediaType = MediaTypes.Person;

const PersonItemContent: FC<PersonItemContentProps> = ({ item, posterSize }) => {
  const genderName = getGenderName(item.gender);
  return (
    <div className="bg-white shadow-card rounded-lg flex">
      <div className="flex-shrink-0">
        <PosterImage src={item.profilePath} type={mediaType} size={posterSize} rounded="left" />
      </div>

      <div className="w-full grid grid-rows-[auto_auto_1fr] gap-1 p-2">
        <div className="flex items-center min-w-1">
          <div className="flex-shrink-0">
            <Icon size="medium" type={mediaType} ariaLabel="Type: person" />
          </div>
          <div className="text-base font-medium leading-5 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
            {item.name}
          </div>
        </div>

        <div className="text-sm font-normal leading-4 text-neutral-500 text-ellipsis overflow-hidden whitespace-nowrap">
          {genderName && (
            <>
              <span className="capitalize">{genderName}</span>
              <span className="last:hidden">, </span>
            </>
          )}
          {item.knownForDepartment && (
            <>
              <span className="first:capitalize">known </span>
              <span>for {item.knownForDepartment}</span>
            </>
          )}
        </div>

        {item.knownFor && (
          <div className="grid grid-cols-1 gap-1 self-end">
            <div className="text-sm font-normal leading-4 text-neutral-500">Famous for:</div>
            <WorkItemsList items={item.knownFor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PersonItemContent);
