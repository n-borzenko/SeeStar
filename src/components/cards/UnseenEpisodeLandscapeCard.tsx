import type { FC, ReactNode } from "react";
import clsx from "clsx";
import { memo } from "react";
import Rating from "components/common/Rating";
import { MediaTypes } from "types/mediaTypes";
import CardHeader from "./blocks/CardHeader";
import CardInfoRow from "./blocks/CardInfoRow";
import LandscapeCardContainer from "./blocks/LandscapeCardContainer";

type UnseenEpisodeLandscapeCardProps = {
  href: string;
  cardSize?: "small" | "adaptive";
  posterPath?: string | null;
  showTitle?: string;
  showStartDate?: string | null;
  showVoteAverage?: number;
  episodePrefix?: string;
  episodeTitle?: string;
  episodeStartDate?: string | null;
  episodeVoteAverage?: number;
  children: (itemType: "show" | "episode" | "progress") => ReactNode;
};

// Cards for next unseen episodes with some information about show
const UnseenEpisodeLandscapeCard: FC<UnseenEpisodeLandscapeCardProps> = ({
  href,
  cardSize = "adaptive",
  posterPath,
  showTitle,
  showStartDate,
  showVoteAverage,
  episodePrefix,
  episodeTitle,
  episodeStartDate,
  episodeVoteAverage,
  children,
}) => {
  const combinedTopRowClasses = clsx(
    "flex items-center justify-between row-start-1 row-end-3",
    cardSize === "adaptive" && "sm:row-end-2"
  );
  const combinedBottomRowClasses = clsx(
    "flex items-center justify-between row-start-5 row-end-7",
    cardSize === "adaptive" && "sm:row-start-6"
  );
  const showRatingClasses = clsx("ml-2", cardSize === "adaptive" && "sm:hidden");
  const episodePrefixClasses = clsx("mr-2", cardSize === "adaptive" && "sm:hidden");

  return (
    <LandscapeCardContainer
      href={href}
      cardSize={cardSize}
      posterPath={posterPath}
      mediaType={MediaTypes.Show}
      gridTemplateRows="auto auto auto 1fr auto auto auto"
    >
      <div className={combinedTopRowClasses}>
        <CardHeader cardSize={cardSize} mediaType={MediaTypes.Show} title={showTitle} />
        <div className={showRatingClasses}>
          <Rating voteAverage={showVoteAverage} />
        </div>
      </div>

      {cardSize === "adaptive" && (
        <div className="hidden sm:block">
          <CardInfoRow
            cardSize={cardSize}
            startDate={showStartDate}
            voteAverage={showVoteAverage}
            infoType="rating"
          />
        </div>
      )}

      <div className="flex items-center justify-between">{children("show")}</div>
      <div className="flex items-center justify-between">{children("progress")}</div>

      {cardSize === "adaptive" && (
        <div className="hidden sm:block">
          <CardHeader
            cardSize={cardSize}
            mediaType={MediaTypes.Show}
            title={`${episodePrefix} ${episodeTitle}`}
            isIconHidden
          />
        </div>
      )}

      <div className={combinedBottomRowClasses}>
        <div className={episodePrefixClasses}>
          <CardHeader
            cardSize={cardSize}
            mediaType={MediaTypes.Show}
            title={episodePrefix}
            isIconHidden
          />
        </div>
        <CardInfoRow
          cardSize={cardSize}
          startDate={episodeStartDate}
          voteAverage={episodeVoteAverage}
          infoType="rating"
        />
      </div>

      <div className="flex items-center justify-between">{children("episode")}</div>
    </LandscapeCardContainer>
  );
};

export default memo(UnseenEpisodeLandscapeCard);
