const imageSizesConfiguration = {
  smallPortrait: {
    width: 92,
    height: 138,
  },
  mediumPortrait: {
    width: 154,
    height: 230,
  },
  largePortrait: {
    width: 342,
    height: 513,
  },
  smallLandscape: {
    width: 185,
    height: 104,
  },
  mediumLandscape: {
    width: 300,
    height: 169,
  },
  largeLandscape: {
    width: 500,
    height: 281,
  },
};

export type ImageSizeName = keyof typeof imageSizesConfiguration;

const getImageSize = (key: ImageSizeName) => {
  return imageSizesConfiguration[key];
};

export default getImageSize;
