import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierRecommended from "eslint-config-prettier";

// Define the ESLint configuration
const eslintConfig = defineConfig([
  // Next.js core web vitals rules
  ...nextVitals,

  // Next.js TypeScript rules
  ...nextTs,

  // Prettier integration (disables conflicting ESLint rules)
  ...prettierRecommended,

  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
