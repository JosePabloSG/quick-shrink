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
      // Allows apostrophes in JSX without escaping
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Prevent React Hooks issues
      "react-hooks/rules-of-hooks": "error", // Enforces Rules of Hooks
      "react-hooks/exhaustive-deps": "warn",  // Checks effect dependencies

      // Code quality
      "no-unused-vars": "error",         // Prevents dead code
      "no-console": ["warn", { allow: ["warn", "error"] }], // No console.logs in prod
      "no-duplicate-imports": "error",    // Prevents duplicate imports

      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",     // Discourages using 'any' type

      // Error prevention
      "no-var": "error",                 // Prefer const/let over var
      "prefer-const": "error",           // Use const when possible
      "no-multiple-empty-lines": ["error", { max: 1 }], // Consistent spacing

      // Import organization
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal"],
        "newlines-between": "always",
        "alphabetize": { order: "asc" }
      }],

      // React specific
      "react/prop-types": "error",       // Enforces prop types definition
      "react/jsx-no-duplicate-props": "error", // No duplicate props
      "react/jsx-pascal-case": "error",  // Components must be PascalCase

      // Code style
      "indent": ["error", 2],            // 2 space indentation
      "quotes": ["warn", "double", { avoidEscape: true }], // Use double quotes to match Next.js style
      "semi": ["error", "always"]        // Required semicolons
    }
  }
];

export default eslintConfig;