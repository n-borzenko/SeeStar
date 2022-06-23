import type { FC } from "react";
import type { CastMember, CrewMember } from "types/credit";
import { memo, useMemo } from "react";
import BlockHeader from "components/common/BlockHeader";
import CardsList, { listLengthLimit } from "components/common/CardsList";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import { MediaTypes } from "types/mediaTypes";

type CreditsWidgetProps = {
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  href: string;
};

const sortCredits = <T extends CastMember | CrewMember>(a: T, b: T) => {
  return (b.popularity || 0) - (a.popularity || 0);
};

const getTopUniqueCredits = <T extends CastMember | CrewMember>(items: T[]) => {
  return items.reduce<T[]>((result, credit) => {
    if (
      result.length >= listLengthLimit ||
      result.findIndex((item) => item.id === credit.id) !== -1
    ) {
      return result;
    }
    return [...result, credit];
  }, []);
};

const CreditsWidget: FC<CreditsWidgetProps> = ({ credits, href }) => {
  const items = useMemo(
    () => ({
      cast: getTopUniqueCredits(credits.cast),
      crew: getTopUniqueCredits(credits.crew.sort(sortCredits)),
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
          <CardsList items={items.cast}>
            {(credit) => (
              <MediumPortraitCard
                href={`/person/${credit.id}`}
                posterPath={credit.profilePath}
                title={credit.name}
                mediaType={MediaTypes.Person}
                job={credit.character || "Unknown character"}
              />
            )}
          </CardsList>
        </>
      )}
      {items.crew.length > 0 && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">Crew</h6>
          <CardsList items={items.crew}>
            {(credit) => (
              <MediumPortraitCard
                href={`/person/${credit.id}`}
                posterPath={credit.profilePath}
                title={credit.name}
                mediaType={MediaTypes.Person}
                job={`${credit.department}, ${credit.job}`}
              />
            )}
          </CardsList>
        </>
      )}
    </div>
  );
};

export default memo(CreditsWidget);
