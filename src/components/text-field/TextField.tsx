import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
// import styles from "./TextField.module.css";

export interface TextFieldProps extends ComponentPropsWithRef<"input"> {
  /** Visible label. It also becomes the accessible name of the input. */
  label: ReactNode;
  /** Help text shown under the input. Screen readers read it after the name. */
  description?: ReactNode;
}

export function TextField({ id, label, description, ...props }: TextFieldProps) {
  // One id per TextField on the page, unless the app passes its own.
  const generatedId = useId();
  const inputId = id ?? generatedId;
  // Derived from inputId, so it is unique too.
  const descriptionId = `${inputId}-description`;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input {...props} id={inputId} aria-describedby={description ? descriptionId : undefined} />
      {description && <p id={descriptionId}>{description}</p>}
    </div>
  );
}
