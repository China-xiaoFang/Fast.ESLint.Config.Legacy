import fastConfig = require("@fast-china/eslint-config-legacy");
import { createConfig } from "@fast-china/eslint-config-legacy/factory";
import { type RuleOptions, defineRules } from "@fast-china/eslint-config-legacy/rules";

import type { Linter } from "eslint";

const rootConfig: Linter.Config = fastConfig;
const nodeConfig: Linter.Config = createConfig({ environment: "node", vue: false });
const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"import/order": ["error", { "newlines-between": "always" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"vue/attributes-order": "error",
});
const typedRules = {
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
} satisfies RuleOptions;

void nodeConfig;
void projectRules;
void rootConfig;
void typedRules;

// @ts-expect-error Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });
