import type { FC } from "react";
import type { PersonExtended } from "types/person";
import { memo, Fragment } from "react";
import Icon from "components/common/Icon";
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
      <div className="md:col-start-2 md:row-end-1 flex flex-col">
        <div>
          <div className="inline-block mr-2 md:mr-4">
            <Icon size="extra-large" type={MediaTypes.Person} ariaLabel="Type: movie" />
          </div>
          <h1 className="inline text-3xl md:text-4xl font-black">{person.name}</h1>
        </div>

        {(person.knownForDepartment || genderName) && (
          <p className="mt-2 sm:mt-4">
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

        {person.birthday && (
          <p className="mt-2 sm:mt-4 text-xl font-normal text-neutral-500">
            {new Date(person.birthday).toLocaleDateString()}
            {person.deathday && ` - ${new Date(person.deathday).toLocaleDateString()}`}
          </p>
        )}

        {person.placeOfBirth && (
          <p className="mt-2 sm:mt-4 text-lg font-normal text-neutral-700">
            Born in {person.placeOfBirth}
          </p>
        )}

        {person.alsoKnownAs && person.alsoKnownAs.length > 0 && (
          <p className="text-lg font-normal italic mt-2 sm:mt-4 md:mt-auto">
            Also known as:{" "}
            {person.alsoKnownAs.map((name) => (
              <Fragment key={name}>
                <span>{name}</span>
                <span className="last:hidden">, </span>
              </Fragment>
            ))}
          </p>
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
