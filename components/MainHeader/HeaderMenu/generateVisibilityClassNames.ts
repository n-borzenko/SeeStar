import clsx from "clsx";
import { ScreenBreakpoints } from "configurations/pagesData";

const generateVisibilityClassNames = (supportedSizes?: ScreenBreakpoints[]) => {
  if (!supportedSizes || !supportedSizes.length) {
    return "";
  }

  return clsx({
    hidden: !supportedSizes.includes("xs"),
    flex: supportedSizes.includes("xs"),
    "sm:hidden": !supportedSizes.includes("sm") && supportedSizes.includes("xs"),
    "sm:flex": supportedSizes.includes("sm") && !supportedSizes.includes("xs"),
    "md:hidden": !supportedSizes.includes("md") && supportedSizes.includes("sm"),
    "md:flex": supportedSizes.includes("md") && !supportedSizes.includes("sm"),
    "lg:hidden": !supportedSizes.includes("lg") && supportedSizes.includes("md"),
    "lg:flex": supportedSizes.includes("lg") && !supportedSizes.includes("md"),
  });
};

export default generateVisibilityClassNames;
