//#region src/presets/type-aware.ts
/**
* 为 TypeScript、TSX、Angular TypeScript 与 Vue script 启用类型感知规则的叠加预置。
*
* 必须放在一个包含 TypeScript 的完整预置之后。它启用 typescript-eslint 的
* `recommended-type-checked`、`stylistic-type-checked` 和 Project Service；被检查文件
* 必须属于可发现的 tsconfig。类型服务会增加启动时间和内存占用，复杂 monorepo 可以
* 在项目自己的 override 中设置 `parserOptions.tsconfigRootDir`。
*
* @example
* ```js
* module.exports = {
*   extends: [
*     "@fast-china/eslint-config-legacy/vue3",
*     "@fast-china/eslint-config-legacy/type-aware",
*   ],
* };
* ```
*
* @public
*/
const config = (0, require("./core/index").createPreset)("type-aware");
//#endregion
module.exports = config;

//# sourceMappingURL=type-aware.js.map