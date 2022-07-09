import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { memo } from "react";
import Card from "components/common/Card";
import PosterImage from "components/common/PosterImage";
import useScreenSize, { ScreenSize } from "hooks/common/useScreenSize";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import CardOverview from "./blocks/CardOverview";
import getDataAvailability from "./helpers/getDataAvailability";

type EpisodeLandscapeCardProps = {
  href: string;
  cardSize?: "small" | "adaptive";
  posterPath?: string | null;
  title?: string;
  startDate?: string | null;
  voteAverage?: number;
  overview?: string | null;
};

const getPosterSizeName = (cardSize: "small" | "adaptive", screenSize?: ScreenSize) => {
  if (cardSize === "small") {
    return "tinyLandscape";
  }
  if (screenSize === undefined) {
    return undefined;
  }
  return screenSize < ScreenSize.Sm ? "tinyLandscape" : "smallLandscape";
};

// Episode cards with description and optional interactive content
const EpisodeLandscapeCard: FC<PropsWithChildren<EpisodeLandscapeCardProps>> = ({
  href,
  cardSize = "adaptive",
  posterPath,
  title,
  startDate,
  voteAverage,
  overview,
  children,
}) => {
  const screenSize = useScreenSize();
  const posterSizeName = getPosterSizeName(cardSize, screenSize);

  const { hasOverview, hasChildren } = getDataAvailability({ overview, children });
  const hasChildrenInsideCard =
    cardSize === "adaptive" && screenSize && screenSize >= ScreenSize.Sm;
  const hasExtendedContent = hasOverview || (hasChildren && !hasChildrenInsideCard);

  const childrenClasses = clsx(
    "flex items-center justify-between",
    cardSize === "adaptive" && "sm:hidden"
  );
  const topContentClasses = clsx("w-full grid p-2 pb-1 sm:pb-2 gap-1", {
    "grid-rows-[auto_auto_1fr]": hasChildren && hasChildrenInsideCard,
    "grid-rows-[auto_1fr]": !hasChildren || !hasChildrenInsideCard,
    "sm:gap-2": cardSize === "adaptive",
    "pb-0 sm:pb-0": hasExtendedContent,
  });
  const bottomContentClasses = clsx(
    "p-2 row-start-2 col-span-full grid gap-1",
    cardSize === "adaptive" && "sm:gap-2"
  );

  return (
    <Card href={href}>
      <div className="w-full grid grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
        {posterSizeName && (
          <PosterImage
            src={posterPath}
            type={MediaTypes.Show}
            size={posterSizeName}
            rounded={hasExtendedContent ? "top-left" : "left"}
          />
        )}

        <div className={topContentClasses}>
          <CardHeader cardSize={cardSize} mediaType={MediaTypes.Show} title={title} />
          <CardInfoRow
            cardSize={cardSize}
            startDate={startDate}
            voteAverage={voteAverage}
            infoType="rating"
          />
          {cardSize === "adaptive" && hasChildren ? (
            <div className="items-center justify-between self-end hidden sm:flex">{children}</div>
          ) : null}
        </div>

        {hasExtendedContent && (
          <div className={bottomContentClasses}>
            {hasChildren && <div className={childrenClasses}>{children}</div>}
            <CardOverview cardSize={cardSize} overview={overview} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default memo(EpisodeLandscapeCard);
