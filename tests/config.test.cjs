const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { ESLint } = require("eslint");
const { builtinRules } = require("eslint/use-at-your-own-risk");
const ts = require("typescript");

const { defineRules, preferLodashRules, preferLodashUnifiedRules } = require("@fast-china/eslint-config-legacy/rules");

const directPresets = {
	angular: require("@fast-china/eslint-config-legacy/angular"),
	base: require("@fast-china/eslint-config-legacy/base"),
	javascript: require("@fast-china/eslint-config-legacy/javascript"),
	lodash: require("@fast-china/eslint-config-legacy/lodash"),
	"lodash-unified": require("@fast-china/eslint-config-legacy/lodash-unified"),
	node: require("@fast-china/eslint-config-legacy/node"),
	react: require("@fast-china/eslint-config-legacy/react"),
	"sort-package": require("@fast-china/eslint-config-legacy/sort-package"),
	"sort-tsconfig": require("@fast-china/eslint-config-legacy/sort-tsconfig"),
	"type-aware": require("@fast-china/eslint-config-legacy/type-aware"),
	typescript: require("@fast-china/eslint-config-legacy/typescript"),
	vue2: require("@fast-china/eslint-config-legacy/vue2"),
	vue3: require("@fast-china/eslint-config-legacy/vue3"),
};
const {
	angular: angularConfig,
	base: baseConfig,
	javascript: javaScriptConfig,
	node: nodeConfig,
	react: reactConfig,
	"type-aware": typeAwareConfig,
	typescript: typeScriptConfig,
	vue2: vue2Config,
	vue3: vue3Config,
} = directPresets;

const rulesDirectory = path.resolve(__dirname, "../src/rules");
const configsDirectory = path.resolve(__dirname, "../src/configs");
const readRuleSources = () =>
	fs
		.readdirSync(rulesDirectory)
		.filter((fileName) => fileName.endsWith(".ts") && fileName !== "index.ts")
		.map((fileName) => ({ fileName, source: fs.readFileSync(path.join(rulesDirectory, fileName), "utf8") }));

const createLinter = (config, options = {}) =>
	new ESLint({
		cwd: process.cwd(),
		ignore: false,
		overrideConfig: config,
		useEslintrc: false,
		...options,
	});

const assertNoConfigFailure = (result, filePath) => {
	assert.equal(result.fatalErrorCount, 0, `${filePath}: ${result.messages.map((message) => message.message).join(", ")}`);
	assert.ok(
		!result.messages.some(
			(message) =>
				message.message.includes("Definition for rule") ||
				message.message.includes("Failed to load") ||
				message.message.includes("Environment key")
		),
		`${filePath}: ${result.messages.map((message) => message.message).join(", ")}`
	);
};

test("every public subpath exports an ESLint 8 config and the package root is intentionally absent", () => {
	assert.throws(
		() => require("@fast-china/eslint-config-legacy"),
		(error) => error?.code === "ERR_PACKAGE_PATH_NOT_EXPORTED"
	);
	assert.deepEqual(defineRules({ "no-console": "warn" }), { "no-console": "warn" });
	assert.ok(preferLodashRules["no-restricted-imports"]);
	assert.ok(preferLodashUnifiedRules["no-restricted-imports"]);

	for (const [name, config] of Object.entries(directPresets)) {
		assert.ok(Array.isArray(config.overrides), `${name} has no overrides`);
	}
});

test("source dependencies flow from sibling presets through core/index into config creators", () => {
	const coreSource = fs.readFileSync(path.resolve(__dirname, "../src/core/index.ts"), "utf8");
	const presetDirectory = path.resolve(__dirname, "../src/presets");
	const configCreators = {
		"angular.ts": ["createAngularConfigs"],
		"common.ts": ["createBaseConfigs"],
		"commonjs.ts": ["createCommonJsConfigs"],
		"environment.ts": ["createEnvironmentConfigs", "createNodeToolingConfigs"],
		"import.ts": ["createImportConfigs"],
		"javascript.ts": ["createJavaScriptConfigs"],
		"json.ts": ["createJsonConfigs"],
		"lodash.ts": ["createLodashConfigs"],
		"markdown.ts": ["createMarkdownConfigs"],
		"prettier.ts": ["createPrettierConfigs"],
		"promise.ts": ["createPromiseConfigs"],
		"react.ts": ["createReactConfigs"],
		"regexp.ts": ["createRegexpConfigs"],
		"root.ts": ["createLegacyConfig"],
		"sort-package.ts": ["createPackageJsonSortConfigs"],
		"sort-tsconfig.ts": ["createTsconfigSortConfigs"],
		"typescript.ts": ["createTypeAwareConfigs", "createTypeScriptConfigs"],
		"vue.ts": ["createVueConfigs"],
		"yaml.ts": ["createYamlConfigs"],
	};

	assert.equal(fs.existsSync(path.resolve(__dirname, "../src/index.ts")), false);
	assert.equal(fs.existsSync(path.resolve(__dirname, "../src/define-rules.ts")), true);
	assert.equal(fs.existsSync(path.resolve(__dirname, "../src/typegen.d.ts")), true);
	assert.equal(fs.existsSync(path.join(rulesDirectory, "define-rules.ts")), false);
	assert.equal(fs.existsSync(path.join(rulesDirectory, "typegen.d.ts")), false);
	assert.match(coreSource, /createJsonConfigs/);
	assert.match(coreSource, /from "\.\.\/configs\/json"/);
	assert.match(coreSource, /export const createPreset/);
	assert.doesNotMatch(coreSource, /fastConfig|defaultConfigOptions|overrides\.push/);
	assert.equal(fs.existsSync(path.resolve(__dirname, "../src/factory.ts")), false);
	assert.equal(fs.existsSync(path.resolve(__dirname, "../src/core/factory.ts")), false);

	for (const [fileName, creators] of Object.entries(configCreators)) {
		const source = fs.readFileSync(path.join(configsDirectory, fileName), "utf8");
		for (const creator of creators) {
			assert.match(source, new RegExp(`export const ${creator}`), `${fileName} must own ${creator}()`);
		}
	}

	for (const { fileName, source } of readRuleSources()) {
		assert.doesNotMatch(source, /create[A-Z]\w*Configs/, `${fileName} must contain rules, not config factories`);
	}

	for (const fileName of fs.readdirSync(presetDirectory)) {
		const source = fs.readFileSync(path.join(presetDirectory, fileName), "utf8");

		assert.match(source, /from "\.\.\/core\/index"/, `${fileName} must depend on core/index`);
		assert.doesNotMatch(source, /from "\.\.\/index"/, `${fileName} must not import a package root entry`);
	}
});

test("public presets and rule records carry framework-level API documentation", () => {
	const presetDirectory = path.resolve(__dirname, "../src/presets");
	const defineRulesSource = fs.readFileSync(path.resolve(__dirname, "../src/define-rules.ts"), "utf8");
	const typegenSource = fs.readFileSync(path.resolve(__dirname, "../src/typegen.d.ts"), "utf8");

	for (const fileName of fs.readdirSync(presetDirectory)) {
		const source = fs.readFileSync(path.join(presetDirectory, fileName), "utf8");
		assert.match(source, /@example/, `${fileName} must document Legacy extends usage`);
		assert.match(source, /@public/, `${fileName} must mark its declaration as public API`);
		assert.match(source, /const config: Linter\.Config/, `${fileName} must expose a typed Legacy config`);
	}

	for (const { fileName, source } of readRuleSources()) {
		const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

		for (const statement of sourceFile.statements) {
			if (!ts.isVariableStatement(statement) || !statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))
				continue;

			const declarationName = statement.declarationList.declarations[0]?.name.getText(sourceFile) ?? "unknown";
			const documentation = source.slice(statement.getFullStart(), statement.getStart(sourceFile));
			assert.match(documentation, /\/\*\*[\s\S]*@public[\s\S]*\*\//, `${fileName}:${declarationName} needs public API documentation`);
		}
	}

	assert.match(defineRulesSource, /@param rules/);
	assert.match(defineRulesSource, /@returns/);
	assert.match(defineRulesSource, /@example/);
	assert.match(defineRulesSource, /@public/);
	assert.equal((typegenSource.match(/@public/g) ?? []).length, 2, "generated public rule types must stay documented");
});

test("ESLint resolves explicit framework presets through extends names", async () => {
	const cases = [
		["@fast-china/eslint-config-legacy/vue3", "fixtures/consumer.vue"],
		["@fast-china/eslint-config-legacy/react", "fixtures/consumer.tsx"],
		["@fast-china/eslint-config-legacy/angular", "fixtures/consumer.ts"],
	];

	for (const [preset, filePath] of cases) {
		const linter = createLinter({ extends: [preset] });
		const calculated = await linter.calculateConfigForFile(filePath);
		assert.ok(Object.keys(calculated.rules).length > 0, `${preset} did not resolve rules`);
	}
});

test("static presets expose deterministic language and framework boundaries", () => {
	const vue3Serialized = JSON.stringify(vue3Config);
	const baseSerialized = JSON.stringify(baseConfig);
	const javaScriptSerialized = JSON.stringify(javaScriptConfig);
	const typeScriptSerialized = JSON.stringify(typeScriptConfig);
	const typeAwareExtends = typeAwareConfig.overrides.flatMap((override) => override.extends ?? []);

	assert.match(vue3Serialized, /plugin:vue\/recommended/);
	assert.match(vue3Serialized, /plugin:yml\/recommended/);
	assert.doesNotMatch(vue3Serialized, /vue2-recommended|plugin:react\/recommended|plugin:@angular-eslint\/recommended/);
	assert.match(baseSerialized, /plugin:jsonc\/recommended-with-jsonc|plugin:yml\/recommended|plugin:markdown\/recommended/);
	assert.doesNotMatch(baseSerialized, /plugin:vue|plugin:react|plugin:@angular-eslint/);
	assert.doesNotMatch(javaScriptSerialized, /@typescript-eslint\/recommended|plugin:jsonc|plugin:yml|plugin:markdown/);
	assert.match(typeScriptSerialized, /plugin:@typescript-eslint\/recommended/);
	assert.doesNotMatch(typeScriptSerialized, /recommended-type-checked|plugin:jsonc|plugin:yml|plugin:markdown/);
	assert.ok(typeAwareExtends.includes("plugin:@typescript-eslint/recommended-type-checked"));
	assert.ok(typeAwareExtends.includes("plugin:@typescript-eslint/stylistic-type-checked"));
});

test("optional policies compose through explicit Legacy extends entries", async () => {
	for (const [preference, blockedImport] of [
		["lodash", "lodash-es"],
		["lodash-unified", "lodash"],
	]) {
		const linter = createLinter({
			extends: ["@fast-china/eslint-config-legacy/javascript", `@fast-china/eslint-config-legacy/${preference}`],
		});
		const [result] = await linter.lintText(`import value from "${blockedImport}";\n\nexport { value };\n`, {
			filePath: "src/lodash-policy.js",
		});
		assert.ok(result.messages.some((message) => message.ruleId === "no-restricted-imports"));
	}

	const projectRuleCalculated = await createLinter({
		extends: ["@fast-china/eslint-config-legacy/vue3"],
		rules: { "no-console": "error" },
	}).calculateConfigForFile("vite.config.js");
	assert.equal(projectRuleCalculated.rules["no-console"][0], "error");

	const sortingLinter = createLinter({
		extends: [
			"@fast-china/eslint-config-legacy/base",
			"@fast-china/eslint-config-legacy/sort-package",
			"@fast-china/eslint-config-legacy/sort-tsconfig",
		],
	});
	const sortedPackageConfig = await sortingLinter.calculateConfigForFile("package.json");
	const sortedTsconfig = await sortingLinter.calculateConfigForFile("tsconfig.json");
	assert.equal(sortedPackageConfig.rules["jsonc/sort-keys"][0], "error");
	assert.equal(sortedTsconfig.rules["jsonc/sort-keys"][0], "error");
});

test("JavaScript, TypeScript, Vue, JSON dialects, YAML, and Markdown parse without configuration failures", async () => {
	const linter = createLinter(vue3Config);
	const fixtures = [
		["fixtures/example.js", "const answer = 42;\n\nexport { answer };\n"],
		["fixtures/example.ts", 'const message = "hello";\n\nexport { message };\n'],
		[
			"fixtures/App.vue",
			'<script setup lang="ts">\nconst message = "hello";\n</script>\n\n<template>\n\t<main>{{ message }}</main>\n</template>\n',
		],
		["fixtures/example.json", '{ "enabled": true }\n'],
		["fixtures/example.jsonc", '{\n\t// JSONC comments are valid.\n\t"enabled": true\n}\n'],
		["fixtures/example.json5", "{ enabled: true, }\n"],
		["fixtures/example.yaml", "enabled: true\nitems:\n  - first\n"],
		["fixtures/example.md", "# Example\n\n```js\nconsole.log(unknownGlobal);\n```\n"],
	];

	for (const [filePath, code] of fixtures) {
		const results = await linter.lintText(code, { filePath });
		for (const result of results) assertNoConfigFailure(result, filePath);
	}
});

test("Vue 2 and Vue 3 use distinct upstream presets and Vue 3 API rules", async () => {
	const vue2Linter = createLinter(vue2Config);
	const vue3Linter = createLinter(vue3Config);
	const vue2Calculated = await vue2Linter.calculateConfigForFile("fixtures/App.vue");
	const vue3Calculated = await vue3Linter.calculateConfigForFile("fixtures/App.vue");

	assert.ok([0, "off"].includes(vue2Calculated.rules["vue/require-explicit-emits"]?.[0]));
	assert.equal(vue3Calculated.rules["vue/require-explicit-emits"][0], "error");

	const source =
		'<script setup lang="ts">\nconst html = "<strong>trusted</strong>";\n</script>\n\n<template>\n\t<div v-html="html" />\n</template>\n';
	const [result] = await vue3Linter.lintText(source, { filePath: "fixtures/Unsafe.vue" });
	assertNoConfigFailure(result, "fixtures/Unsafe.vue");
	assert.ok(result.messages.some((message) => message.ruleId === "vue/no-v-html"));
});

test("React preset checks Hooks, DOM safety, JSX accessibility, and TypeScript props", async () => {
	const linter = createLinter(reactConfig);
	const source = `import { useState } from "react";

export const Counter = ({ enabled }: { enabled: boolean }) => {
	if (enabled) useState(0);
	return <><img src="logo.png" /><button>Save</button></>;
};
`;
	const [result] = await linter.lintText(source, { filePath: "fixtures/Counter.tsx" });

	assertNoConfigFailure(result, "fixtures/Counter.tsx");
	assert.ok(result.messages.some((message) => message.ruleId === "react-hooks/rules-of-hooks"));
	assert.ok(result.messages.some((message) => message.ruleId === "jsx-a11y/alt-text"));
	assert.ok(result.messages.some((message) => message.ruleId === "react/button-has-type"));
	assert.ok(!result.messages.some((message) => message.ruleId === "react/prop-types"));
});

test("Angular preset checks TypeScript, external templates, and inline templates", async () => {
	const linter = createLinter(angularConfig);
	const source = `import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	standalone: true,
	template: '<img src="logo.png">',
})
export class AppComponent {}
`;
	const [inlineResult] = await linter.lintText(source, { filePath: "fixtures/app.component.ts" });
	const [templateResult] = await linter.lintText('<img src="logo.png">\n', { filePath: "fixtures/app.component.html" });

	assertNoConfigFailure(inlineResult, "fixtures/app.component.ts");
	assertNoConfigFailure(templateResult, "fixtures/app.component.html");
	assert.ok(inlineResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
	assert.ok(templateResult.messages.some((message) => message.ruleId === "@angular-eslint/template/alt-text"));
	assert.ok(inlineResult.messages.some((message) => message.ruleId === "@angular-eslint/prefer-on-push-component-change-detection"));
});

test("Node is a direct complete preset without a dedicated Node rule plugin", async () => {
	const nodeLinter = createLinter(nodeConfig);
	const nodeCalculated = await nodeLinter.calculateConfigForFile("fixtures/server.js");
	const [nodeResult] = await nodeLinter.lintText("console.log(process.version);\n", { filePath: "fixtures/server.js" });
	assert.equal(nodeCalculated.rules["n/hashbang"], undefined);
	assert.ok(!nodeResult.messages.some((message) => message.ruleId === "no-undef"));

	const browserLinter = createLinter(javaScriptConfig);
	const [testResult] = await browserLinter.lintText('describe("suite", () => { expect(true); });\n', {
		filePath: "fixtures/example.test.js",
	});
	assert.ok(testResult.messages.some((message) => message.ruleId === "no-undef" && message.message.includes("describe")));
	assert.doesNotMatch(JSON.stringify(nodeConfig), /plugin:n|react-refresh/);
});

test("browser source and Node.js tooling receive different globals", async () => {
	const linter = createLinter(javaScriptConfig);
	const [browserResult] = await linter.lintText("process.cwd();\n", { filePath: "src/browser.js" });
	const [viteResult] = await linter.lintText("console.log(process.cwd());\n", { filePath: "vite.config.js" });

	assert.ok(browserResult.messages.some((message) => message.ruleId === "no-undef"));
	assert.ok(!viteResult.messages.some((message) => message.ruleId === "no-undef" || message.ruleId === "no-console"));
});

test("Vue TypeScript disables core rules that misread overloads and type namespaces", async () => {
	const linter = createLinter(vue3Config);
	const calculatedConfig = await linter.calculateConfigForFile("fixtures/Overloads.vue");

	assert.ok([0, "off"].includes(calculatedConfig.rules["no-dupe-class-members"][0]));
	assert.ok([0, "off"].includes(calculatedConfig.rules["no-undef"][0]));

	const [result] = await linter.lintText(
		'<script lang="ts">\nclass Service {\n\tget(value: string): string;\n\tget(value: number): number;\n\tget(value: string | number) { return value; }\n}\n\nexport default { setup: () => ({ Service }) };\n</script>\n',
		{ filePath: "fixtures/Overloads.vue" }
	);
	assert.ok(!result.messages.some((message) => message.ruleId === "no-dupe-class-members"));
});

test("opt-in package fixes preserve semantic exports condition order", async () => {
	const linter = createLinter(
		{
			extends: ["@fast-china/eslint-config-legacy/base", "@fast-china/eslint-config-legacy/sort-package"],
		},
		{ fix: true }
	);
	const source = `{
	"name": "fixture",
	"version": "1.0.0",
	"exports": {
		".": {
			"node": "./node.js",
			"import": "./index.js",
			"default": "./index.js"
		}
	}
}
`;
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
});

test("type-aware configuration parses files through the nearest tsconfig", async () => {
	const typeScriptLinter = createLinter({
		extends: ["@fast-china/eslint-config-legacy/typescript", "@fast-china/eslint-config-legacy/type-aware"],
	});
	const [typeScriptResult] = await typeScriptLinter.lintFiles(["src/core/index.ts"]);

	assert.equal(typeScriptResult.fatalErrorCount, 0, typeScriptResult.messages.map((message) => message.message).join(", "));
	assert.ok(!typeScriptResult.messages.some((message) => message.message.includes("parserOptions.project")));

	const vueLinter = createLinter({
		extends: ["@fast-china/eslint-config-legacy/vue3", "@fast-china/eslint-config-legacy/type-aware"],
	});
	const vueFile = "tests/fixtures/type-aware.vue";
	const vueCalculated = await vueLinter.calculateConfigForFile(vueFile);
	const [vueResult] = await vueLinter.lintFiles([vueFile]);

	assert.equal(vueCalculated.parserOptions.projectService, true);
	assertNoConfigFailure(vueResult, vueFile);
});

test("every local rule override has a rationale comment and valid fixability tag", () => {
	const plugins = {
		"@angular-eslint": require("@angular-eslint/eslint-plugin"),
		"@angular-eslint/template": require("@angular-eslint/eslint-plugin-template"),
		"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
		"import-x": require("eslint-plugin-import-x"),
		jsonc: require("eslint-plugin-jsonc"),
		"jsx-a11y": require("eslint-plugin-jsx-a11y"),
		promise: require("eslint-plugin-promise"),
		react: require("eslint-plugin-react"),
		"react-hooks": require("eslint-plugin-react-hooks"),
		regexp: require("eslint-plugin-regexp"),
		vue: require("eslint-plugin-vue"),
		yml: require("eslint-plugin-yml"),
	};

	for (const { fileName, source } of readRuleSources()) {
		const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
		const visit = (node) => {
			if (ts.isVariableDeclaration(node) && node.initializer && ts.isSatisfiesExpression(node.initializer)) {
				const { expression, type } = node.initializer;

				if (type.getText(sourceFile) === "RuleOptions" && ts.isObjectLiteralExpression(expression)) {
					for (const property of expression.properties) {
						if (!ts.isPropertyAssignment(property)) continue;

						const leadingTrivia = source.slice(property.getFullStart(), property.getStart(sourceFile));
						const ruleName = property.name.getText(sourceFile).replace(/^["']|["']$/g, "");
						assert.match(
							leadingTrivia,
							/\/\/[^\r\n]+|\/\*[\s\S]*?\*\//,
							`${fileName}:${sourceFile.getLineAndCharacterOfPosition(property.getStart(sourceFile)).line + 1} needs a rationale comment`
						);

						if (leadingTrivia.includes("[可自动修复]")) {
							const prefixes = Object.keys(plugins).sort((left, right) => right.length - left.length);
							const prefix = prefixes.find((candidate) => ruleName.startsWith(`${candidate}/`));
							const rule = prefix ? plugins[prefix]?.rules?.[ruleName.slice(prefix.length + 1)] : builtinRules.get(ruleName);
							assert.ok(rule?.meta?.fixable, `${ruleName} is tagged fixable but plugin metadata disagrees`);
						}
					}
				}
			}

			ts.forEachChild(node, visit);
		};

		visit(sourceFile);
	}
});

test("risk guide documents every high-impact local default", () => {
	const riskGuide = fs.readFileSync(path.resolve(__dirname, "../docs/rules-risk.zh.md"), "utf8");
	const highImpactRules = new Set();

	for (const { source } of readRuleSources()) {
		for (const match of source.matchAll(/\/\/([^\r\n]*\[高影响\][^\r\n]*)\r?\n\s*"([^"]+)"/g)) {
			const [, comment, rule] = match;
			if (!comment.includes("[按需启用]") && !comment.includes("[默认关闭]")) highImpactRules.add(rule);
		}
	}

	assert.ok(highImpactRules.size > 0);
	for (const rule of highImpactRules) {
		assert.ok(riskGuide.includes(`\`${rule}\``), `${rule} is missing from the risk guide`);
	}
});

test("published entry points and declarations exist", () => {
	const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
	const configEntries = Object.keys(manifest.exports).filter((name) => !["./package.json", "./rules"].includes(name));
	assert.ok(manifest.files.includes("src"), "published declaration maps require the original TypeScript sources");
	assert.equal(manifest.exports["."], undefined, "Legacy presets must not expose an ambiguous package root");
	assert.equal(manifest.main, undefined);
	assert.equal(manifest.types, undefined);
	assert.equal(fs.existsSync(path.resolve(__dirname, "../dist/index.js")), false, "obsolete SDK runtime must not leak into the package");
	assert.equal(fs.existsSync(path.resolve(__dirname, "../dist/index.d.ts")), false, "obsolete SDK declarations must not leak into the package");
	assert.equal(fs.existsSync(path.resolve(__dirname, "../dist/factory.js")), false, "obsolete factory entry must not leak into the package");
	assert.equal(fs.existsSync(path.resolve(__dirname, "../dist/core/factory.js")), false, "obsolete core path must not leak into the package");

	for (const [name, entry] of Object.entries(manifest.exports)) {
		if (typeof entry === "string") continue;
		const runtimePath = path.resolve(__dirname, `../${entry.require}`);
		const typesPath = path.resolve(__dirname, `../${entry.types}`);

		assert.equal(fs.existsSync(runtimePath), true, `${name} runtime is missing`);
		assert.equal(fs.existsSync(typesPath), true, `${name} declarations are missing`);

		const declarations = fs.readFileSync(typesPath, "utf8");
		const declarationMap = declarations.match(/sourceMappingURL=(.+)$/m)?.[1];

		if (declarationMap) {
			const declarationMapPath = path.resolve(path.dirname(typesPath), declarationMap);
			assert.equal(fs.existsSync(declarationMapPath), true, `${name} declaration source map is missing`);

			const map = JSON.parse(fs.readFileSync(declarationMapPath, "utf8"));
			for (const source of map.sources) {
				assert.equal(
					fs.existsSync(path.resolve(path.dirname(declarationMapPath), source)),
					true,
					`${name} declaration source ${source} is missing`
				);
			}
		}
	}

	for (const name of configEntries) {
		const runtime = fs.readFileSync(path.resolve(__dirname, `../${manifest.exports[name].require}`), "utf8");
		const declarations = fs.readFileSync(path.resolve(__dirname, `../${manifest.exports[name].types}`), "utf8");
		const sourceMapDirectives = runtime.match(/sourceMappingURL=/g) ?? [];

		assert.match(runtime, /module\.exports = config;/, `${name} must expose the config object directly to require()`);
		assert.match(runtime, /require\("\.\/core\/index"\)/, `${name} must reuse core/index`);
		assert.doesNotMatch(runtime, /exports\.default/, `${name} must not require consumers to unwrap a default export`);
		assert.equal(sourceMapDirectives.length, 1, `${name} must contain exactly one source-map directive`);
		assert.match(declarations, /export = config/);
	}

	const rulesRuntime = fs.readFileSync(path.resolve(__dirname, `../${manifest.exports["./rules"].require}`), "utf8");
	const rulesDeclarations = fs.readFileSync(path.resolve(__dirname, `../${manifest.exports["./rules"].types}`), "utf8");
	assert.match(rulesRuntime, /defineRules/);
	assert.match(rulesDeclarations, /RuleOptions/);

	const ambiguousArtifacts = ["angular2", "base2", "javascript2", "react2", "typescript2", "vue22", "vue32"].flatMap((name) => [
		`${name}.js`,
		`${name}.js.map`,
		`${name}.d.ts`,
		`${name}.d.ts.map`,
	]);
	for (const artifact of ambiguousArtifacts) {
		assert.equal(fs.existsSync(path.resolve(__dirname, `../dist/${artifact}`)), false, `${artifact} must not leak into the package`);
	}
});
