import type { CountryCertification, CertificationRating } from "types/release";
import { ReleaseType } from "types/release";

const acceptableReleaseTypes = [
  ReleaseType.Theatrical,
  ReleaseType.Digital,
  ReleaseType.Physical,
  ReleaseType.TV,
];

const getSpecificCertification = (
  certification: CountryCertification,
  releaseType: ReleaseType
) => {
  const release = certification.releaseDates.find(({ type }) => type === releaseType);
  return release?.certification && release?.certification.length > 0
    ? release?.certification
    : undefined;
};

export const getCertificationFromRelease = (
  certifications: CountryCertification[],
  releaseType?: ReleaseType,
  region = "GB"
) => {
  const countryCertification = certifications.find(({ iso_3166_1 }) => iso_3166_1 === region);
  if (!countryCertification) {
    return undefined;
  }

  if (releaseType) {
    return getSpecificCertification(countryCertification, releaseType);
  }

  for (let type of acceptableReleaseTypes) {
    const certification = getSpecificCertification(countryCertification, type);
    if (certification) {
      return certification;
    }
  }

  return undefined;
};

export const getCertificationRating = (ratings: CertificationRating[], region = "GB") => {
  const certification = ratings.find(({ iso_3166_1 }) => iso_3166_1 === region);
  if (!certification) {
    return undefined;
  }
  return certification.rating;
};
