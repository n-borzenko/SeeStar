import { memo } from "react";
import type { SearchItem, SearchItemMovie, SearchItemShow, SearchItemPerson } from "types/search";
import { useAppSelector } from "store/hooks";

const SearchResults = () => {
  const { requestStatus, parameters, data } = useAppSelector((state) => state.search);

  return <div className="grid">Results Grid</div>;
};

export default memo(SearchResults);
