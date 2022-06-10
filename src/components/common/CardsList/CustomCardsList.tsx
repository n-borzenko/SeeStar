import type { CustomCardsListProps } from "./types";
import { memo, useMemo } from "react";
import useListScroll from "./useListScroll";
import CardsListButton from "./CardsListButton";

export const listLengthLimit = 10;

const CustomCardsList = <T extends any>({
  items,
  children,
  getKey,
  limited = false,
}: CustomCardsListProps<T>) => {
  const limitedItems = useMemo(
    () => (items.length > listLengthLimit && limited ? items.slice(0, listLengthLimit) : items),
    [items, limited]
  );

  const {
    scrollParameters: { scrollBarHeight, isStartPosition, isEndPosition },
    scrollableArea,
    firstItem,
    updateScrollParameters,
    scrollByButton,
  } = useListScroll();

  return (
    <div className="-mx-4 relative">
      <CardsListButton
        direction="left"
        scrollBarHeight={scrollBarHeight}
        isVisible={!isStartPosition}
        scrollByButton={scrollByButton}
      />
      <div
        className="flex px-2 py-2 overflow-x-auto"
        ref={scrollableArea}
        onScroll={updateScrollParameters}
      >
        {limitedItems.map((item, index) => (
          <div key={getKey(item)} className="px-2" ref={index === 0 ? firstItem : null}>
            {children(item)}
          </div>
        ))}
      </div>
      <CardsListButton
        direction="right"
        scrollBarHeight={scrollBarHeight}
        isVisible={!isEndPosition}
        scrollByButton={scrollByButton}
      />
    </div>
  );
};

// Recommended way to resolve type issue with hoc return types
// https://github.com/microsoft/TypeScript/issues/30650
export default memo(CustomCardsList) as typeof CustomCardsList;
