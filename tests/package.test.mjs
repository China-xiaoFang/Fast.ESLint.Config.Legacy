import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

test("every conditional export points to an existing runtime and declaration", () => {
	for (const [name, entry] of Object.entries(manifest.exports)) {
		if (typeof entry === "string") continue;
		assert.equal(fs.existsSync(path.join(repositoryRoot, entry.require)), true, `${name} runtime is missing`);
		assert.equal(fs.existsSync(path.join(repositoryRoot, entry.types)), true, `${name} declarations are missing`);
	}
});
