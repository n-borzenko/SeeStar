import type { FC } from "react";
import type { CrewMember } from "types/credit";
import Link from "next/link";
import { memo, useState, useCallback } from "react";
import Button from "components/common/Button";
import PersonCard from "./PersonCard";

type CrewCreditGroupProps = {
  groupTitle: string;
  credits: CrewMember[];
};

const CrewCreditGroup: FC<CrewCreditGroupProps> = ({ credits, groupTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleGroup = useCallback(() => setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen), []);

  return (
    <div className="mb-4 lg:mb-8 last:mb-0 last:lg:mb-0">
      <div className="flex justify-between items-center mb-2 lg:mb-4">
        <h6 className="text-primary">{groupTitle}</h6>
        <Button icon={`arrow-${isOpen ? "up" : "down"}`} variant="outlined" onClick={toggleGroup} />
      </div>
      {isOpen && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {credits.map((credit) => (
            <PersonCard person={credit} key={credit.creditId}>
              <Link href={`/credit/${credit.creditId}`}>
                <a className="link text-ellipsis overflow-hidden whitespace-nowrap pr-1">
                  {credit.job}
                </a>
              </Link>
            </PersonCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CrewCreditGroup);
