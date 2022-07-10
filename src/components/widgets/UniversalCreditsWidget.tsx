import type { FC } from "react";
import type { UniversalCreditDescription } from "types/credit";
import { memo } from "react";
import BlockHeader from "components/common/BlockHeader";
import CardsList from "components/common/CardsList";
import MediumPortraitCard from "components/cards/MediumPortraitCard";

type UniversalCreditsWidgetProps = {
  href: string;
  credits: { cast: UniversalCreditDescription[]; crew: UniversalCreditDescription[] };
  castGroupTitle?: string;
  crewGroupTitle?: string;
};

const UniversalCreditsWidget: FC<UniversalCreditsWidgetProps> = ({
  credits,
  href,
  castGroupTitle = "Cast",
  crewGroupTitle = "Crew",
}) => {
  if (credits.cast.length === 0 && credits.crew.length == 0) {
    return null;
  }

  return (
    <div>
      <BlockHeader title="Top credits" href={href} />
      <div>
        {credits.cast.length > 0 && (
          <div>
            <h6 className="lg:mb-4 text-primary">{castGroupTitle}</h6>
            <CardsList items={credits.cast}>
              {(item) => (
                <MediumPortraitCard
                  href={item.href}
                  posterPath={item.posterPath}
                  mediaType={item.mediaType}
                  title={item.title}
                  startDate={item.startDate}
                  voteAverage={item.voteAverage}
                  job={item.job}
                  infoType={item.infoType}
                />
              )}
            </CardsList>
          </div>
        )}
        {credits.crew.length > 0 && (
          <div className="mt-4 lg:mt-8 first:mt-0 first:lg:mt-0">
            <h6 className="lg:mb-4 text-primary">{crewGroupTitle}</h6>
            <CardsList items={credits.crew}>
              {(item) => (
                <MediumPortraitCard
                  href={item.href}
                  posterPath={item.posterPath}
                  mediaType={item.mediaType}
                  title={item.title}
                  startDate={item.startDate}
                  voteAverage={item.voteAverage}
                  job={item.job}
                  infoType={item.infoType}
                />
              )}
            </CardsList>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(UniversalCreditsWidget);
