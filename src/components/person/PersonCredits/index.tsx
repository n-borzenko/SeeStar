import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo } from "react";
import MediaDescription from "components/common/MediaDescription";
import TitledPageContainer from "components/common/TitledPageContainer";
import { MediaTypes } from "types/mediaTypes";
import PersonCreditsList from "./PersonCreditsList";

type PersonCreditsProps = {
  person: PersonExtended;
};

const PersonCredits: FC<PersonCreditsProps> = ({ person }) => {
  return (
    <TitledPageContainer title={`SeeStar • Person credits • ${person.name}`}>
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <MediaDescription
          mediaType={MediaTypes.Person}
          title={person.name}
          startDate={person.birthday}
          endDate={person.deathday}
        />
        <PersonCreditsList credits={person.combinedCredits} personId={person.id} />
      </div>
    </TitledPageContainer>
  );
};

export default memo(PersonCredits);
