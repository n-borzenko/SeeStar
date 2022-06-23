import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import { MediaTypes } from "types/mediaTypes";
import FullCreditList from "./FullCreditList";

type PersonCreditsProps = {
  person: PersonExtended;
};

const PersonCredits: FC<PersonCreditsProps> = ({ person }) => {
  return (
    <div className="min-h-full flex flex-col">
      <MediaDescription
        mediaType={MediaTypes.Person}
        title={person.name}
        startDate={person.birthday}
        endDate={person.deathday}
      />
      <FullCreditList credits={person.combinedCredits} personId={person.id} />
    </div>
  );
};

export default memo(PersonCredits);
