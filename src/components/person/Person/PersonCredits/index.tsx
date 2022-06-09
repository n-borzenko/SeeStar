import type { FC } from "react";
import type { AnyCredit } from "types/credit";
import type { PersonExtended } from "types/person";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import { MediaTypes } from "types/mediaTypes";
import PersonCreditList from "./PersonCreditList";

type PersonCreditsProps = {
  person: PersonExtended;
};

const listLengthLimit = 10;

const sortCredits = (a: AnyCredit, b: AnyCredit) => {
  if (a.mediaType === MediaTypes.Show && b.mediaType === MediaTypes.Show) {
    const result = (b.episodeCount || 0) - (a.episodeCount || 0);
    if (result !== 0) {
      return result;
    }
  }
  return (b.popularity || 0) - (a.popularity || 0);
};

const getTopUniqueCredits = <T extends AnyCredit>(items: T[]) => {
  return items.sort(sortCredits).reduce<T[]>((result, credit) => {
    if (
      result.length >= listLengthLimit ||
      result.findIndex((item) => item.id === credit.id) !== -1
    ) {
      return result;
    }
    return [...result, credit];
  }, []);
};

const PersonCredits: FC<PersonCreditsProps> = ({ person }) => {
  const items = useMemo(
    () => ({
      cast: getTopUniqueCredits(person.combinedCredits.cast),
      crew: getTopUniqueCredits(person.combinedCredits.crew),
    }),
    [person.combinedCredits]
  );

  if (items.cast.length === 0 && items.crew.length === 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Credits" href={`/person/${person.id}/credits`} />
      {items.cast.length > 0 && (
        <>
          <h6 className="lg:mb-4 text-primary">As cast member</h6>
          <PersonCreditList items={items.cast}>
            {(item) => <span>{item.character}</span>}
          </PersonCreditList>
        </>
      )}
      {items.crew.length > 0 && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">As crew member</h6>
          <PersonCreditList items={items.crew}>
            {(item) => (
              <span>
                {item.department}, {item.job}
              </span>
            )}
          </PersonCreditList>
        </>
      )}
    </div>
  );
};

export default memo(PersonCredits);
