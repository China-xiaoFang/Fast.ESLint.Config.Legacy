import eslintPluginImportX from "eslint-plugin-import-x";
import type { Rule } from "eslint";

const STYLE_IMPORT_PATTERN = /\.(?:acss|css|less|pcss|postcss|sass|scss|sss|styl|stylus|ttss|wxss)(?:[?#].*)?$/i;

const isStyleImport = (source: unknown): source is string => typeof source === "string" && STYLE_IMPORT_PATTERN.test(source);

const importOrderRule = eslintPluginImportX.rules.order;

/**
 * 复用 import-x/order 的全部行为，但把样式导入交给 style-imports-last 独立处理。
 *
 * import-x/order 没有按路径忽略导入的选项。如果让样式继续进入该规则，全局
 * alphabetize 会改变样式的层叠顺序，因此只过滤静态样式 import，其他副作用导入仍受
 * warnOnUnassignedImports 约束。
 */
const importOrderWithoutStylesRule: typeof importOrderRule = {
	...importOrderRule,
	create(context) {
		const listeners = importOrderRule.create(context);
		const checkImport = listeners.ImportDeclaration;

		return {
			...listeners,
			ImportDeclaration(node) {
				if (!isStyleImport(node.source.value)) {
					checkImport?.(node);
				}
			},
		};
	},
};

/** 只要求样式导入形成文件顶部 import 区域的最后一个连续分组，不改变组内顺序。 */
const styleImportsLastRule: Rule.RuleModule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Require stylesheet imports to form the final contiguous import group without sorting them.",
		},
		schema: [],
		messages: {
			styleImportsLast: "Style import `{{source}}` must occur after all non-style imports.",
		},
	},
	create(context) {
		return {
			Program(node) {
				const imports = node.body.filter((statement) => statement.type === "ImportDeclaration");
				let lastNonStyleImportIndex = -1;

				for (const [index, statement] of imports.entries()) {
					if (!isStyleImport(statement.source.value)) {
						lastNonStyleImportIndex = index;
					}
				}

				for (const statement of imports.slice(0, lastNonStyleImportIndex)) {
					if (isStyleImport(statement.source.value)) {
						context.report({
							node: statement,
							messageId: "styleImportsLast",
							data: { source: statement.source.value },
						});
					}
				}
			},
		};
	},
};

let registered = false;

/**
 * 为 ESLint 8 Legacy 插件实例注册样式导入适配。
 *
 * `.eslintrc` 不能内联插件对象，因此在解析 `plugin:import-x/recommended` 前扩展 Node.js
 * 模块缓存中的同一插件实例。重复调用保持幂等。
 */
export const registerStyleAwareImportRules = (): void => {
	if (registered) return;

	eslintPluginImportX.rules.order = importOrderWithoutStylesRule;
	eslintPluginImportX.rules["style-imports-last"] = styleImportsLastRule;
	registered = true;
};
