import type { CountryCertification } from "types/release";
import { ReleaseType } from "types/release";

const getCertification = (
  certifications: CountryCertification[],
  region = "GB",
  releaseType = ReleaseType.Theatrical
) => {
  const countryCertification = certifications.find(({ iso_3166_1 }) => iso_3166_1 === region);
  const release = countryCertification?.releaseDates.find(({ type }) => type === releaseType);
  return release?.certification && release?.certification.length > 0
    ? release?.certification
    : undefined;
};

export default getCertification;
