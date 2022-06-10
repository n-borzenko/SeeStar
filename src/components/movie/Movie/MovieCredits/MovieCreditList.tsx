import type { ReactNode } from "react";
import type { CastMember, CrewMember } from "types/credit";
import { memo, Fragment } from "react";
import Card from "components/common/Card";
import { CustomCardsList } from "components/common/CardsList";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type MovieCreditListProps<T> = {
  items: T[];
  children: (item: T) => ReactNode;
};

const getKey = <T extends CastMember | CrewMember>(item: T) => {
  return item.creditId;
};

const posterSizeName = "mediumPortrait";

const MovieCreditList = <T extends CastMember | CrewMember>({
  items,
  children,
}: MovieCreditListProps<T>) => {
  const posterSize = getImageSize(posterSizeName);

  return (
    <CustomCardsList items={items} getKey={getKey}>
      {(person) => (
        <Fragment key={person.creditId}>
          <Card href={`/person/${person.id}`} direction="vertical">
            <div className="flex-shrink-0">
              <PosterImage
                src={person.profilePath}
                type={MediaTypes.Person}
                size={posterSizeName}
                rounded="top"
              />
            </div>

            <div
              className="w-full h-full grid grid-rows-[auto_1fr] gap-1 sm:gap-2 p-2"
              style={{ maxWidth: `${posterSize.width}px` }}
            >
              <div className="line-clamp-2">
                <div className="inline-block">
                  <Icon size="medium" type={MediaTypes.Person} ariaLabel="Type: person" />
                </div>
                <span className="text-base font-medium leading-5 ml-1">{person.name}</span>
              </div>

              <p className="text-sm font-normal italic leading-4 line-clamp-2 text-neutral-700 self-end">
                {children(person)}
              </p>
            </div>
          </Card>
        </Fragment>
      )}
    </CustomCardsList>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(MovieCreditList) as typeof MovieCreditList;
