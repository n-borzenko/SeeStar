import type { FC } from "react";
import type { MovieCastCredit, ShowCastCredit } from "types/credit";
import type { PersonExtended } from "types/person";
import { memo, useMemo, Fragment } from "react";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import { MediaTypes } from "types/mediaTypes";
import MovieCreditCard from "./MovieCreditCard";
import ShowCreditCard from "./ShowCreditCard";

type PersonCreditsProps = {
  person: PersonExtended;
};

const listLengthLimit = 10;

const sortFunction = (a: MovieCastCredit | ShowCastCredit, b: MovieCastCredit | ShowCastCredit) => {
  if (a.mediaType === MediaTypes.Show && b.mediaType === MediaTypes.Show) {
    const result = (b.episodeCount || 0) - (a.episodeCount || 0);
    if (result !== 0) {
      return result;
    }
  }
  return (b.popularity || 0) - (a.popularity || 0);
};

const PersonCredits: FC<PersonCreditsProps> = ({ person }) => {
  const items = useMemo(
    () => ({
      cast: person.combinedCredits.cast.sort(sortFunction).slice(0, listLengthLimit),
      crew: person.combinedCredits.crew.sort(sortFunction).slice(0, listLengthLimit),
    }),
    [person.combinedCredits]
  );
  return (
    <div>
      <BlockHeader title="Work" />
      {items.cast.length && (
        <>
          <h6 className="lg:mb-4 text-primary">As cast member</h6>
          <CardsList items={items.cast}>
            {(item) => (
              <Fragment key={`${item.mediaType}-${item.id}`}>
                {item.mediaType === MediaTypes.Movie && (
                  <MovieCreditCard movie={item}>
                    <span>{item.character}</span>
                  </MovieCreditCard>
                )}
                {item.mediaType === MediaTypes.Show && (
                  <ShowCreditCard show={item}>
                    <span>{item.character}</span>
                  </ShowCreditCard>
                )}
              </Fragment>
            )}
          </CardsList>
        </>
      )}
      {items.crew.length && (
        <>
          <h6 className="mt-4 lg:mt-8 lg:mb-4 text-primary">As crew member</h6>
          <CardsList items={items.crew}>
            {(item) => (
              <Fragment key={`${item.mediaType}-${item.id}`}>
                {item.mediaType === MediaTypes.Movie && (
                  <MovieCreditCard movie={item}>
                    <span>
                      {item.department}, {item.job}
                    </span>
                  </MovieCreditCard>
                )}
                {item.mediaType === MediaTypes.Show && (
                  <ShowCreditCard show={item}>
                    <span>
                      {item.department}, {item.job}
                    </span>
                  </ShowCreditCard>
                )}
              </Fragment>
            )}
          </CardsList>
        </>
      )}
    </div>
  );
};

export default memo(PersonCredits);
