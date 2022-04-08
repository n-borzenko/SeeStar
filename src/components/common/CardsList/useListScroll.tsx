import { memo, useRef, useState, useCallback, useEffect } from "react";

const containerPadding = 8;
const visibilityOffset = 12;

const defaultScrollParameters = {
  scrollBarHeight: 0,
  isStartPosition: true,
  isEndPosition: true,
};

const useListScroll = () => {
  const scrollableArea = useRef<HTMLDivElement>(null);
  const firstItem = useRef<HTMLDivElement>(null);
  const [scrollParameters, setScrollParameters] = useState(defaultScrollParameters);

  const updateScrollParameters = useCallback(() => {
    if (scrollableArea.current) {
      const { offsetHeight, clientHeight, clientWidth, scrollLeft, scrollWidth } =
        scrollableArea.current;
      setScrollParameters({
        scrollBarHeight: offsetHeight - clientHeight,
        isStartPosition: scrollLeft === 0,
        isEndPosition: scrollLeft + clientWidth === scrollWidth || clientWidth === scrollWidth,
      });
    }
  }, []);

  useEffect(() => {
    updateScrollParameters();
  }, [updateScrollParameters]);

  const scrollByButton = useCallback((direction: "right" | "left") => {
    if (
      scrollableArea.current &&
      scrollableArea.current.scrollWidth > scrollableArea.current.clientWidth
    ) {
      const { clientWidth, scrollLeft, scrollWidth } = scrollableArea.current;
      const itemSize = firstItem.current?.offsetWidth || 0;
      const maxScrollLeft = scrollWidth - clientWidth;
      const shiftWidth = clientWidth - 2 * containerPadding;

      if (direction === "right") {
        const nextValue = scrollLeft + shiftWidth;
        const nextValueOffset = nextValue % itemSize;
        scrollableArea.current.scrollLeft = Math.min(
          Math.max(0, nextValue - nextValueOffset - visibilityOffset),
          maxScrollLeft
        );
      } else {
        const nextValue = scrollLeft - shiftWidth;
        const nextValueOffset = itemSize - (scrollLeft % itemSize);
        scrollableArea.current.scrollLeft = Math.min(
          Math.max(0, nextValue + nextValueOffset + visibilityOffset),
          maxScrollLeft
        );
      }
    }
  }, []);

  return { scrollableArea, firstItem, scrollParameters, updateScrollParameters, scrollByButton };
};

export default useListScroll;
