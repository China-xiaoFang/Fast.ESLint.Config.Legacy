import angularConfig = require("@fast-china/eslint-config-legacy/angular");
import baseConfig = require("@fast-china/eslint-config-legacy/base");
import javaScriptConfig = require("@fast-china/eslint-config-legacy/javascript");
import lodashConfig = require("@fast-china/eslint-config-legacy/lodash");
import lodashUnifiedConfig = require("@fast-china/eslint-config-legacy/lodash-unified");
import nodeConfig = require("@fast-china/eslint-config-legacy/node");
import reactConfig = require("@fast-china/eslint-config-legacy/react");
import { type RuleOptions, defineRules, preferLodashRules, preferLodashUnifiedRules } from "@fast-china/eslint-config-legacy/rules";
import sortPackageConfig = require("@fast-china/eslint-config-legacy/sort-package");
import sortTsconfigConfig = require("@fast-china/eslint-config-legacy/sort-tsconfig");
import typeAwareConfig = require("@fast-china/eslint-config-legacy/type-aware");
import typeScriptConfig = require("@fast-china/eslint-config-legacy/typescript");
import vue2Config = require("@fast-china/eslint-config-legacy/vue2");
import vue3Config = require("@fast-china/eslint-config-legacy/vue3");

import type { Linter } from "eslint";

const presets: Linter.Config[] = [
	angularConfig,
	baseConfig,
	javaScriptConfig,
	lodashConfig,
	lodashUnifiedConfig,
	nodeConfig,
	reactConfig,
	sortPackageConfig,
	sortTsconfigConfig,
	typeAwareConfig,
	typeScriptConfig,
	vue2Config,
	vue3Config,
];
const projectRules = defineRules({
	"@angular-eslint/template/alt-text": "error",
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"jsx-a11y/alt-text": "error",
	"import-x/order": ["error", { "newlines-between": "always" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"react-hooks/rules-of-hooks": "error",
	"vue/attributes-order": "error",
	"yml/no-empty-document": "error",
});
const typedRules = {
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
} satisfies RuleOptions;

void presets;
void projectRules;
void typedRules;
void preferLodashRules;
void preferLodashUnifiedRules;

// @ts-expect-error Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });
