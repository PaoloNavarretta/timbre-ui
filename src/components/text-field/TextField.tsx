import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
// import styles from "./TextField.module.css";

export interface TextFieldProps extends ComponentPropsWithRef<"input"> {
  /** Visible label. It also becomes the accessible name of the input. */
  label: ReactNode;
}

export function TextField({ id, label, ...props }: TextFieldProps) {
  // One id per TextField on the page, unless the app passes its own.
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input {...props} id={inputId} />
    </div>
  );
}
