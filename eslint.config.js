// @ts-check

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import config from "@hono/eslint-config";

// Enable type-aware linting for TypeScript rules and
// avoid applying typed rules to non-TS files like this config file.
export default defineConfig(
  {
    ignores: ["eslint.config.js", "worker-configuration.d.ts"],
  },
  // Base JS rules for all files
  js.configs.recommended,
  // Apply Hono + typed TypeScript rules only to TS files,
  // and enable type-aware linting for those files.
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [...config],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
