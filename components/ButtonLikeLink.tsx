import {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
  AnchorHTMLAttributes,
  AriaAttributes,
  memo,
} from "react";
import clsx from "clsx";
import Icon, { IconTypes } from "./Icon";

type ButtonLikeLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "rel" | "target" | "referrerPolicy" | "onClick"
> & {
  color?: "primary" | "secondary" | "white";
  variant?: "outlined" | "filled";
  size?: "medium" | "large";
  wide?: boolean;
  icon?: IconTypes;
  className?: string;
  ariaLabel?: AriaAttributes["aria-label"];
};

const ButtonLikeLink: ForwardRefRenderFunction<
  HTMLAnchorElement,
  PropsWithChildren<ButtonLikeLinkProps>
> = (
  {
    color = "primary",
    variant = "filled",
    size = "medium",
    wide,
    icon,
    children,
    ariaLabel,
    href,
    rel,
    target,
    referrerPolicy,
    onClick,
    className,
  },
  ref
) => {
  const classes = clsx(
    "font-normal rounded-full border inline-flex justify-center items-center",
    {
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
    },
    className
  );
  const iconColor = variant === "filled" ? (color === "white" ? "primary" : "white") : color;

  return (
    <a
      ref={ref}
      href={href}
      rel={rel}
      referrerPolicy={referrerPolicy}
      target={target}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon ? <Icon type={icon} color={iconColor} size={size} /> : children}
    </a>
  );
};

export default memo(forwardRef(ButtonLikeLink));
