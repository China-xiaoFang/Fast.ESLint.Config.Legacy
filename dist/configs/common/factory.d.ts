import { Linter } from "eslint";
//#region src/configs/common/factory.d.ts
/**
 * 创建跨 JavaScript、TypeScript、Vue、React 与 Angular 源码生效的基础配置。
 *
 * `eslint:recommended` 提供语言级正确性检查，本仓库只在其后补充经过说明的公共规则。
 *
 * @param files - 应用基础正确性规则的 glob 集合。
 * @returns 单个限定文件范围的 override；文件集合为空时返回空数组。
 * @internal
 */
declare const createCommonConfigs: (files?: readonly string[]) => Linter.ConfigOverride[];
//#endregion
export { createCommonConfigs };
//# sourceMappingURL=factory.d.ts.map