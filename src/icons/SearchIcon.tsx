import { Icon, type IconProps } from "./Icon";

export function SearchIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4"></path>
    </Icon>
  );
}
