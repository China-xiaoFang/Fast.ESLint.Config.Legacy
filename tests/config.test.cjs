const assert = require("node:assert/strict");
const test = require("node:test");
const configs = require("@fast-china/eslint-config-legacy/configs");
const { assertNoConfigFailure, composeWithRoot, createLinter, directConfigNames, directConfigs, rootConfig } = require("./helpers/eslint.cjs");

test("every granular config resolves through its public Legacy extends name", async () => {
	for (const name of directConfigNames) {
		const filePath =
			name === "angular"
				? "fixtures/app.component.ts"
				: name === "react"
					? "fixtures/App.tsx"
					: name.startsWith("vue")
						? "fixtures/App.vue"
						: "fixtures/example.ts";
		const calculated = await createLinter({ extends: [`@fast-china/eslint-config-legacy/${name}`] }).calculateConfigForFile(filePath);
		assert.ok(calculated, `${name} did not resolve`);
	}
});

test("package root contains the documented Vue 3 browser stack", () => {
	const serialized = JSON.stringify(rootConfig);
	assert.match(serialized, /plugin:vue\/recommended/);
	assert.match(serialized, /plugin:@typescript-eslint\/recommended/);
	assert.match(serialized, /plugin:jsonc\/recommended-with-jsonc/);
	assert.match(serialized, /plugin:yml\/recommended/);
	assert.match(serialized, /plugin:markdown\/recommended-legacy/);
	assert.doesNotMatch(serialized, /vue2-recommended|plugin:react\/recommended|plugin:@angular-eslint\/recommended/);
});

test("package root parses every documented file family", async () => {
	const linter = createLinter(rootConfig);
	const fixtures = [
		["fixtures/example.js", "const answer = 42;\n\nexport { answer };\n"],
		["fixtures/example.ts", 'const message = "hello";\n\nexport { message };\n'],
		["fixtures/App.vue", '<script setup lang="ts">\nconst message = "hello";\n</script>\n<template><main>{{ message }}</main></template>\n'],
		["fixtures/example.jsonc", '{\n\t// comment\n\t"enabled": true\n}\n'],
		["fixtures/example.yaml", "enabled: true\n"],
		["fixtures/example.md", "# Example\n"],
	];
	for (const [filePath, code] of fixtures) {
		for (const result of await linter.lintText(code, { filePath })) assertNoConfigFailure(result, filePath);
	}
});

test("browser source and Node.js tooling receive separate globals", async () => {
	const linter = createLinter(rootConfig);
	const [browserResult] = await linter.lintText("process.cwd();\n", { filePath: "src/browser.js" });
	const [viteResult] = await linter.lintText("console.log(process.cwd());\n", { filePath: "vite.config.js" });
	assert.ok(browserResult.messages.some((message) => message.ruleId === "no-undef"));
	assert.ok(!viteResult.messages.some((message) => message.ruleId === "no-undef" || message.ruleId === "no-console"));
});

test("Vue 2 and Vue 3 expose different version-specific contracts", async () => {
	const vue2Config = await createLinter(directConfigs.vue2).calculateConfigForFile("fixtures/App.vue");
	const vue3Config = await createLinter(directConfigs.vue).calculateConfigForFile("fixtures/App.vue");
	assert.equal(vue2Config.rules["vue/require-explicit-emits"][0], "off");
	assert.equal(vue3Config.rules["vue/require-explicit-emits"][0], "error");
});

test("shared JavaScript, TypeScript, Vue, and RegExp rules match the modern config contract", async () => {
	const rootLinter = createLinter(rootConfig);
	const javaScriptConfig = await rootLinter.calculateConfigForFile("fixtures/example.js");
	const typeScriptConfig = await rootLinter.calculateConfigForFile("fixtures/example.ts");
	const vueConfig = await rootLinter.calculateConfigForFile("fixtures/App.vue");
	const regexpConfig = await createLinter(directConfigs.regexp).calculateConfigForFile("fixtures/example.js");

	assert.equal(javaScriptConfig.rules.camelcase[0], "error");
	assert.equal(javaScriptConfig.rules.camelcase[1].properties, "never");
	assert.deepEqual(javaScriptConfig.rules["no-restricted-syntax"], ["error", "LabeledStatement", "WithStatement"]);
	assert.deepEqual(typeScriptConfig.rules["@typescript-eslint/explicit-module-boundary-types"], [
		"error",
		{ allowArgumentsExplicitlyTypedAsAny: false },
	]);
	assert.deepEqual(typeScriptConfig.rules["@typescript-eslint/no-empty-function"], ["error", { allow: ["constructors", "overrideMethods"] }]);
	assert.equal(typeScriptConfig.rules["@typescript-eslint/no-non-null-assertion"][0], "error");
	assert.equal(vueConfig.rules["vue/prefer-import-from-vue"][0], "off");
	assert.deepEqual(vueConfig.rules["vue/attribute-hyphenation"], ["error", "always"]);
	assert.deepEqual(vueConfig.rules["vue/html-closing-bracket-newline"], ["off", { multiline: "always", singleline: "never" }]);
	assert.equal(regexpConfig.rules["regexp/no-super-linear-backtracking"][0], "error");
	assert.equal(regexpConfig.rules["regexp/strict"][0], "error");
	assert.equal(regexpConfig.rules["regexp/control-character-escape"], undefined);
});

test("style imports form a final stable group while other imports retain import-x ordering", async () => {
	const linter = createLinter({ overrides: configs.createImportConfigs(["**/*.js"]) });
	const [validResult] = await linter.lintText(
		'import vue from "vue";\nimport App from "./App.vue";\nimport "./z.scss";\nimport "vue-json-pretty/lib/styles.css";\nimport styles from "./a.module.scss?inline";\nvoid vue;\nvoid App;\nvoid styles;\n',
		{ filePath: "fixtures/style-imports-valid.js" }
	);
	const [misplacedStyleResult] = await linter.lintText('import "./theme.scss";\nimport App from "./App.vue";\nvoid App;\n', {
		filePath: "fixtures/style-imports-invalid.js",
	});
	const [sideEffectResult] = await linter.lintText('import App from "./App.vue";\nimport "reflect-metadata";\nvoid App;\n', {
		filePath: "fixtures/side-effect-imports-invalid.js",
	});
	const [alphabetizeResult] = await linter.lintText('import z from "z";\nimport a from "a";\nvoid z;\nvoid a;\n', {
		filePath: "fixtures/alphabetize-imports-invalid.js",
	});

	assert.equal(validResult.errorCount, 0, validResult.messages.map((message) => message.message).join(", "));
	assert.equal(misplacedStyleResult.messages.filter((message) => message.ruleId === "import-x/style-imports-last").length, 1);
	assert.ok(!misplacedStyleResult.messages.some((message) => message.ruleId === "import-x/order"));
	assert.equal(misplacedStyleResult.messages.find((message) => message.ruleId === "import-x/style-imports-last")?.fix, undefined);
	assert.ok(sideEffectResult.messages.some((message) => message.ruleId === "import-x/order"));
	assert.ok(alphabetizeResult.messages.some((message) => message.ruleId === "import-x/order"));
});

test("React and Angular configs load their parsers, processors, and local rules", async () => {
	const react = createLinter({ overrides: configs.createReactConfigs() });
	const angular = createLinter({ overrides: configs.createAngularConfigs() });
	const [reactResult] = await react.lintText(
		'import { useState } from "react";\nexport const App = () => { if (true) useState(0); return <button>Save</button>; };\n',
		{ filePath: "fixtures/App.tsx" }
	);
	const [angularResult] = await angular.lintText(
		'import { Component } from "@angular/core";\n@Component({ standalone: true, template: `<img src="logo.png">` }) export class App {}\n',
		{ filePath: "fixtures/app.component.ts" }
	);
	assertNoConfigFailure(reactResult, "fixtures/App.tsx");
	assertNoConfigFailure(angularResult, "fixtures/app.component.ts");
	assert.ok(reactResult.messages.some((message) => message.ruleId === "react/button-has-type"));
	assert.ok(angularResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
});

test("type-aware overlay starts Project Service and enables typed rules", async () => {
	const linter = createLinter(composeWithRoot(configs.createTypeAwareConfigs()));
	const [result] = await linter.lintFiles(["src/index.ts"]);
	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	const calculated = await linter.calculateConfigForFile("src/index.ts");
	assert.ok(calculated.rules["@typescript-eslint/no-floating-promises"]);
	assert.equal(calculated.rules["@typescript-eslint/return-await"][0], "error");
	assert.equal(calculated.rules["@typescript-eslint/prefer-promise-reject-errors"][1].allowThrowingUnknown, true);
});

test("package sorting preserves semantic exports condition order", async () => {
	const linter = createLinter(composeWithRoot(configs.createPackageJsonSortConfigs()), { fix: true });
	const source = '{"name":"fixture","version":"1.0.0","exports":{".":{"node":"./node.js","import":"./index.js","default":"./index.js"}}}\n';
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;
	const calculated = await linter.calculateConfigForFile("fixtures/package.json");
	const rootOrder = calculated.rules["jsonc/sort-keys"][1].order;
	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
	assert.ok(!rootOrder.includes("allowScripts"));
});
