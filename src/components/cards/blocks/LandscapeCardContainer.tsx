import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { memo } from "react";
import Card from "components/common/Card";
import PosterImage from "components/common/PosterImage";
import useScreenSize, { ScreenSize } from "hooks/common/useScreenSize";
import { MediaTypes } from "types/mediaTypes";

type LandscapeCardContainerProps = {
  href: string;
  cardSize: "small" | "adaptive";
  posterPath?: string | null;
  mediaType: MediaTypes;
  gridTemplateRows: string;
};

const getPosterSizeName = (cardSize: "small" | "adaptive", screenSize?: ScreenSize) => {
  if (cardSize === "small") {
    return "smallPortrait";
  }
  if (screenSize === undefined) {
    return undefined;
  }
  return screenSize < ScreenSize.Sm ? "smallPortrait" : "mediumPortrait";
};

const LandscapeCardContainer: FC<PropsWithChildren<LandscapeCardContainerProps>> = ({
  href,
  cardSize,
  posterPath,
  mediaType,
  gridTemplateRows,
  children,
}) => {
  const screenSize = useScreenSize();
  const posterSizeName = getPosterSizeName(cardSize, screenSize);
  const gridClasses = clsx("w-full grid p-2 gap-1", cardSize === "adaptive" && "sm:gap-2");

  return (
    <Card href={href}>
      <div className="flex-shrink-0">
        {posterSizeName && (
          <PosterImage src={posterPath} type={mediaType} size={posterSizeName} rounded="left" />
        )}
      </div>
      <div className={gridClasses} style={{ gridTemplateRows }}>
        {children}
      </div>
    </Card>
  );
};

export default memo(LandscapeCardContainer);
