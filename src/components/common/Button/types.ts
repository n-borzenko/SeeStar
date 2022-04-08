import type { AriaAttributes } from "react";
import type { IconTypes, IconSize } from "components/common/Icon";

export type ButtonCommonProps = {
  color?: "primary" | "secondary" | "white";
  variant?: "outlined" | "filled" | "transparent";
  size?: "medium" | "large";
  wide?: boolean;
  icon?: IconTypes;
  iconSize?: IconSize;
  className?: string;
  hasWhiteBackground?: boolean;
  ariaLabel?: AriaAttributes["aria-label"];
  ariaHidden?: AriaAttributes["aria-hidden"];
};
