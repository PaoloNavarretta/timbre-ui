const TOKEN_PREFIX = "--timbre-";

export function tokenName(name: string, group?: string): string {
  if (group === undefined) {
    return `${TOKEN_PREFIX}${name}`;
  }
  return `${TOKEN_PREFIX}${group}-${name}`;
}
