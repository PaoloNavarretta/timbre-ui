import type { ComponentPropsWithRef, MouseEvent } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /** Visual weight. One `primary` per view; `danger` for destructive actions. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Height, padding and font size. */
  size?: "sm" | "md" | "lg";
  /**
   * Shows a spinner and ignores clicks while an action runs.
   * The button stays focusable and is announced as dimmed.
   */
  loading?: boolean;
}

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  type = "button",
  className,
  onClick,
  children,
  ref,
  ...props
}: ButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
