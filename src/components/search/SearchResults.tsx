import type { FC } from "react";
import type { SearchData } from "types/search";
import { memo } from "react";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";
import MovieItemContent from "./MovieItemContent";
import PersonItemContent from "./PersonItemContent";
import ShowItemContent from "./ShowItemContent";

const posterSizeName = "smallPortrait";

type SearchResultsProps = {
  data: SearchData;
};

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
  const maxItemHeight = getImageSize(posterSizeName).height;

  return (
    <div className="grid grid-cols-2 grid-rows-20-auto -mb-4 lg:-mb-8">
      {data.results.map((item) => (
        <div
          key={item.id}
          className="col-span-2 md:col-span-1 md:row-span-2 mb-4 lg:mb-8 md:odd:mr-2 md:even:ml-2 lg:odd:mr-4 lg:even:ml-4"
          style={{ maxHeight: maxItemHeight }}
        >
          {item.mediaType === MediaTypes.Movie && (
            <MovieItemContent item={item} posterSize={posterSizeName} />
          )}
          {item.mediaType === MediaTypes.Show && (
            <ShowItemContent item={item} posterSize={posterSizeName} />
          )}
          {item.mediaType === MediaTypes.Person && (
            <PersonItemContent item={item} posterSize={posterSizeName} />
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(SearchResults);
