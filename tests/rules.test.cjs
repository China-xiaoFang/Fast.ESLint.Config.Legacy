const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { builtinRules } = require("eslint/use-at-your-own-risk");

const rulesDirectory = path.resolve(__dirname, "../src/rules");

const loadKnownRules = () => {
	const knownRules = new Map(builtinRules);
	for (const plugin of [
		"@angular-eslint/eslint-plugin",
		"@angular-eslint/eslint-plugin-template",
		"@typescript-eslint/eslint-plugin",
		"eslint-plugin-import-x",
		"eslint-plugin-jsonc",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-promise",
		"eslint-plugin-react",
		"eslint-plugin-react-hooks",
		"eslint-plugin-regexp",
		"eslint-plugin-vue",
		"eslint-plugin-yml",
	]) {
		const loaded = require(plugin);
		const prefix = plugin.includes("angular-eslint/eslint-plugin-template")
			? "@angular-eslint/template"
			: plugin
					.replace(/^eslint-plugin-/, "")
					.replace("@angular-eslint/eslint-plugin", "@angular-eslint")
					.replace("@typescript-eslint/eslint-plugin", "@typescript-eslint");
		for (const [name, rule] of Object.entries(loaded.rules ?? {})) knownRules.set(`${prefix}/${name}`, rule);
	}
	return knownRules;
};

test("every local rule override has a rationale and a valid fixability label", () => {
	const knownRules = loadKnownRules();
	for (const fileName of fs.readdirSync(rulesDirectory).filter((name) => name.endsWith(".ts") && name !== "index.ts")) {
		const source = fs.readFileSync(path.join(rulesDirectory, fileName), "utf8");
		assert.match(source, /\/\*\*/, `${fileName} must document its rules`);
		for (const match of source.matchAll(/\/\*\*([\s\S]*?)\*\/\s*["']([^"']+)["']\s*:/g)) {
			const [, comment, ruleName] = match;
			assert.ok(comment.trim().length > 12, `${fileName}:${ruleName} needs a rationale`);
			if (comment.includes("[可自动修复]")) assert.ok(knownRules.get(ruleName)?.meta?.fixable, `${ruleName} is not fixable`);
		}
	}
});
