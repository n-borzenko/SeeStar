import type { VFC, ReactNode, ReactChild } from "react";
import type { ButtonCommonProps } from "./types";
import clsx from "clsx";
import Icon from "components/common/Icon";

type ButtonWrapperProps = Pick<
  ButtonCommonProps,
  "color" | "variant" | "size" | "wide" | "icon" | "iconSize" | "hasWhiteBackground" | "className"
> & {
  children: (props: { classes: string; iconElement: ReactChild | null }) => ReactNode;
};

const ButtonWrapper: VFC<ButtonWrapperProps> = ({
  color = "primary",
  variant = "filled",
  size = "medium",
  wide,
  icon,
  iconSize,
  hasWhiteBackground = false,
  className,
  children,
}) => {
  const backgroundClasses = clsx("bg-white rounded-full", {
    "h-8": size === "medium" && icon === undefined,
    "h-10": size === "large" && icon === undefined,
    "w-8 h-8": size === "medium" && icon !== undefined,
    "w-10 h-10": size === "large" && icon !== undefined,
    "w-full": wide,
  });

  const buttonClasses = clsx(
    "font-normal rounded-full border inline-flex justify-center items-center",
    {
      "h-8 px-3 text-sm": size === "medium" && icon === undefined,
      "h-10 px-4 text-lg": size === "large" && icon === undefined,
      "w-8 h-8": size === "medium" && icon !== undefined,
      "w-10 h-10": size === "large" && icon !== undefined,
      "w-full": wide,
      "text-white bg-primary border-primary/0 focus:bg-primary/80 hover:bg-primary/80 active:bg-primary/60":
        variant === "filled" && color === "primary",
      "text-primary bg-primary/0 border-primary focus:bg-primary/10 hover:bg-primary/10 active:bg-primary/20":
        variant === "outlined" && color === "primary",
      "text-primary bg-primary/0 border-primary/0 focus:bg-primary/10 hover:bg-primary/10 active:bg-primary/20":
        variant === "transparent" && color === "primary",
      "text-white bg-secondary border-secondary/0 focus:bg-secondary/80 hover:bg-secondary/80 active:bg-secondary/60":
        variant === "filled" && color === "secondary",
      "text-secondary bg-secondary/0 border-secondary focus:bg-secondary/10 hover:bg-secondary/10 active:bg-secondary/20":
        variant === "outlined" && color === "secondary",
      "text-secondary bg-secondary/0 border-secondary/0 focus:bg-secondary/10 hover:bg-secondary/10 active:bg-secondary/20":
        variant === "transparent" && color === "secondary",
      "text-primary bg-white border-white/0 focus:bg-white/80 hover:bg-white/80 active:bg-white/60":
        variant === "filled" && color === "white",
      "text-white bg-white/0 border-white focus:bg-white/10 hover:bg-white/10 active:bg-white/20":
        variant === "outlined" && color === "white",
      "text-white bg-white/0 border-white/0 focus:bg-white/10 hover:bg-white/10 active:bg-white/20":
        variant === "transparent" && color === "white",
    },
    className
  );

  const iconColor = variant === "filled" ? (color === "white" ? "primary" : "white") : color;
  const iconElement = icon ? <Icon type={icon} color={iconColor} size={iconSize || size} /> : null;
  const props = { classes: buttonClasses, iconElement };

  return hasWhiteBackground ? (
    <div className={backgroundClasses}>{children(props)}</div>
  ) : (
    <>{children(props)}</>
  );
};

export default ButtonWrapper;
