import type { ForwardRefRenderFunction, PropsWithChildren, AnchorHTMLAttributes } from "react";
import type { ButtonCommonProps } from "./types";
import { memo, forwardRef } from "react";
import ButtonWrapper from "./ButtonWrapper";

type ButtonLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "rel" | "target" | "referrerPolicy" | "onClick" | "tabIndex"
> &
  ButtonCommonProps;

const ButtonLink: ForwardRefRenderFunction<
  HTMLAnchorElement,
  PropsWithChildren<ButtonLinkProps>
> = (
  {
    href,
    rel,
    target,
    referrerPolicy,
    color,
    variant,
    size,
    wide,
    icon,
    iconSize,
    onClick,
    children,
    ariaLabel,
    ariaHidden,
    hasWhiteBackground,
    className,
    tabIndex,
  },
  ref
) => {
  return (
    <ButtonWrapper
      color={color}
      variant={variant}
      size={size}
      wide={wide}
      icon={icon}
      iconSize={iconSize}
      hasWhiteBackground={hasWhiteBackground}
      className={className}
    >
      {({ classes, iconElement }) => (
        <a
          ref={ref}
          href={href}
          rel={rel}
          referrerPolicy={referrerPolicy}
          target={target}
          className={classes}
          aria-label={ariaLabel}
          aria-hidden={ariaHidden}
          tabIndex={tabIndex}
          onClick={onClick}
        >
          {iconElement || children}
        </a>
      )}
    </ButtonWrapper>
  );
};

export default memo(forwardRef(ButtonLink));
