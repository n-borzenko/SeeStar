import type { FC } from "react";
import type { Show } from "types/show";
import { memo } from "react";
import Card from "components/common/Card";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import PosterImage from "components/common/PosterImage";
import useExtraSmallScreen from "hooks/common/useExtraSmallScreen";
import { MediaTypes } from "types/mediaTypes";

type ShowCardProps = {
  show: Show;
};

const ShowCard: FC<ShowCardProps> = ({ show }) => {
  const isExtraSmallScreen = useExtraSmallScreen();

  return (
    <Card href={`/show/${show.id}`}>
      <div className="w-full grid grid-cols-[auto_1fr]">
        <PosterImage
          src={show.posterPath}
          type={MediaTypes.Show}
          size={isExtraSmallScreen ? "smallPortrait" : "mediumPortrait"}
          rounded="left"
        />

        <div className="w-full grid grid-rows-[auto_1fr_auto] gap-1 sm:gap-2 p-2">
          <div className="flex items-center min-w-1">
            <div className="flex-shrink-0">
              <Icon size="medium" type={MediaTypes.Show} ariaLabel="Type: show" />
            </div>
            <div className="text-base sm:text-lg font-medium leading-5 sm:leading-6 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
              {show.name}
            </div>
          </div>

          <div className="flex items-center justify-between self-start">
            {show.firstAirDate && (
              <div className="text-sm sm:text-base font-normal leading-4 sm:leading-5 text-neutral-500">
                {new Date(show.firstAirDate).toLocaleDateString()}
              </div>
            )}
            <div className="ml-auto">
              <Rating voteAverage={show.voteAverage} />
            </div>
          </div>

          {show.overview && (
            <div className="text-sm sm:text-base font-normal leading-[1.15rem] sm:leading-5 text-neutral-700 line-clamp-4">
              {show.overview}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default memo(ShowCard);
