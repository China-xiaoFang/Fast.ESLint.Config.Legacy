import { Linter } from "eslint";
//#region src/factories/typescript.d.ts
interface TypeScriptConfigOverride extends Linter.ConfigOverride {
  extends: string[];
  rules: Linter.RulesRecord;
}
/**
 * TypeScript parser 与 Project Service 的内部配置选项。
 *
 * @internal
 */
interface TypeAwareOptions {
  /**
   * 启用 typescript-eslint 类型感知预置与 Project Service。
   * @default false
   */
  typeChecked?: boolean;
  /** Project Service 查找 tsconfig 的根目录；未提供时由 typescript-eslint 推断。 */
  tsconfigRootDir?: string;
}
/**
 * 普通 TypeScript 文件的内部配置选项。
 *
 * @internal
 */
interface TypeScriptConfigOptions extends TypeAwareOptions {
  /**
   * TypeScript/TSX 文件范围。
   * @default 所有 TypeScript 方言
   */
  files?: string[];
}
/**
 * 创建 TypeScript 与 Vue TypeScript 共用的 parserOptions。
 *
 * 非类型感知模式只声明现代 ECMAScript module 语义；类型感知模式另外启动 Project
 * Service，并只在调用方明确提供时写入 `tsconfigRootDir`。
 *
 * @param options - 类型感知开关及可选 tsconfig 根目录。
 * @returns 可用于 `@typescript-eslint/parser` 或 Vue 子 parser 的新 parserOptions 对象。
 * @internal
 */
declare const createTypeScriptParserOptions: (options?: TypeAwareOptions) => Linter.ParserOptions;
/**
 * 返回与类型感知模式对应的 typescript-eslint Legacy 推荐预置链。
 *
 * @param options - 类型感知开关。
 * @returns recommended 与 stylistic 的有序 Legacy extends 名称。
 * @internal
 */
declare const createTypeScriptExtends: (options?: TypeAwareOptions) => string[];
/**
 * 创建 TypeScript 配置。
 *
 * 本地 JavaScript 规则继续覆盖 TS 文件，再由 typescript-eslint 替代规则关闭不理解类型语法的核心实现。
 *
 * @param options - TypeScript 文件范围与类型感知 parser 选项。
 * @param files - 可覆盖 `options.files` 的显式文件范围，供框架配置复用。
 * @returns 包含 parser、extends、parserOptions 与完整本地规则记录的单个 override。
 * @internal
 */
declare const createTypeScriptConfig: (options?: TypeScriptConfigOptions, files?: readonly string[]) => TypeScriptConfigOverride;
/**
 * 将 {@link createTypeScriptConfig} 包装为组合器使用的 override 数组。
 *
 * @param options - TypeScript 文件范围与 parser 选项。
 * @returns 始终包含一个 TypeScript override 的数组。
 * @internal
 */
declare const createTypeScriptConfigs: (options?: TypeScriptConfigOptions) => Linter.ConfigOverride[];
/**
 * 创建 TypeScript 声明文件兼容 override。
 *
 * 声明文件允许未使用的公共符号和仅用于全局扩展的类型导入，因此关闭普通源码中用于
 * 清理实现细节的 unused 与 type-import 规则。该 override 应位于普通 TypeScript 配置之后。
 *
 * @returns 匹配 `.d.ts`、`.d.cts` 与 `.d.mts` 的单个 override。
 * @internal
 */
declare const createTypeScriptDeclarationConfigs: () => Linter.ConfigOverride[];
/**
 * 创建可叠加在任意 TypeScript、React、Angular 或 Vue 配置之后的类型感知片段。
 *
 * Project Service 会从被检查文件向上寻找最近的 tsconfig；复杂 monorepo 可以在自己的
 * `.eslintrc` override 中补充 `parserOptions.tsconfigRootDir`。
 * TypeScript/TSX 与 Vue SFC 使用独立 parser 链，避免 Vue 模板被 TypeScript parser 误读。
 *
 * @returns 依次覆盖 TypeScript 方言与 Vue SFC 的两个类型感知 overrides。
 * @internal
 */
declare const createTypeAwareConfigs: () => Linter.ConfigOverride[];
//#endregion
export { TypeAwareOptions, TypeScriptConfigOptions, createTypeAwareConfigs, createTypeScriptConfig, createTypeScriptConfigs, createTypeScriptDeclarationConfigs, createTypeScriptExtends, createTypeScriptParserOptions };
//# sourceMappingURL=typescript.d.ts.map