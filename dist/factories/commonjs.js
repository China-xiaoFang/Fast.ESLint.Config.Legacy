const require_constants_index = require("../constants/index.js");
//#region src/factories/commonjs.ts
/**
* 创建 CommonJS 扩展名兼容 override。
*
* `.cjs` 与 `.cts` 已明确表达模块格式，因此关闭禁止 `require()` 的 TypeScript 规则；
* 该 override 不改变 parser、env 或其他模块规则。
*
* @returns `.cjs` 与 `.cts` 文件共用的单个规则 override。
* @internal
*/
const createCommonJsConfigs = () => [{
	files: [...require_constants_index.GLOBS_COMMONJS],
	rules: { "@typescript-eslint/no-require-imports": "off" }
}];
//#endregion
exports.createCommonJsConfigs = createCommonJsConfigs;

//# sourceMappingURL=commonjs.js.map