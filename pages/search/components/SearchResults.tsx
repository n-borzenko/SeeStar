import { memo } from "react";
import { MediaTypes } from "types/search";
import { useAppSelector } from "store/hooks";
import MovieItemContent from "./MovieItemContent";
import ShowItemContent from "./ShowItemContent";
import PersonItemContent from "./PersonItemContent";

const posterSize = "small";

const SearchResults = () => {
  const {
    search: { parameters, data },
    configuration: {
      data: { posterSizes },
    },
  } = useAppSelector((state) => state);
  const maxItemHeight = (posterSizes.find(({ key }) => key === posterSize) || posterSizes[0])
    .height;

  return (
    <div className="grid grid-cols-2 grid-rows-20-auto -mb-4 lg:-mb-8">
      {data.pages[parameters.page].map((id) => {
        const item = data.itemsById[id];
        return (
          <div
            key={id}
            className="col-span-2 md:col-span-1 md:row-span-2 mb-4 lg:mb-8 md:odd:mr-2 md:even:ml-2 lg:odd:mr-4 lg:even:ml-4"
            style={{ maxHeight: maxItemHeight }}
          >
            {item.mediaType === MediaTypes.Movie && (
              <MovieItemContent item={item} posterSize={posterSize} />
            )}
            {item.mediaType === MediaTypes.Show && (
              <ShowItemContent item={item} posterSize={posterSize} />
            )}
            {item.mediaType === MediaTypes.Person && (
              <PersonItemContent item={item} posterSize={posterSize} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(SearchResults);
