import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps extends Omit<ComponentPropsWithRef<"input">, "className"> {
  /** Visible label. It also becomes the accessible name of the input. */
  label: ReactNode;
  /** Help text shown under the input. Screen readers read it after the name. */
  description?: ReactNode;
  /** Error message shown under the input. When set, the input is marked invalid. */
  error?: ReactNode;
  /** Class for the outer wrapper (label, input and messages), for layout. */
  className?: string;
}

export function TextField({
  id,
  label,
  description,
  error,
  className,
  // Renamed because a name with a hyphen cannot be a variable.
  "aria-describedby": ariaDescribedBy,
  ...props
}: TextFieldProps) {
  // One id per TextField on the page, unless the app passes its own.
  const generatedId = useId();
  const inputId = id ?? generatedId;
  // Derived from inputId, so they are unique too.
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  // Merge instead of replace: the app's own description first, then ours.
  // Screen readers read them in this order. Empty list: no attribute at all.
  const describedBy =
    [ariaDescribedBy, description && descriptionId, error && errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-invalid={error ? "" : undefined}
    >
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        {...props}
        className={styles.input}
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
      />
      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {/* src/docs/assets/icons/error.svg. Decorative: the message already says it all. */}
          <svg
            className={styles.icon}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 8v4.5" />
            <circle cx="12" cy="15.75" r="1.1" fill="currentColor" stroke="none" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
