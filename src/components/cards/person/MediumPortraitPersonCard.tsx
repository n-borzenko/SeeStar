import type { ReactNode } from "react";
import type { Person } from "types/person";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type MediumPortraitPersonCardProps<T> = {
  person: T;
  children: (item: T) => ReactNode;
};

const posterSizeName = "mediumPortrait";

const MediumPortraitPersonCard = <T extends Person>({
  person,
  children,
}: MediumPortraitPersonCardProps<T>) => {
  const posterSize = getImageSize(posterSizeName);

  return (
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
        className="w-full h-full grid grid-rows-[auto_1fr] gap-2 p-2"
        style={{ maxWidth: `${posterSize.width}px` }}
      >
        <div className="line-clamp-2">
          <div className="inline-block mr-1">
            <Icon size="medium" type={MediaTypes.Person} ariaLabel="Type: person" />
          </div>
          <span className="text-base font-medium leading-5 break-words">{person.name}</span>
        </div>

        <p className="text-sm font-normal italic leading-4 line-clamp-2 text-neutral-700 self-end break-words">
          {children(person)}
        </p>
      </div>
    </Card>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(MediumPortraitPersonCard) as typeof MediumPortraitPersonCard;
