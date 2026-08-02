const assert = require("node:assert/strict");

const { ESLint } = require("eslint");

const rootConfig = require("@fast-china/eslint-config-legacy");

const directConfigNames = [
	"angular",
	"common",
	"commonjs",
	"environment",
	"import",
	"javascript",
	"json",
	"lodash",
	"lodash-unified",
	"markdown",
	"node",
	"prettier",
	"promise",
	"react",
	"regexp",
	"sort-package",
	"sort-tsconfig",
	"type-aware",
	"typescript",
	"vue",
	"vue2",
	"yaml",
];

const directConfigs = Object.fromEntries(directConfigNames.map((name) => [name, require(`@fast-china/eslint-config-legacy/${name}`)]));

const createLinter = (config, options = {}) =>
	new ESLint({ cwd: process.cwd(), ignore: false, overrideConfig: config, useEslintrc: false, ...options });

const composeWithRoot = (...overrides) => ({ ...rootConfig, overrides: [...rootConfig.overrides, ...overrides.flat()] });

const assertNoConfigFailure = (result, filePath) => {
	assert.equal(result.fatalErrorCount, 0, `${filePath}: ${result.messages.map((message) => message.message).join(", ")}`);
	assert.ok(!result.messages.some((message) => message.message.includes("Failed to load")), filePath);
};

module.exports = {
	assertNoConfigFailure,
	composeWithRoot,
	createLinter,
	directConfigNames,
	directConfigs,
	rootConfig,
};
