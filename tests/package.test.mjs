import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// 这些调用用于验证 CommonJS 入口，使用别名避免与 import-x/order 的 require 分组产生格式冲突。
const loadCommonJs = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configs = loadCommonJs("@fast-china/eslint-config-legacy/configs");
const constants = loadCommonJs("@fast-china/eslint-config-legacy/constants");
const rules = loadCommonJs("@fast-china/eslint-config-legacy/rules");
const manifest = loadCommonJs("../package.json");
const { directConfigNames, directConfigs, rootConfig } = loadCommonJs("./helpers/eslint.cjs");

const repositoryRoot = path.resolve(__dirname, "..");

test("package metadata and publish allowlist identify the Fast package", () => {
	assert.ok(manifest.keywords.includes("fast"));
	assert.ok(manifest.keywords.includes("fast-china"));
	assert.ok(manifest.files.includes("dist"));
	assert.ok(!manifest.files.includes("src"));
});

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

test("declaration maps are not published without their source files", () => {
	const visit = (directory) => {
		for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
			const filePath = path.join(directory, entry.name);
			if (entry.isDirectory()) visit(filePath);
			else assert.ok(!entry.name.endsWith(".d.ts.map"), `unexpected declaration map: ${path.relative(repositoryRoot, filePath)}`);
		}
	};

	visit(path.join(repositoryRoot, "dist"));
});
