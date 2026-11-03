import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  tseslint.configs.strict,
  reactHooks.configs.flat.recommended,
  jsxA11y.configs.recommended,
  prettier,
]);
