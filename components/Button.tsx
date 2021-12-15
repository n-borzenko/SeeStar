import { FC, MouseEventHandler, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  color?: "primary";
  variant?: "outlined" | "filled";
  size?: "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({
  color = "primary",
  variant = "filled",
  size = "medium",
  type,
  onClick,
  children,
}) => {
  const classes = clsx(
    "text",
    "rounded-full",
    "border",

    size === "medium" && ["py-1", "px-2.5", "text-sm"],
    size === "large" && ["py-1.5", "px-3", "text-lg"],

    variant === "filled" &&
      color === "primary" && [
        "text-white",
        "bg-primary",
        "border-primary/0",
        "hover:bg-primary/80",
        "active:bg-primary/60",
      ],

    variant === "outlined" &&
      color === "primary" && [
        "text-primary",
        "bg-primary/0",
        "border-primary",
        "hover:bg-primary/10",
        "active:bg-primary/20",
      ]
  );

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
