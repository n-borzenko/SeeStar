import type { FC } from "react";
import type { ShowExtended } from "types/show";
import { memo } from "react";
import InfoItem from "components/common/InfoItem";
import LabelsList from "components/common/LabelsList";
import SocialLinks from "components/common/SocialLinks";
import { getCertificationRating } from "helpers/getCertification";
import getFlagEmoji from "helpers/getFlagEmoji";

type ShowDetailsProps = {
  show: ShowExtended;
};

const ShowDetails: FC<ShowDetailsProps> = ({ show }) => {
  return (
    <div className="mt-4 lg:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-start-2">
          <SocialLinks homepage={show.homepage} externalIds={show.externalIds} label="Show" />
        </div>
        <h5 className="sm:col-start-1 sm:row-start-1">Main information</h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-x-8 lg:gap-x-28 mt-4 lg:mt-8">
        <div className="col-span-1 sm:col-start-1 sm:row-start-1">
          <InfoItem label="Status" value={show.status} />
        </div>
        <div className="col-span-1 sm:col-start-1 sm:row-start-2">
          <InfoItem label="In production" value={show.inProduction ? "Yes" : "No"} />
        </div>
        <div className="col-span-1 sm:col-start-1 sm:row-start-3 md:col-start-2 md:row-start-2">
          <InfoItem
            label="Certification"
            value={getCertificationRating(show.contentRatings.results)}
          />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-1 md:col-start-2 md:row-start-1">
          <InfoItem label="Original language" value={show.originalLanguage?.toUpperCase()} />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-2 md:col-start-3 md:row-start-1">
          <InfoItem label="Seasons" value={`${show.seasons.length}`} />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-3 md:col-start-3 md:row-start-2">
          <InfoItem
            label="Episode runtime"
            value={
              show.episodeRunTime && show.episodeRunTime.length > 0
                ? show.episodeRunTime.length > 1
                  ? `${Math.min(...show.episodeRunTime)} - ${Math.max(...show.episodeRunTime)} min`
                  : `${show.episodeRunTime[0]} min`
                : undefined
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-4 lg:mt-8">
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-1 sm:row-start-1">
          <div className="text-neutral-700 mb-2">Genres: </div>
          {show.genres && show.genres.length > 0 ? (
            <LabelsList labels={show.genres} isMultilined size="large" />
          ) : (
            <span>No data</span>
          )}
        </div>
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-1 sm:row-start-2">
          <div className="text-neutral-700 mb-2">Keywords: </div>
          {show.keywords.results && show.keywords.results.length > 0 ? (
            <LabelsList labels={show.keywords.results} isMultilined size="large" />
          ) : (
            <span>No data</span>
          )}
        </div>
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-2 sm:row-span-2">
          <div className="text-neutral-700 mb-2">Production: </div>
          {(!show.productionCompanies || show.productionCompanies.length === 0) &&
            (!show.networks || show.networks.length === 0) && <span>No data</span>}
          {show.productionCompanies && show.productionCompanies.length > 0 && (
            <div className="flex flex-wrap">
              {show.productionCompanies.map((company) => {
                const emoji = getFlagEmoji(company.originCountry);
                return (
                  <div
                    key={company.id}
                    className="basis-1/2 flex-grow-0 flex-shrink-0 odd:pr-1 even:pl-1"
                  >
                    {emoji && `${emoji} `}
                    {company.name}
                  </div>
                );
              })}
            </div>
          )}
          {show.networks && show.networks.length > 0 && (
            <div className="flex flex-wrap">
              {show.networks.map((company) => {
                const emoji = getFlagEmoji(company.originCountry);
                return (
                  <div
                    key={company.id}
                    className="basis-1/2 flex-grow-0 flex-shrink-0 odd:pr-1 even:pl-1"
                  >
                    {emoji && `${emoji} `}
                    {company.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ShowDetails);
