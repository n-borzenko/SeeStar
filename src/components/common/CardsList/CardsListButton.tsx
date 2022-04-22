import type { FC } from "react";
import clsx from "clsx";
import { memo, useCallback } from "react";
import Button from "components/common/Button";

type CardsListButtonProps = {
  direction: "left" | "right";
  isVisible: boolean;
  scrollBarHeight: number;
  scrollByButton: (direction: "left" | "right") => void;
};

const CardsListButton: FC<CardsListButtonProps> = ({
  direction,
  isVisible,
  scrollBarHeight,
  scrollByButton,
}) => {
  const onClick = useCallback(() => scrollByButton(direction), [scrollByButton, direction]);

  const wrapperClasses = clsx(
    "w-8 absolute top-0 from-white via-white to-white/0 flex items-center",
    {
      "left-0 bg-gradient-to-r": direction === "left",
      "right-0 bg-gradient-to-l": direction === "right",
      hidden: !isVisible,
    }
  );
  const buttonClasses = clsx("shadow-popup rounded-full", {
    "ml-1 sm:ml-0": direction === "left",
    "-ml-1 sm:ml-0": direction === "right",
  });

  return (
    <div className={wrapperClasses} style={{ bottom: `${scrollBarHeight}px` }}>
      <div className={buttonClasses}>
        <Button
          icon={`arrow-${direction}`}
          variant="outlined"
          ariaHidden="true"
          hasWhiteBackground
          tabIndex={-1}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default memo(CardsListButton);
