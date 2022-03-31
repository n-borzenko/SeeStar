import type { FC } from "react";
import type { ShowDetailed } from "types/show";
import { memo } from "react";
import Icon from "components/common/Icon";
import Rating from "components/common/Rating";
import { MediaTypes } from "types/mediaTypes";

type ShowDescriptionProps = {
  show: ShowDetailed;
};

const ShowDescription: FC<ShowDescriptionProps> = ({ show }) => {
  return (
    <div>
      <div>
        <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
          <Icon size="extra-large" type={MediaTypes.Show} ariaLabel="Type: show" />
        </div>
        <h1 className="inline text-3xl md:text-4xl font-black">{show.name}</h1>
      </div>
      <div className="flex items-center mt-2 sm:mt-4">
        {show.firstAirDate && (
          <div className="text-xl font-normal text-neutral-500">
            {new Date(show.firstAirDate).toLocaleDateString()}
            {show.lastAirDate && ` - ${new Date(show.lastAirDate).toLocaleDateString()}`}
          </div>
        )}
        <div className="ml-auto flex">
          <Rating voteAverage={show.voteAverage} voteCount={show.voteCount} size="extra-large" />
        </div>
      </div>
    </div>
  );
};

export default memo(ShowDescription);
