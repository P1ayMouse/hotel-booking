import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Рекомендовані правила для React
  pluginReact.configs.flat.recommended,
  // 2) Базові правила JavaScript
  js.configs.recommended,
  // 3) Кастомна конфігурація та overrides
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    plugins: {
      "react-hooks": pluginHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-shorthand": ["error", "always"],
      "semi": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }],
      "indent": ["error", 4, { "SwitchCase": 1 }]
    }
  },
]);
