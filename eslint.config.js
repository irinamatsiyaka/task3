import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
   {
      files: ["src/**/*.{ts,tsx}"],
      languageOptions: {
         parser: tseslint.parser,
         parserOptions: {
            project: "./tsconfig.app.json",
            tsconfigRootDir: process.cwd(),
         },
         globals: globals.browser,
      },
      plugins: {
         react: pluginReact,
         "@typescript-eslint": tseslint.plugin,
      },
      extends: [
         js.configs.recommended,
         ...tseslint.configs.recommended,
         pluginReact.configs.flat.recommended,
      ],
      settings: {
         react: { version: "detect" },
      },
      rules: {
         "react/react-in-jsx-scope": "off",
         "@typescript-eslint/no-unused-vars": ["warn"],
         "@typescript-eslint/explicit-function-return-type": ["error"],
         "@typescript-eslint/typedef": [
            "error",
            {
               arrowParameter: true,
               parameter: true,
               propertyDeclaration: true,
            },
         ],
      },
   },
]);
