import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
// import styles from "./TextField.module.css";

export interface TextFieldProps extends ComponentPropsWithRef<"input"> {
  /** Visible label. It also becomes the accessible name of the input. */
  label: ReactNode;
  /** Help text shown under the input. Screen readers read it after the name. */
  description?: ReactNode;
  /** Error message shown under the input. When set, the input is marked invalid. */
  error?: ReactNode;
}

export function TextField({
  id,
  label,
  description,
  error,
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
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        {...props}
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
      />
      {description && <p id={descriptionId}>{description}</p>}
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
