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

export default getGenderName;
