import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.strict,
	{
		files: ["**/*.ts"],
		ignores: ["**/*.spec.ts"],
		languageOptions: {
			ecmaVersion: 2017,
			globals: {
				...js.globals
			},
			parserOptions: {
				projectService: true
			}
		},
		plugins: {
			"@stylistic": stylistic
		},
		linterOptions: {
			reportUnusedDisableDirectives: "error"
		},
		rules: {
			"eqeqeq": ["error", "smart"],
			"no-prototype-builtins": "off",
			"@stylistic/brace-style": "error",
			"@stylistic/dot-location": ["warn", "property"],
			"@stylistic/eol-last": "error",
			"@stylistic/keyword-spacing": "error",
			"@stylistic/max-len": ["warn",
				{
					code: 120,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true
				}
			],
			"@stylistic/semi": ["warn", "always"],
			"@typescript-eslint/naming-convention": ["error",
				{
					selector: "interface",
					format: ["PascalCase"],
					prefix: ["I"]
				}, {
					selector: "typeAlias",
					format: ["PascalCase"],
					prefix: ["T"]
				}
			],
			"@typescript-eslint/no-var-requires": "off"
		}
	}
);
