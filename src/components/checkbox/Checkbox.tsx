import type { ComponentPropsWithRef, ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<ComponentPropsWithRef<"input">, "className" | "type"> {
  /** Visible label. It also becomes the accessible name of the input. */
  label: ReactNode;
  /** Class for the outer label (box and text), for layout. */
  className?: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={[styles.root, className].filter(Boolean).join(" ")}>
      <input {...props} type="checkbox" />
      {label}
    </label>
  );
}
