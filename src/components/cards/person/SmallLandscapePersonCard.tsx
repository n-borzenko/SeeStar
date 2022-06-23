import type { FC, PropsWithChildren } from "react";
import type { Person } from "types/person";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getGenderName from "helpers/getGenderName";
import { MediaTypes } from "types/mediaTypes";

type SmallLandscapePersonCardProps = {
  person: Person;
};

const SmallLandscapePersonCard: FC<PropsWithChildren<SmallLandscapePersonCardProps>> = ({
  person,
  children,
}) => {
  const genderName = getGenderName(person.gender);

  return (
    <Card href={`/person/${person.id}`}>
      <div className="w-full grid grid-cols-[auto_1fr]">
        <PosterImage
          src={person.profilePath}
          type={MediaTypes.Person}
          size="smallPortrait"
          rounded="left"
        />

        <div className="w-full grid grid-rows-[auto_1fr_auto] gap-1 p-2">
          <div className="flex items-center min-w-1">
            <div className="flex-shrink-0">
              <Icon size="medium" type={MediaTypes.Person} ariaLabel="Type: person" />
            </div>
            <div className="text-base font-medium leading-5 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {person.name}
            </div>
          </div>

          <div className="text-sm font-normal leading-4 text-neutral-500 capitalize">
            {genderName || ""}
          </div>

          <div className="text-sm font-normal italic leading-[1.15rem] text-neutral-700 line-clamp-3">
            {children}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(SmallLandscapePersonCard);
