import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo, Fragment } from "react";
import MediaDescription from "components/common/MediaDescription";
import PosterImage from "components/common/PosterImage";
import SocialLinks from "components/common/SocialLinks";
import getGenderName from "helpers/getGenderName";
import getImageSize from "helpers/getImageSize";
import { MediaTypes } from "types/mediaTypes";

type PersonSummaryProps = {
  person: PersonExtended;
};

const posterSizeName = "largePortrait";

const PersonSummary: FC<PersonSummaryProps> = ({ person }) => {
  const posterSize = getImageSize(posterSizeName);
  const posterRatio = (posterSize.height / posterSize.width) * 100;
  const genderName = getGenderName(person.gender);

  return (
    <div
      className="md:grid md:gap-4 lg:gap-8"
      style={{ gridTemplateColumns: `${posterSize.width}px 1fr` }}
    >
      <div className="md:col-start-2 md:row-end-1 grid gap-2 md:gap-4 content-start">
        <MediaDescription
          mediaType={MediaTypes.Person}
          title={person.name}
          startDate={person.birthday}
          endDate={person.deathday}
        />

        {(person.knownForDepartment || genderName) && (
          <p>
            {genderName && (
              <>
                <span className="text-xl font-normal text-neutral-700 capitalize">
                  {genderName}
                </span>
                <span className="last:hidden">, </span>
              </>
            )}
            {person.knownForDepartment && (
              <span className="text-xl font-normal text-neutral-700 first:capitalize">
                known for {person.knownForDepartment}
              </span>
            )}
          </p>
        )}

        {person.placeOfBirth && (
          <p className="text-lg font-normal text-neutral-700">Born in {person.placeOfBirth}</p>
        )}
      </div>

      <div className="md:col-start-1 md:col-end-1 my-2 sm:my-4 md:my-0 flex justify-center">
        <div
          className="w-full relative h-0 overflow-hidden"
          style={{
            paddingTop: `min(${posterRatio}%, ${posterSize.height}px)`,
            maxWidth: posterSize.width,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <PosterImage size={posterSizeName} type={MediaTypes.Person} src={person.profilePath} />
          </div>
        </div>
      </div>

      <div className="md:col-span-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-start-2">
            <SocialLinks
              homepage={person.homepage}
              externalIds={person.externalIds}
              label="Movie"
            />
          </div>
          <h5 className="sm:col-start-1 sm:row-start-1">Biography</h5>
        </div>
        <p className="mt-2 lg:mt-4 text-lg font-normal leading-6 text-neutral-700">
          {person.biography && person.biography.length > 0 ? person.biography : "No data"}
        </p>
      </div>
    </div>
  );
};

export default memo(PersonSummary);
