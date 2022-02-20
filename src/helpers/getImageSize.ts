const imageSizesConfiguration = {
  small: {
    width: 92,
    height: 138,
  },
  medium: {
    width: 154,
    height: 230,
  },
  large: {
    width: 342,
    height: 513,
  },
};

const getImageSize = (key: "small" | "medium" | "large") => {
  return imageSizesConfiguration[key];
};

export default getImageSize;
