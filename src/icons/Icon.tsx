import type { ComponentPropsWithRef } from "react";

export interface IconProps extends ComponentPropsWithRef<"svg"> {
  /** Width and height in pixels. */
  size?: 16 | 20 | 24;
}

export function Icon({ size = 20, children, ...props }: IconProps) {
  // Decorative unless the app names it: then screen readers announce it as an image.
  const labelled = props["aria-label"] !== undefined;

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden={labelled ? undefined : true}
      role={labelled ? "img" : undefined}
      {...props}
    >
      {children}
    </svg>
  );
}
