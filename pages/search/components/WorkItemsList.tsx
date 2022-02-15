import { FC, memo } from "react";
import { MediaTypes, SearchItemMovie, SearchItemShow } from "types/search";
import Icon from "components/Icon";
import Rating from "components/Rating";

type WorkItemsListProps = {
  items: (SearchItemMovie | SearchItemShow)[];
};

const WorkItemsList: FC<WorkItemsListProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        const title = item.mediaType === MediaTypes.Movie ? item.title : item.name;
        const releaseDate =
          item.mediaType === MediaTypes.Movie ? item.releaseDate : item.firstAirDate;

        return (
          <div key={`${item.mediaType}-${item.id}`} className="flex justify-between">
            <div className="flex min-w-1">
              <div className="flex-shrink-0">
                <Icon size="medium" type={item.mediaType} />
              </div>
              <div className="text-sm font-normal leading-4 text-neutral-700 ml-1 text-ellipsis overflow-hidden whitespace-nowrap">
                {title}
              </div>

              {releaseDate && (
                <>
                  <span className="text-sm font-normal leading-4 text-neutral-700 whitespace-pre hidden sm:inline">
                    ,{" "}
                  </span>
                  <div className="text-sm font-normal leading-4 text-neutral-500 hidden sm:block">
                    {new Date(releaseDate).toLocaleDateString(undefined, {
                      year: "numeric",
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="ml-2 hidden sm:block">
              <Rating voteAverage={item.voteAverage} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(WorkItemsList);