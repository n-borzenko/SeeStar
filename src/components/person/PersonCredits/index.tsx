import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo } from "react";
import FullCreditList from "./FullCreditList";
import PersonDescription from "./PersonDescription";

type PersonCreditsProps = {
  person: PersonExtended;
};

const PersonCredits: FC<PersonCreditsProps> = ({ person }) => {
  return (
    <div className="min-h-full flex flex-col">
      <PersonDescription person={person} />
      <FullCreditList credits={person.combinedCredits} personId={person.id} />
    </div>
  );
};

export default memo(PersonCredits);
