import { Button, type ButtonProps } from "../button";

type ButtonWithoutLoading = Omit<ButtonProps, "loading">;

export interface IconButtonProps extends ButtonWithoutLoading {
  /** The button has no visible text, so this is its only accessible name. */
  "aria-label": string;
}

export function IconButton(props: IconButtonProps) {
  return <Button {...props} data-icon-only="" />;
}
