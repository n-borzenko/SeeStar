import type { FC } from "react";
import type { CastMember, CrewMember } from "types/credit";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import MovieCreditList from "./MovieCreditList";

type MovieCreditsProps = {
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  href: string;
};

const listLengthLimit = 10;

const sortCredits = <T extends CastMember | CrewMember>(a: T, b: T) => {
  const aOrder = "order" in a ? a.order : 0;
  const bOrder = "order" in b ? b.order : 0;
  const orderDifference = (aOrder || 0) - (bOrder || 0);
  return orderDifference !== 0 ? orderDifference : (b.popularity || 0) - (a.popularity || 0);
};

const getTopUniqueCredits = <T extends CastMember | CrewMember>(items: T[]) => {
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

const MovieCredits: FC<MovieCreditsProps> = ({ credits, href }) => {
  const items = useMemo(
    () => ({
      cast: getTopUniqueCredits(credits.cast),
      crew: getTopUniqueCredits(credits.crew),
    }),
    [credits]
  );

  if (items.cast.length === 0 && items.crew.length === 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Top credits" href={href} />
      {items.cast.length > 0 && (
        <>
          <h6 className="lg:mb-4 text-primary">Cast</h6>
          <MovieCreditList items={items.cast}>
            {(person) => <span>{person.character}</span>}
          </MovieCreditList>
        </>
      )}
      {items.crew.length > 0 && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">Crew</h6>
          <MovieCreditList items={items.crew}>
            {(person) => (
              <span>
                {person.department}, {person.job}
              </span>
            )}
          </MovieCreditList>
        </>
      )}
    </div>
  );
};

export default memo(MovieCredits);
