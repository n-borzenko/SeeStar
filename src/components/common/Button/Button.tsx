import type {
  ForwardRefRenderFunction,
  PropsWithChildren,
  ButtonHTMLAttributes,
  AriaAttributes,
} from "react";
import type { ButtonCommonProps } from "./types";
import { memo, forwardRef } from "react";
import ButtonWrapper from "./ButtonWrapper";

type ButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "tabIndex" | "onClick"> &
  ButtonCommonProps & {
    ariaExpanded?: AriaAttributes["aria-expanded"];
    ariaHasPopup?: AriaAttributes["aria-haspopup"];
  };

const Button: ForwardRefRenderFunction<HTMLButtonElement, PropsWithChildren<ButtonProps>> = (
  {
    color,
    variant,
    size,
    wide,
    narrow,
    icon,
    iconSize,
    type,
    onClick,
    children,
    ariaExpanded,
    ariaHasPopup,
    ariaLabel,
    ariaHidden,
    hasWhiteBackground = false,
    className,
    tabIndex,
    disabled,
  },
  ref
) => {
  return (
    <ButtonWrapper
      color={color}
      variant={variant}
      size={size}
      wide={wide}
      narrow={narrow}
      icon={icon}
      iconSize={iconSize}
      hasWhiteBackground={hasWhiteBackground}
      className={className}
      disabled={disabled}
    >
      {({ classes, iconElement }) => (
        <button
          type={type}
          ref={ref}
          className={classes}
          onClick={onClick}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={ariaLabel}
          aria-hidden={ariaHidden}
          tabIndex={tabIndex}
          disabled={disabled}
        >
          {iconElement || children}
        </button>
      )}
    </ButtonWrapper>
  );
};

export default memo(forwardRef(Button));
