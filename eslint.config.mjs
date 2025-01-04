import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // React-specific rules
      "react/no-unescaped-entities": "off", // Allows unescaped entities in JSX
      "react-hooks/rules-of-hooks": "error", // Enforce Rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in effects
      "react/prop-types": "error", // Enforce prop types definition
      "react/jsx-no-duplicate-props": "error", // Prevent duplicate props in JSX
      "react/jsx-pascal-case": "error", // Enforce PascalCase for component names

      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn", // Discourage the use of 'any'
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused args starting with '_'

      // General code quality
      "no-unused-vars": "error", // Prevent unused variables
      "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console.warn and console.error
      "no-duplicate-imports": "error", // Prevent duplicate imports
      "no-var": "error", // Disallow var declarations
      "prefer-const": "error", // Prefer const over let when possible
      "no-multiple-empty-lines": ["error", { max: 1 }], // Limit consecutive empty lines

      // Import organization
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { order: "asc", caseInsensitive: true },
      }],

      // Code style
      "indent": ["error", 2], // Enforce 2-space indentation
      "quotes": ["warn", "double", { avoidEscape: true }], // Enforce double quotes
      "semi": ["error", "always"], // Require semicolons
    },
  },
];

export default eslintConfig;
