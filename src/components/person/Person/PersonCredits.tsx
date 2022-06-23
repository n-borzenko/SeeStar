import type { FC } from "react";
import type { AnyCredit } from "types/credit";
import type { PersonExtended } from "types/person";
import { memo, useMemo } from "react";
import MediumPortraitCard from "components/cards/MediumPortraitCard";
import BlockHeader from "components/common/BlockHeader";
import { listLengthLimit, CustomCardsList } from "components/common/CardsList";
import { MediaTypes } from "types/mediaTypes";

type PersonCreditsProps = {
  person: PersonExtended;
};

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

const getKey = (credit: AnyCredit) => {
  return credit.creditId;
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
      <BlockHeader title="Top credits" href={`/person/${person.id}/credits`} />
      {items.cast.length > 0 && (
        <>
          <h6 className="lg:mb-4 text-primary">As cast member</h6>
          <CustomCardsList items={items.cast} getKey={getKey}>
            {(credit) => (
              <MediumPortraitCard
                href={`/${credit.mediaType === MediaTypes.Movie ? "movie" : "show"}/${credit.id}`}
                posterPath={credit.posterPath}
                title={credit.mediaType === MediaTypes.Movie ? credit.title : credit.name}
                startDate={
                  credit.mediaType === MediaTypes.Movie ? credit.releaseDate : credit.firstAirDate
                }
                voteAverage={credit.voteAverage}
                infoType="rating"
                mediaType={credit.mediaType}
                job={credit.character}
              />
            )}
          </CustomCardsList>
        </>
      )}
      {items.crew.length > 0 && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">As crew member</h6>
          <CustomCardsList items={items.crew} getKey={getKey}>
            {(credit) => (
              <MediumPortraitCard
                href={`/${credit.mediaType === MediaTypes.Movie ? "movie" : "show"}/${credit.id}`}
                posterPath={credit.posterPath}
                title={credit.mediaType === MediaTypes.Movie ? credit.title : credit.name}
                startDate={
                  credit.mediaType === MediaTypes.Movie ? credit.releaseDate : credit.firstAirDate
                }
                voteAverage={credit.voteAverage}
                infoType="rating"
                mediaType={credit.mediaType}
                job={`${credit.department}, ${credit.job}`}
              />
            )}
          </CustomCardsList>
        </>
      )}
    </div>
  );
};

export default memo(PersonCredits);
