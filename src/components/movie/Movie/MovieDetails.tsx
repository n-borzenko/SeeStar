import type { FC } from "react";
import type { MovieExtended } from "types/movie";
import { memo } from "react";
import InfoItem from "components/common/InfoItem";
import LabelsList from "components/common/LabelsList";
import SocialLinks from "components/common/SocialLinks";
import { getCertificationFromRelease } from "helpers/getCertification";
import getFlagEmoji from "helpers/getFlagEmoji";

type MovieDetailsProps = {
  movie: MovieExtended;
};

const getCurrencyValue = (value?: number) => {
  return typeof value !== "undefined"
    ? value.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : undefined;
};

const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="mt-4 lg:mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-start-2">
          <SocialLinks homepage={movie.homepage} externalIds={movie.externalIds} label="Movie" />
        </div>
        <h5 className="sm:col-start-1 sm:row-start-1">Main information</h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-x-8 lg:gap-x-28 mt-4 lg:mt-8">
        <div className="col-span-1 sm:col-start-1 sm:row-start-1">
          <InfoItem label="Status" value={movie.status} />
        </div>
        <div className="col-span-1 sm:col-start-1 sm:row-start-2">
          <InfoItem
            label="Certification"
            value={getCertificationFromRelease(movie.releaseDates.results)}
          />
        </div>
        <div className="col-span-1 sm:col-start-1 sm:row-start-3 md:col-start-2 md:row-start-2">
          <InfoItem label="Original language" value={movie.originalLanguage?.toUpperCase()} />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-1 md:col-start-2 md:row-start-1">
          <InfoItem
            label="Runtime"
            value={movie.runtime && movie.runtime > 0 ? `${movie.runtime} min` : undefined}
          />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-2 md:col-start-3 md:row-start-1">
          <InfoItem label="Budget" value={getCurrencyValue(movie.budget)} />
        </div>
        <div className="col-span-1 sm:col-start-2 sm:row-start-3 md:col-start-3 md:row-start-2">
          <InfoItem label="Revenue" value={getCurrencyValue(movie.revenue)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-4 lg:mt-8">
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-1 sm:row-start-1">
          <div className="text-neutral-700 mb-2">Genres: </div>
          {movie.genres && movie.genres.length > 0 ? (
            <LabelsList labels={movie.genres} isMultilined size="large" />
          ) : (
            <span>No data</span>
          )}
        </div>
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-1 sm:row-start-2">
          <div className="text-neutral-700 mb-2">Keywords: </div>
          {movie.keywords.keywords && movie.keywords.keywords.length > 0 ? (
            <LabelsList labels={movie.keywords.keywords} isMultilined size="large" />
          ) : (
            <span>No data</span>
          )}
        </div>
        <div className="text-lg leading-6 font-normal col-span-1 sm:col-start-2 sm:row-span-2">
          <div className="text-neutral-700 mb-2">Production: </div>
          {movie.productionCompanies && movie.productionCompanies.length > 0 ? (
            <div className="flex flex-wrap">
              {movie.productionCompanies.map((company) => {
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
          ) : (
            <span>No data</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MovieDetails);
