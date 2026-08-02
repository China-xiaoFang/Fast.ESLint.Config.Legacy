const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const configs = require("@fast-china/eslint-config-legacy/configs");
const constants = require("@fast-china/eslint-config-legacy/constants");
const rules = require("@fast-china/eslint-config-legacy/rules");

const manifest = require("../package.json");

const { directConfigNames, directConfigs, rootConfig } = require("./helpers/eslint.cjs");

const repositoryRoot = path.resolve(__dirname, "..");

test("package manifest exposes every supported public entry", () => {
	for (const name of directConfigNames) assert.ok(manifest.exports[`./${name}`], `${name} export is missing`);
	for (const name of [".", "./configs", "./constants", "./rules", "./package.json"]) {
		assert.ok(manifest.exports[name], `${name} export is missing`);
	}
});

test("CommonJS entries expose configs directly without a default wrapper", () => {
	assert.ok(Array.isArray(rootConfig.overrides));
	for (const [name, config] of Object.entries(directConfigs)) {
		assert.equal(Object.hasOwn(config, "default"), false, `${name} must not require .default`);
		assert.ok(Array.isArray(config.overrides) || Array.isArray(config.extends), `${name} is not a Legacy config`);
	}
	assert.equal(typeof configs.createCommonConfigs, "function");
	assert.equal(typeof configs.createVueConfigs, "function");
	assert.match(constants.GLOB_VUE, /vue/);
	assert.deepEqual(rules.defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("source layout keeps public configs separate from colocated factories", () => {
	const indexSource = fs.readFileSync(path.join(repositoryRoot, "src/index.ts"), "utf8");
	assert.equal(fs.existsSync(path.join(repositoryRoot, "src/base.ts")), false);
	assert.equal(fs.existsSync(path.join(repositoryRoot, "src/define-rules.ts")), false);
	assert.equal(fs.existsSync(path.join(repositoryRoot, "src/presets")), false);
	assert.equal(fs.existsSync(path.join(repositoryRoot, "src/extends")), false);
	assert.match(fs.readFileSync(path.join(repositoryRoot, "src/rules/index.ts"), "utf8"), /export const defineRules/);
	assert.doesNotMatch(indexSource, /createBaseConfigs|createPreset|createLegacyConfig/);

	for (const name of directConfigNames) {
		const source = fs.readFileSync(path.join(repositoryRoot, `src/configs/${name}/index.ts`), "utf8");
		assert.match(source, /export default config/, `${name}/index.ts must default-export its config`);
		assert.match(source, /@public/, `${name}/index.ts must document its public config`);
	}

	const commonFactory = fs.readFileSync(path.join(repositoryRoot, "src/configs/common/factory.ts"), "utf8");
	assert.match(commonFactory, /export const createCommonConfigs/);
	assert.doesNotMatch(fs.readFileSync(path.join(repositoryRoot, "src/configs/common/index.ts"), "utf8"), /export const createCommonConfigs/);
});

test("every conditional export points to an existing runtime and declaration", () => {
	for (const [name, entry] of Object.entries(manifest.exports)) {
		if (typeof entry === "string") continue;
		assert.equal(fs.existsSync(path.join(repositoryRoot, entry.require)), true, `${name} runtime is missing`);
		assert.equal(fs.existsSync(path.join(repositoryRoot, entry.types)), true, `${name} declarations are missing`);
	}
});
