import type { FC } from "react";
import type { ShowSeasonDetailed } from "types/show/season";
import { memo } from "react";
import Icon from "components/common/Icon";
import { MediaTypes } from "types/mediaTypes";

type SeasonDescriptionProps = {
  season: ShowSeasonDetailed;
};

const SeasonDescription: FC<SeasonDescriptionProps> = ({ season }) => {
  return (
    <div>
      <div>
        <div className="inline-block flex-shrink-0 mr-2 md:mr-4">
          <Icon size="extra-large" type={MediaTypes.Show} ariaLabel="Type: show" />
        </div>
        <h1 className="inline text-3xl md:text-4xl font-black">
          {season.name ? season.name : `Season ${season.seasonNumber}`}
        </h1>
      </div>
      <div className="mt-2 sm:mt-4">
        {season.airDate && (
          <div className="text-xl font-normal text-neutral-500">
            {new Date(season.airDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SeasonDescription);
