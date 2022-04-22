import type { FC, PropsWithChildren } from "react";
import type { ShowCastCredit } from "types/credit";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import PosterImage from "components/common/PosterImage";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type ShowCreditCardProps = {
  show: ShowCastCredit;
};

const posterSizeName = "mediumPortrait";

const ShowCreditCard: FC<PropsWithChildren<ShowCreditCardProps>> = ({ show, children }) => {
  const posterSize = getImageSize(posterSizeName);

  return (
    <Card href={`/show/${show.id}`} direction="vertical">
      <div className="flex-shrink-0">
        <PosterImage
          src={show.posterPath}
          type={MediaTypes.Show}
          size={posterSizeName}
          rounded="top"
        />
      </div>

      <div
        className="w-full h-full grid grid-rows-[auto_auto_1fr] gap-1 sm:gap-2 p-2"
        style={{ maxWidth: `${posterSize.width}px` }}
      >
        <div className="line-clamp-2">
          <div className="inline-block">
            <Icon size="medium" type={MediaTypes.Show} ariaLabel="Type: movie" />
          </div>
          <span className="text-base font-medium leading-5 ml-1">{show.name}</span>
        </div>

        <div className="flex items-center justify-between">
          {show.firstAirDate && (
            <p className="text-sm font-normal leading-4 text-neutral-500">
              {new Date(show.firstAirDate).toLocaleDateString()}
            </p>
          )}
          <div className="ml-auto">
            <Rating voteAverage={show.voteAverage} />
          </div>
        </div>

        {children && (
          <p className="text-sm font-normal italic leading-4 line-clamp-2 text-neutral-700 self-end">
            {children}
          </p>
        )}
      </div>
    </Card>
  );
};

export default memo(ShowCreditCard);
