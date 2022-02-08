import { FC, memo } from "react";
import clsx from "clsx";
import ArrowLeftIcon from "./items/arrow-left.svg";
import BurgerIcon from "./items/burger.svg";
import CloseIcon from "./items/close.svg";
import GoToArrowIcon from "./items/go-to-arrow.svg";
import MovieIcon from "./items/movie.svg";
import PersonIcon from "./items/person.svg";
import SearchIcon from "./items/search.svg";
import StarFilledIcon from "./items/star-filled.svg";
import TvIcon from "./items/tv.svg";

export type IconTypes =
  | "arrow-left"
  | "arrow-right"
  | "burger"
  | "close"
  | "go-to-arrow"
  | "movie"
  | "person"
  | "search"
  | "star-filled"
  | "tv";

type IconProps = {
  type: IconTypes;
  color?: "primary" | "secondary" | "white";
  size?: "small" | "medium" | "large";
};

const Icon: FC<IconProps> = ({ type, size = "medium", color = "primary" }) => {
  const classes = clsx({
    "w-2 h-2": size === "small",
    "w-4 h-4": size === "medium",
    "w-5 h-5": size === "large",
    "text-primary": color === "primary",
    "text-secondary": color === "secondary",
    "text-white": color === "white",
    "rotate-180": type === "arrow-right",
  });

  return (
    <>
      {type === "arrow-left" && <ArrowLeftIcon className={classes} />}
      {type === "arrow-right" && <ArrowLeftIcon className={classes} />}
      {type === "burger" && <BurgerIcon className={classes} />}
      {type === "close" && <CloseIcon className={classes} />}
      {type === "go-to-arrow" && <GoToArrowIcon className={classes} />}
      {type === "movie" && <MovieIcon className={classes} />}
      {type === "person" && <PersonIcon className={classes} />}
      {type === "search" && <SearchIcon className={classes} />}
      {type === "star-filled" && <StarFilledIcon className={classes} />}
      {type === "tv" && <TvIcon className={classes} />}
    </>
  );
};

export default memo(Icon);
