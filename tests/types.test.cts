// Compile-only checks for the public CommonJS declarations.
import config = require("@fast-china/eslint-config-legacy");
import commonConfig = require("@fast-china/eslint-config-legacy/common");
import {
	createAngularConfigs,
	createCommonConfigs,
	createEnvironmentConfigs,
	createJavaScriptConfigs,
	createReactConfigs,
	createTypeScriptConfigs,
	createVueConfigs,
} from "@fast-china/eslint-config-legacy/configs";
import { GLOBS_CODE, GLOB_VUE } from "@fast-china/eslint-config-legacy/constants";
import { type RuleOptions, defineRules, preferLodashRules, preferLodashUnifiedRules } from "@fast-china/eslint-config-legacy/rules";
import typeAwareConfig = require("@fast-china/eslint-config-legacy/type-aware");
import vueConfig = require("@fast-china/eslint-config-legacy/vue");
import vue2Config = require("@fast-china/eslint-config-legacy/vue2");

import type { Linter } from "eslint";

const defaultConfig: Linter.Config = config;
const directConfigs: Linter.Config[] = [commonConfig, typeAwareConfig, vueConfig, vue2Config];
const fragments: Linter.ConfigOverride[] = [
	...createEnvironmentConfigs({ environment: "browser", files: GLOBS_CODE }),
	...createCommonConfigs(GLOBS_CODE),
	...createJavaScriptConfigs(),
	...createTypeScriptConfigs(),
	...createVueConfigs({ files: [GLOB_VUE], version: 2 }),
	...createVueConfigs({ files: [GLOB_VUE], version: 3 }),
	...createReactConfigs(),
	...createAngularConfigs(),
];
const projectRules = defineRules({
	"@typescript-eslint/no-unused-vars": ["error", { args: "after-used" }],
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"vue/attributes-order": "error",
});
const typedRules = {
	"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
} satisfies RuleOptions;

void defaultConfig;
void directConfigs;
void fragments;
void projectRules;
void typedRules;
void preferLodashRules;
void preferLodashUnifiedRules;

// @ts-expect-error Unknown rule names must be rejected.
defineRules({ "vue/not-a-real-rule": "error" });
