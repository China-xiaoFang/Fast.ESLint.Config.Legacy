import type { Linter } from "eslint";

/**
 * 最终 ESLint 8 Legacy Config 对象的内部组合选项。
 *
 * @internal
 */
export interface LegacyConfigOptions {
	/**
	 * 根级 Legacy extends，例如必须在根配置注册的 Markdown processor。
	 * @default []
	 */
	extends?: readonly string[];
	/** 由预置或宿主平台提供的额外全局变量；未提供时省略字段。 */
	globals?: NonNullable<Linter.Config["globals"]>;
	/**
	 * 需要写入根配置的忽略模式。
	 * @default []
	 */
	ignorePatterns?: readonly string[];
	/**
	 * 已按优先级排列的配置覆盖；后面的 override 可以覆盖前面的规则。
	 * @default []
	 */
	overrides?: readonly Linter.ConfigOverride[];
}

/**
 * 创建最终可由 ESLint 8 同步加载的 `.eslintrc` 配置对象。
 *
 * 输入数组都会复制，避免调用方在创建完成后通过修改原数组改变预置。空的可选字段不会
 * 出现在结果中；`reportUnusedDisableDirectives` 始终启用以发现失效的 eslint-disable 注释。
 *
 * @param options - 根级 extends、globals、忽略项与按优先级排列的 overrides。
 * @returns 新建且不共享输入数组的 `Linter.Config`。
 * @internal
 */
export const createLegacyConfig = ({
	extends: configExtends = [],
	globals,
	ignorePatterns = [],
	overrides = [],
}: LegacyConfigOptions = {}): Linter.Config => ({
	...(configExtends.length > 0 ? { extends: [...configExtends] } : {}),
	...(globals ? { globals } : {}),
	...(ignorePatterns.length > 0 ? { ignorePatterns: [...ignorePatterns] } : {}),
	reportUnusedDisableDirectives: true,
	overrides: [...overrides],
});
