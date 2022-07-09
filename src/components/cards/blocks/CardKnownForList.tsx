import type { FC } from "react";
import type { TypedMovie } from "types/movie";
import type { TypedShow } from "types/show";
import clsx from "clsx";
import { memo } from "react";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import { getMediaName } from "helpers/textUtilities";
import { MediaTypes } from "types/mediaTypes";

type CardKnownForListProps = {
  cardSize: "small" | "adaptive";
  items?: (TypedMovie | TypedShow)[];
};

const CardKnownForList: FC<CardKnownForListProps> = ({ cardSize, items }) => {
  const blockClasses = clsx(
    "text-sm leading-4 font-normal italic text-neutral-500 self-end grid grid-cols-1 gap-1",
    cardSize === "adaptive" && "sm:text-base sm:leading-5 sm:gap-2"
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={blockClasses}>
      <p>Famous for:</p>
      {items.map((item) => {
        const { mediaType, voteAverage } = item;
        const title = mediaType === MediaTypes.Movie ? item.title : item.name;
        const releaseDate = mediaType === MediaTypes.Movie ? item.releaseDate : item.firstAirDate;

        return (
          <div key={`${item.mediaType}-${item.id}`} className="flex justify-between">
            <div className="flex min-w-1 mr-2">
              <div className="shrink-0 mr-1">
                <Icon
                  size="medium"
                  type={mediaType}
                  ariaLabel={`Type: ${getMediaName(mediaType)}`}
                />
              </div>

              <span className="text-neutral-700 text-ellipsis overflow-hidden whitespace-nowrap pr-0.5">
                {title}
              </span>

              {releaseDate && (
                <span className="hidden sm:inline">
                  <span className="text-neutral-700 whitespace-pre">, </span>
                  {new Date(releaseDate).toLocaleDateString(undefined, {
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <Rating voteAverage={voteAverage} />
          </div>
        );
      })}
    </div>
  );
};

export default memo(CardKnownForList);
