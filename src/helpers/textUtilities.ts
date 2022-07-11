import { MediaTypes } from "types/mediaTypes";

export const getCharacterName = (character?: string) => {
  return character && character.length > 0 ? character : "Unknown character";
};

export const getEpisodeName = (
  episodeTitle?: string,
  episodeNumber?: number,
  seasonNumber?: number,
  hasPrefix = false
) => {
  const title = episodeTitle && episodeTitle.length > 0 ? episodeTitle : `Episode ${episodeNumber}`;
  return hasPrefix ? `S${seasonNumber}:E${episodeNumber} ${title}` : title;
};

const getGenderName = (gender?: number | null) => {
  switch (gender) {
    case 1:
      return "woman";
    case 2:
      return "man";
    default:
      return undefined;
  }
};

export const getGenderAndDepartment = (gender?: number | null, knownForDepartment?: string) => {
  const genderName = getGenderName(gender);
  const hasDepartment = knownForDepartment && knownForDepartment.length > 0;

  return [
    genderName ? genderName : "",
    genderName && hasDepartment ? ", " : "",
    hasDepartment ? `known for ${knownForDepartment}` : "",
  ].join("");
};

export const getMediaName = (mediaType: MediaTypes) => {
  switch (mediaType) {
    case MediaTypes.Movie:
      return "Movie";
    case MediaTypes.Show:
      return "Show";
    case MediaTypes.Person:
      return "Person";
    default:
      return "All";
  }
};

export const getPluralizedName = (name?: string, count?: number) => {
  return count ? `${count} ${name}${count === 1 ? "" : "s"}` : "";
};

export const getSeasonName = (seasonTitle?: string, seasonNumber?: number, hasPrefix = false) => {
  const title = seasonTitle && seasonTitle.length > 0 ? seasonTitle : `Season ${seasonNumber}`;
  return hasPrefix ? `S${seasonNumber} ${title}` : title;
};

const flagOffset = 0x1f1e6;
const asciiOffset = 0x41;

export const getFlagEmoji = (country?: string) => {
  if (!country || country.length !== 2) {
    return "🏳️";
  }

  const symbol1 = country.charCodeAt(0) - asciiOffset + flagOffset;
  const symbol2 = country.charCodeAt(1) - asciiOffset + flagOffset;
  return String.fromCodePoint(symbol1, symbol2);
};
