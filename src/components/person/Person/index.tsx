import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo } from "react";
import PersonSummary from "./PersonSummary";
import PersonCredits from "./PersonCredits";

type PersonProps = {
  person: PersonExtended;
};

const Person: FC<PersonProps> = ({ person }) => {
  return (
    <div>
      <PersonSummary person={person} />
      <PersonCredits person={person} />
    </div>
  );
};

export default memo(Person);
