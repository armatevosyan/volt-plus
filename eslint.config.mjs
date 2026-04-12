import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "object-curly-spacing": ["error", "always"],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
