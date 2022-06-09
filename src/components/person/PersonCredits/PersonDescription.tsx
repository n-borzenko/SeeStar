import type { FC } from "react";
import type { PersonDetailed } from "types/person";
import { memo } from "react";
import Icon from "components/common/Icon";
import { MediaTypes } from "types/mediaTypes";

type PersonDescriptionProps = {
  person: PersonDetailed;
};

const PersonDescription: FC<PersonDescriptionProps> = ({ person }) => {
  return (
    <div>
      <div>
        <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
          <Icon size="extra-large" type={MediaTypes.Person} ariaLabel="Type: show" />
        </div>
        <h1 className="inline text-3xl md:text-4xl font-black">{person.name}</h1>
      </div>
      <div className="mt-2 sm:mt-4">
        {person.birthday && (
          <div className="text-xl font-normal text-neutral-500">
            {new Date(person.birthday).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PersonDescription);
