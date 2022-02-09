import {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
  MouseEventHandler,
  ButtonHTMLAttributes,
  AriaAttributes,
  memo,
} from "react";
import clsx from "clsx";
import Icon, { IconTypes } from "./Icon";

type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  color?: "primary" | "secondary" | "white";
  variant?: "outlined" | "filled";
  size?: "medium" | "large";
  wide?: boolean;
  icon?: IconTypes;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaExpanded?: AriaAttributes["aria-expanded"];
  ariaHasPopup?: AriaAttributes["aria-haspopup"];
  ariaLabel?: AriaAttributes["aria-label"];
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, PropsWithChildren<ButtonProps>> = (
  {
    color = "primary",
    variant = "filled",
    size = "medium",
    wide,
    icon,
    type,
    onClick,
    children,
    ariaExpanded,
    ariaHasPopup,
    ariaLabel,
  },
  ref
) => {
  const classes = clsx("text rounded-full border inline-flex justify-center items-center", {
    "h-8 px-3 text-sm": size === "medium" && icon === undefined,
    "h-10 px-4 text-lg": size === "large" && icon === undefined,
    "w-8 h-8": size === "medium" && icon !== undefined,
    "w-10 h-10": size === "large" && icon !== undefined,
    "w-full": wide,
    "text-white bg-primary border-primary/0 focus:bg-primary/80 hover:bg-primary/80 active:bg-primary/60":
      variant === "filled" && color === "primary",
    "text-primary bg-primary/0 border-primary focus:bg-primary/20 hover:bg-primary/20 active:bg-primary/40":
      variant === "outlined" && color === "primary",
    "text-white bg-secondary border-secondary/0 focus:bg-secondary/80 hover:bg-secondary/80 active:bg-secondary/60":
      variant === "filled" && color === "secondary",
    "text-secondary bg-secondary/0 border-secondary focus:bg-secondary/20 hover:bg-secondary/20 active:bg-secondary/40":
      variant === "outlined" && color === "secondary",
    "text-primary bg-white border-white/0 focus:bg-white/80 hover:bg-white/80 active:bg-white/60":
      variant === "filled" && color === "white",
    "text-white bg-white/0 border-white focus:bg-white/20 hover:bg-white/20 active:bg-white/40":
      variant === "outlined" && color === "white",
  });
  const iconColor = variant === "filled" ? (color === "white" ? "primary" : "white") : color;

  return (
    <button
      type={type}
      ref={ref}
      className={classes}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-label={ariaLabel}
    >
      {icon ? <Icon type={icon} color={iconColor} size={size} /> : children}
    </button>
  );
};

export default memo(forwardRef(Button));
