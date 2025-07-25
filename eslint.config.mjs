import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "**/*.test.js",
      "**/*.test.mjs",
      "**/*.test.cjs",
      "**/*.spec.js",
      "**/*.spec.mjs",
      "**/*.spec.cjs",
      "**/__tests__/**",
    ],
  },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
