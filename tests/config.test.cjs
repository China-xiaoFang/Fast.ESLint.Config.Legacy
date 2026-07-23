const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const fastConfig = require("@fast-china/eslint-config-legacy");
const { PresetJavaScriptConfig, PresetTypeScriptConfig, createConfig, defaultOptions } = require("@fast-china/eslint-config-legacy/factory");
const { defineRules } = require("@fast-china/eslint-config-legacy/rules");
const { ESLint } = require("eslint");
const { builtinRules } = require("eslint/use-at-your-own-risk");
const ts = require("typescript");

const rulesDirectory = path.resolve(__dirname, "../src/rules");
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

test("package root is an ESLint 8 config while helpers live on subpath exports", () => {
	assert.ok(Array.isArray(fastConfig.overrides));
	assert.ok(fastConfig.overrides.length > 0);
	assert.deepEqual(Object.keys(fastConfig).sort(), ["extends", "overrides", "reportUnusedDisableDirectives"]);
	assert.ok(Array.isArray(PresetJavaScriptConfig.overrides));
	assert.ok(Array.isArray(PresetTypeScriptConfig.overrides));
	assert.equal(Object.isFrozen(defaultOptions), true);
	assert.deepEqual(defineRules({ "no-console": "warn" }), { "no-console": "warn" });
});

test("ESLint resolves the package root through an extends name", async () => {
	const linter = createLinter({ extends: ["@fast-china/eslint-config-legacy"] });
	const [result] = await linter.lintText("var answer = 42;\n", { filePath: "fixtures/consumer.js" });

	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.ok(result.messages.some((message) => message.ruleId === "no-var"));
});

test("default config is explicit Vue 3 and does not enable organization-only lodash policy", () => {
	const serialized = JSON.stringify(fastConfig);

	assert.match(serialized, /plugin:vue\/recommended/);
	assert.doesNotMatch(serialized, /vue2-recommended/);
	assert.doesNotMatch(serialized, /lodash-unified/);
	assert.doesNotMatch(serialized, /plugin:prettier\/recommended|prettier\/prettier/);
});

test("factory disables optional integrations and supports Vue 2 plus type-aware parsing", () => {
	const minimalConfig = createConfig({
		imports: false,
		json: false,
		markdown: false,
		prettier: false,
		regexp: false,
		typescript: false,
		vue: false,
	});
	const minimalSerialized = JSON.stringify(minimalConfig);

	assert.doesNotMatch(minimalSerialized, /@typescript-eslint\/recommended/);
	assert.doesNotMatch(minimalSerialized, /plugin:vue/);
	assert.doesNotMatch(minimalSerialized, /plugin:jsonc/);
	assert.doesNotMatch(minimalSerialized, /plugin:markdown/);

	const advancedConfig = createConfig({
		typescript: { typeChecked: true },
		vue: { typeChecked: true, version: 2 },
	});
	const advancedSerialized = JSON.stringify(advancedConfig);

	assert.match(advancedSerialized, /vue2-recommended/);
	assert.match(advancedSerialized, /recommended-type-checked/);
	assert.ok(advancedConfig.overrides.some((override) => override.parserOptions?.project === true));
});

test("representative JavaScript, TypeScript, Vue, JSON dialects, and Markdown have no configuration failures", async () => {
	const linter = createLinter(createConfig());
	const fixtures = [
		{
			filePath: "fixtures/example.js",
			code: "const answer = 42;\n\nexport { answer };\n",
		},
		{
			filePath: "fixtures/example.ts",
			code: 'const message = "hello";\n\nexport { message };\n',
		},
		{
			filePath: "fixtures/App.vue",
			code: '<script setup lang="ts">\nconst message = "hello";\n</script>\n\n<template>\n\t<main>{{ message }}</main>\n</template>\n',
		},
		{
			filePath: "fixtures/example.json",
			code: '{ "enabled": true }\n',
		},
		{
			filePath: "fixtures/example.jsonc",
			code: '{\n\t// JSONC comments are valid.\n\t"enabled": true\n}\n',
		},
		{
			filePath: "fixtures/example.json5",
			code: "{ enabled: true, }\n",
		},
		{
			filePath: "fixtures/example.md",
			code: "# Example\n\n```js\nconsole.log(unknownGlobal);\n```\n",
		},
	];

	for (const fixture of fixtures) {
		const results = await linter.lintText(fixture.code, { filePath: fixture.filePath });

		for (const result of results) {
			assert.equal(result.fatalErrorCount, 0, `${fixture.filePath}: ${result.messages.map((message) => message.message).join(", ")}`);
			assert.ok(
				!result.messages.some((message) => message.message.includes("Definition for rule") || message.message.includes("Failed to load"))
			);
		}
	}
});

test("quality and safety rules are active for JavaScript and Vue", async () => {
	const linter = createLinter(createConfig());
	const [javascriptResult] = await linter.lintText("var answer = 42;\n", { filePath: "fixtures/invalid.js" });
	const [vueResult] = await linter.lintText(
		'<script setup lang="ts">\nconst html = "<strong>trusted</strong>";\n</script>\n\n<template>\n\t<div v-html="html" />\n</template>\n',
		{ filePath: "fixtures/Unsafe.vue" }
	);

	assert.ok(javascriptResult.messages.some((message) => message.ruleId === "no-var"));
	assert.ok(vueResult.messages.some((message) => message.ruleId === "vue/no-v-html"));
});

test("Vue TypeScript disables core rules that misread overloads and type namespaces", async () => {
	const linter = createLinter(createConfig());
	const calculatedConfig = await linter.calculateConfigForFile("fixtures/Overloads.vue");

	assert.ok([0, "off"].includes(calculatedConfig.rules["no-dupe-class-members"][0]));
	assert.ok([0, "off"].includes(calculatedConfig.rules["no-undef"][0]));

	const [result] = await linter.lintText(
		'<script lang="ts">\nclass Service {\n\tget(value: string): string;\n\tget(value: number): number;\n\tget(value: string | number) { return value; }\n}\n\nexport default { setup: () => ({ Service }) };\n</script>\n',
		{ filePath: "fixtures/Overloads.vue" }
	);

	assert.ok(!result.messages.some((message) => message.ruleId === "no-dupe-class-members"));
});

test("browser source and Node.js tooling receive different globals", async () => {
	const linter = createLinter(createConfig({ json: false, markdown: false, typescript: false, vue: false }));
	const [browserResult] = await linter.lintText("process.cwd();\n", { filePath: "src/browser.js" });
	const [viteResult] = await linter.lintText("console.log(process.cwd());\n", { filePath: "vite.config.js" });

	assert.ok(browserResult.messages.some((message) => message.ruleId === "no-undef"));
	assert.ok(!viteResult.messages.some((message) => message.ruleId === "no-undef" || message.ruleId === "no-console"));
});

test("package fixes preserve semantic exports condition order", async () => {
	const linter = createLinter(createConfig(), { fix: true });
	const source = `{
\t"name": "fixture",
\t"version": "1.0.0",
\t"exports": {
\t\t".": {
\t\t\t"node": "./node.js",
\t\t\t"import": "./index.js",
\t\t\t"default": "./index.js"
\t\t}
\t}
}
`;
	const [result] = await linter.lintText(source, { filePath: "fixtures/package.json" });
	const fixed = result.output ?? source;

	assert.ok(fixed.indexOf('"node"') < fixed.indexOf('"import"'));
	assert.ok(fixed.indexOf('"import"') < fixed.indexOf('"default"'));
});

test("type-aware configuration can parse a file from the nearest tsconfig", async () => {
	const linter = createLinter(
		createConfig({
			imports: false,
			json: false,
			markdown: false,
			prettier: false,
			regexp: false,
			typescript: { typeChecked: true },
			vue: false,
		})
	);
	const [result] = await linter.lintFiles(["src/index.ts"]);

	assert.equal(result.fatalErrorCount, 0, result.messages.map((message) => message.message).join(", "));
	assert.ok(!result.messages.some((message) => message.message.includes("parserOptions.project")));
});

test("every local rule override has a nearby rationale comment and valid fixability tag", () => {
	const plugins = {
		"@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
		import: require("eslint-plugin-import"),
		jsonc: require("eslint-plugin-jsonc"),
		regexp: require("eslint-plugin-regexp"),
		vue: require("eslint-plugin-vue"),
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
						const ruleName = property.name.getText(sourceFile).replace(/^['"]|['"]$/g, "");
						assert.match(
							leadingTrivia,
							/\/\/[^\r\n]+|\/\*[\s\S]*?\*\//,
							`${fileName}:${sourceFile.getLineAndCharacterOfPosition(property.getStart(sourceFile)).line + 1} needs a rationale comment`
						);

						if (leadingTrivia.includes("[可自动修复]")) {
							const separator = ruleName.indexOf("/");
							const rule =
								separator === -1
									? builtinRules.get(ruleName)
									: plugins[ruleName.slice(0, separator)]?.rules?.[ruleName.slice(separator + 1)];
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

	for (const entry of [manifest.exports["."], manifest.exports["./factory"], manifest.exports["./rules"]]) {
		assert.equal(fs.existsSync(path.resolve(__dirname, `../${entry.require}`)), true);
		assert.equal(fs.existsSync(path.resolve(__dirname, `../${entry.types}`)), true);
	}

	const rootDeclarations = fs.readFileSync(path.resolve(__dirname, "../dist/index.d.ts"), "utf8");
	assert.match(rootDeclarations, /export = config/);
});
