import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo } from "react";
import TitledPageContainer from "components/common/TitledPageContainer";
import UniversalCreditsWidget from "components/widgets/UniversalCreditsWidget";
import usePersonCredits from "hooks/credits/usePersonCredits";
import PersonSummary from "./PersonSummary";

type PersonProps = {
  person: PersonExtended;
};

const Person: FC<PersonProps> = ({ person }) => {
  const credits = usePersonCredits(person.combinedCredits);
  return (
    <TitledPageContainer title={`SeeStar • Person • ${person.name}`}>
      <div>
        <PersonSummary person={person} />
        <UniversalCreditsWidget
          credits={credits}
          href={`/person/${person.id}/credits`}
          castGroupTitle="As cast member"
          crewGroupTitle="As crew member"
        />
      </div>
    </TitledPageContainer>
  );
};

export default memo(Person);
