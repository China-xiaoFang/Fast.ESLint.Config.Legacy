//#region src/rules/react.ts
/**
* React 本地覆写规则。
*
* React、Hooks 与 JSX accessibility 推荐预置负责基础正确性；这里补充与
* `@fast-china/eslint-config` 意图一致、且能由 ESLint 8 插件可靠实现的约束。
* 该记录同时用于 JSX 与 TSX；TypeScript 专属关闭项由 `reactTypeScriptRules` 单独提供。
*
* @public
*/
const reactRules = {
	"react/button-has-type": "error",
	"react/iframe-missing-sandbox": "warn",
	"react/no-unknown-property": "error",
	"react/jsx-no-target-blank": "error",
	"react/self-closing-comp": ["error", {
		component: true,
		html: true
	}],
	"react/jsx-boolean-value": ["error", "never"],
	"react/no-array-index-key": "warn",
	"react/jsx-no-useless-fragment": "warn"
};
/**
* React 自动 JSX runtime 的兼容规则记录。
*
* React 配置创建器默认采用 automatic runtime，因此不要求每个 JSX/TSX 文件显式导入 React。
* 使用 classic runtime 的自定义组合不应应用该记录。
*
* @public
*/
const reactAutomaticRuntimeRules = {
	"react/react-in-jsx-scope": "off",
	"react/jsx-uses-react": "off"
};
/**
* React TypeScript 文件的规则兼容层。
*
* TSX props 已由 TypeScript 描述，因此关闭重复且可能漂移的运行时 PropTypes 检查。
*
* @public
*/
const reactTypeScriptRules = { "react/prop-types": "off" };
//#endregion
exports.reactAutomaticRuntimeRules = reactAutomaticRuntimeRules;
exports.reactRules = reactRules;
exports.reactTypeScriptRules = reactTypeScriptRules;

//# sourceMappingURL=react.js.map