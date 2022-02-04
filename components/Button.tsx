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
  color?: "primary" | "secondary";
  variant?: "outlined" | "filled";
  size?: "medium" | "large";
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
    icon,
    type,
    onClick,
    className,
    children,
    ariaExpanded,
    ariaHasPopup,
    ariaLabel,
  },
  ref
) => {
  const classes = clsx(
    "text",
    "rounded-full",
    "border",
    {
      "py-1 px-2.5 text-sm": size === "medium" && icon === undefined,
      "py-1.5 px-3 text-lg": size === "large" && icon === undefined,
      "w-8 h-8 flex justify-center items-center": icon !== undefined,
      "text-white bg-primary border-primary/0 focus:bg-primary/80 hover:bg-primary/80 active:bg-primary/60":
        variant === "filled" && color === "primary",
      "text-primary bg-primary/0 border-primary focus:bg-white/20 hover:bg-primary/20 active:bg-primary/40":
        variant === "outlined" && color === "primary",
      "text-white bg-primary border-white/0 focus:bg-primary/80 hover:bg-white/80 active:bg-white/60":
        variant === "filled" && color === "secondary",
      "text-primary bg-primary/0 border-white focus:bg-white/20 hover:bg-white/20 active:bg-white/40":
        variant === "outlined" && color === "secondary",
    },
    className
  );

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
      {icon ? <Icon type={icon} color={color} /> : children}
    </button>
  );
};

export default memo(forwardRef(Button));
