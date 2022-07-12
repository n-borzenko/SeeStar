import type { CustomCardsListProps } from "./types";
import { memo, useMemo } from "react";
import useListScroll from "./useListScroll";
import CardsListButton from "./CardsListButton";

export const listLengthLimit = 20;

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
  } = useListScroll(limitedItems);

  return (
    <div className="-mx-4 relative">
      <CardsListButton
        direction="left"
        scrollBarHeight={scrollBarHeight}
        isVisible={!isStartPosition}
        scrollByButton={scrollByButton}
      />
      <div
        className="grid grid-flow-col justify-start overflow-x-auto"
        ref={scrollableArea}
        onScroll={updateScrollParameters}
      >
        {limitedItems.map((item, index) => (
          <div
            key={getKey(item)}
            className="p-2 first:pl-4 last:pr-4"
            ref={index === 0 ? firstItem : null}
          >
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
