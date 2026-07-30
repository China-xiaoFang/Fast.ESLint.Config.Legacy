/**
 * 静态 Legacy 预置的内部组合器。
 *
 * 该模块由 `src/presets` 构建入口共享，但不属于 package exports。公开配置边界由
 * `package.json#exports` 中的明确子路径定义，消费项目不应直接依赖本模块。
 *
 * @packageDocumentation
 */
import { createAngularConfigs } from "../configs/angular";
import { createBaseConfigs } from "../configs/common";
import { createCommonJsConfigs } from "../configs/commonjs";
import { createEnvironmentConfigs, createNodeToolingConfigs } from "../configs/environment";
import { createImportConfigs } from "../configs/import";
import { createJavaScriptConfigs } from "../configs/javascript";
import { createJsonConfigs } from "../configs/json";
import { createLodashConfigs } from "../configs/lodash";
import { createMarkdownConfigs } from "../configs/markdown";
import { createPrettierConfigs } from "../configs/prettier";
import { createPromiseConfigs } from "../configs/promise";
import { createReactConfigs } from "../configs/react";
import { createRegexpConfigs } from "../configs/regexp";
import { createLegacyConfig } from "../configs/root";
import { createPackageJsonSortConfigs } from "../configs/sort-package";
import { createTsconfigSortConfigs } from "../configs/sort-tsconfig";
import { createTypeAwareConfigs, createTypeScriptConfigs, createTypeScriptDeclarationConfigs } from "../configs/typescript";
import { createVueConfigs } from "../configs/vue";
import { createYamlConfigs } from "../configs/yaml";
import { GLOBS_CODE, GLOBS_JAVASCRIPT, GLOBS_TYPESCRIPT, GLOB_ANGULAR_TYPESCRIPT, GLOB_VUE } from "../constants";

import type { RuntimeEnvironment } from "../configs/environment";
import type { Linter } from "eslint";

type CompletePresetName = "angular" | "base" | "javascript" | "node" | "react" | "typescript" | "vue2" | "vue3";

/**
 * 内部组合器支持的完整预置与叠加预置名称。
 *
 * 名称必须与 `src/presets` 和 `package.json#exports` 保持一一对应。
 *
 * @internal
 */
export type PresetName = CompletePresetName | "lodash" | "lodash-unified" | "sort-package" | "sort-tsconfig" | "type-aware";

/** 一个完整静态预置的语言、框架、数据文件与运行环境边界。 */
interface CompletePresetDefinition {
	/** 是否启用 Angular TypeScript 与模板配置。 */
	angular: boolean;
	/** 是否启用 JSON 方言、YAML 与 Markdown。 */
	dataFiles: boolean;
	/** 应用源码运行环境；工程文件始终由专用 Node override 处理。 */
	environment: RuntimeEnvironment;
	/** 是否接管 JavaScript、CommonJS、ESM 与 JSX。 */
	javascript: boolean;
	/** 是否启用 React、Hooks 与 JSX accessibility。 */
	react: boolean;
	/** 是否接管 TypeScript 方言并启用非类型感知规则。 */
	typescript: boolean;
	/** 是否启用 Vue，以及需要使用的 Vue 主版本。 */
	vue: false | 2 | 3;
}

/**
 * 每个完整预置都是确定的静态契约。
 *
 * Legacy Config 通过 `extends` 组合，不需要把可变工厂暴露为公共 API；这里的定义只负责
 * 消除各入口之间的重复，并保证配置顺序始终一致。
 */
const completePresetDefinitions = {
	angular: {
		angular: true,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false,
	},
	base: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false,
	},
	javascript: {
		angular: false,
		dataFiles: false,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: false,
		vue: false,
	},
	node: {
		angular: false,
		dataFiles: true,
		environment: "node",
		javascript: true,
		react: false,
		typescript: true,
		vue: false,
	},
	react: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: true,
		typescript: true,
		vue: false,
	},
	typescript: {
		angular: false,
		dataFiles: false,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: false,
	},
	vue2: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: 2,
	},
	vue3: {
		angular: false,
		dataFiles: true,
		environment: "browser",
		javascript: true,
		react: false,
		typescript: true,
		vue: 3,
	},
} as const satisfies Record<CompletePresetName, CompletePresetDefinition>;

/**
 * 根据静态定义创建一个可独立写入 `.eslintrc#extends` 的完整预置。
 *
 * 配置顺序是公共契约的一部分：环境与基础正确性在前，语言和框架规则居中，声明文件、
 * CommonJS、Node 工程文件和 Markdown 虚拟文件兼容层随后应用，Prettier 兼容层最后应用。
 * 文件 glob 会去重，防止 Angular 与通用 TypeScript 范围重复产生基础 override。
 *
 * @param definition - 一个经过静态表校验的完整预置定义。
 * @returns 可由 ESLint 8 同步加载的完整 Legacy Config 对象。
 */
const createCompletePreset = ({ angular, dataFiles, environment, javascript, react, typescript, vue }: CompletePresetDefinition): Linter.Config => {
	const projectFiles = [
		...(javascript ? GLOBS_JAVASCRIPT : []),
		...(typescript ? GLOBS_TYPESCRIPT : []),
		...(vue ? [GLOB_VUE] : []),
		...(angular ? [GLOB_ANGULAR_TYPESCRIPT] : []),
	].filter((file, index, files) => files.indexOf(file) === index);
	const markdownConfigs = dataFiles ? createMarkdownConfigs() : undefined;

	return createLegacyConfig({
		extends: markdownConfigs?.extends,
		overrides: [
			...createEnvironmentConfigs({ environment, files: projectFiles }),
			...createBaseConfigs(projectFiles),
			...(javascript ? createJavaScriptConfigs() : []),
			...(typescript ? createTypeScriptConfigs() : []),
			...(vue ? createVueConfigs({ version: vue }) : []),
			...(react ? createReactConfigs() : []),
			...(angular ? createAngularConfigs() : []),
			...createImportConfigs(projectFiles),
			...createPromiseConfigs(projectFiles),
			...createRegexpConfigs(projectFiles),
			...(dataFiles ? createJsonConfigs() : []),
			...(dataFiles ? createYamlConfigs() : []),
			...(typescript ? createTypeScriptDeclarationConfigs() : []),
			...createCommonJsConfigs(),
			...createNodeToolingConfigs(),
			...(markdownConfigs?.overrides ?? []),
			...createPrettierConfigs(projectFiles),
		],
	});
};

/**
 * 创建公开的静态 Legacy 预置。
 *
 * 完整预置可以单独继承；`type-aware`、排序和 Lodash 预置必须放在完整预置之后叠加。
 * 该函数只供 `src/presets` 构建入口调用，不从 package exports 暴露。
 * 每次调用都会创建新的配置对象和 override 数组，公开入口之间不会共享可变配置状态。
 *
 * @param name - 与公开子路径对应的预置名称。
 * @returns 完整预置或只包含目标能力的叠加预置。
 * @throws {TypeError} 当内部调用方传入未注册的预置名称时抛出。
 * @internal
 */
export const createPreset = (name: PresetName): Linter.Config => {
	if (name in completePresetDefinitions) {
		return createCompletePreset(completePresetDefinitions[name as CompletePresetName]);
	}

	switch (name) {
		case "lodash":
		case "lodash-unified":
			return createLegacyConfig({ overrides: createLodashConfigs(name, GLOBS_CODE) });
		case "sort-package":
			return createLegacyConfig({ overrides: createPackageJsonSortConfigs() });
		case "sort-tsconfig":
			return createLegacyConfig({ overrides: createTsconfigSortConfigs() });
		case "type-aware":
			return createLegacyConfig({ overrides: createTypeAwareConfigs() });
	}

	throw new TypeError(`Unknown Legacy preset: ${name}`);
};
