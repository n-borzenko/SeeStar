import type { FC, PropsWithChildren } from "react";
import type { Person } from "types/person";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getGenderName from "helpers/getGenderName";
import { MediaTypes } from "types/mediaTypes";

type PersonCardProps = {
  person: Person;
};

const PersonCard: FC<PropsWithChildren<PersonCardProps>> = ({ person, children }) => {
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

        <div className="w-full grid grid-rows-[auto_1fr_auto] gap-1 sm:gap-2 p-2">
          <div className="flex items-center min-w-1">
            <div className="flex-shrink-0">
              <Icon size="medium" type={MediaTypes.Person} ariaLabel="Type: person" />
            </div>
            <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {person.name}
            </div>
          </div>

          <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500 capitalize">
            {genderName || ""}
          </div>

          <div className="text-sm sm:text-base font-normal italic leading-[1.15rem] sm:leading-5 text-neutral-700">
            {children}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(PersonCard);
