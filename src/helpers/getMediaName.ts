import { MediaTypes } from "types/mediaTypes";

const getMediaName = (mediaType: MediaTypes) => {
  switch (mediaType) {
    case MediaTypes.Movie:
      return "Movie";
    case MediaTypes.Show:
      return "Show";
    case MediaTypes.Person:
      return "Person";
    default:
      return "Any media type";
  }
};

export default getMediaName;
