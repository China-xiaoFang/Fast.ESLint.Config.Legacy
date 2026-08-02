//#region src/configs/prettier/factory.ts
/**
* 创建 Prettier 兼容层。
*
* 它只关闭冲突规则，不在 ESLint 中执行 Prettier；项目规则仍在它之后生效。
*
* @param files - 需要关闭格式冲突规则的代码文件 glob。
* @returns 单个 `prettier` extends override；文件集合为空时返回空数组。
* @internal
*/
const createPrettierConfigs = (files) => files.length > 0 ? [{
	files: [...files],
	extends: ["prettier"]
}] : [];
//#endregion
exports.createPrettierConfigs = createPrettierConfigs;

//# sourceMappingURL=factory.js.map