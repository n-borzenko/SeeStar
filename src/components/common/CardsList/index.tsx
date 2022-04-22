import type { ReactNode } from "react";
import { memo } from "react";
import useListScroll from "./useListScroll";
import CardsListButton from "./CardsListButton";

type CardsListItem = {
  id: string | number;
};

type CardsListProps<T> = {
  items: T[];
  children: (item: T) => ReactNode;
};

const CardsList = <T extends CardsListItem>({ items, children }: CardsListProps<T>) => {
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
        {items.map((item, index) => (
          <div key={item.id} className="px-2" ref={index === 0 ? firstItem : null}>
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
export default memo(CardsList) as typeof CardsList;
