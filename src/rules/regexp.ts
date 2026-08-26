import type { RuleOptions } from "../typegen";

/**
 * 正则表达式正确性与安全规则。
 *
 * 不直接继承 regexp 插件的完整推荐预置，避免把字符类简写、量词写法和标志排序等
 * 纯偏好作为阻断错误。这里显式维护无效结构、潜在错误和灾难性回溯检查。
 *
 * @public
 */
export const regexpRules = {
	// 控制字符通常来自复制或编码错误，要求使用可识别的转义写法。
	"no-control-regex": "error",
	// Unicode 组合字符可能让字符类匹配结果与视觉含义不一致。
	"no-misleading-character-class": "error",
	// 正则中的连续普通空格容易漏看，使用量词或明确转义更清晰。
	"no-regex-spaces": "error",

	// 相邻量词的作用范围容易被误读，保留警告供人工复核。
	"regexp/confusing-quantifier": "warn",
	// 断言与其内部条件矛盾时表达式永远无法按预期匹配。
	"regexp/no-contradiction-with-assertion": "error",
	// 字符类中的重复字符通常表示拼写或范围设计错误。
	"regexp/no-dupe-characters-character-class": "error",
	// 重复或被完全覆盖的分支通常表示条件遗漏。
	"regexp/no-dupe-disjunctions": "error",
	// 空分支可能是有意匹配空字符串，也可能是遗漏，因此只警告。
	"regexp/no-empty-alternative": "warn",
	// 空捕获组不会捕获有效内容，通常属于表达式残留。
	"regexp/no-empty-capturing-group": "error",
	// 空字符类永远无法匹配字符。
	"regexp/no-empty-character-class": "error",
	// 空分组通常表示编辑遗漏。
	"regexp/no-empty-group": "error",
	// 空前后查找不会表达有效约束。
	"regexp/no-empty-lookarounds-assertion": "error",
	// 多余嵌套断言可能改变捕获或回溯边界，应视为结构错误。
	"regexp/no-extra-lookaround-assertions": "error",
	// 检查 RegExp 构造器字符串和字面量中的无效语法及标志。
	"regexp/no-invalid-regexp": "error",
	// 不可见字符容易造成审查遗漏和匹配异常。
	"regexp/no-invisible-character": "error",
	// 捕获组边界具有误导性时，反向引用和替换结果可能不符合预期。
	"regexp/no-misleading-capturing-group": "error",
	// Unicode 字符的视觉形式与代码点不一致时容易产生错误匹配。
	"regexp/no-misleading-unicode-character": "error",
	// replaceAll 等全局操作缺少 g 标志时会在运行时失败或行为不一致。
	"regexp/no-missing-g-flag": "error",
	// 禁止 JavaScript 不支持的非标准正则标志。
	"regexp/no-non-standard-flag": "error",
	// 可选断言几乎总能通过，通常无法表达预期约束。
	"regexp/no-optional-assertion": "error",
	// 阻止可被构造输入触发的超线性回溯，降低拒绝服务风险。
	"regexp/no-super-linear-backtracking": "error",
	// 无效反向引用无法引用预期捕获内容。
	"regexp/no-useless-backreference": "error",
	// 替换字符串引用不存在的捕获组时不会得到预期结果。
	"regexp/no-useless-dollar-replacements": "error",
	// 零次量词会让对应模式永远不参与匹配，通常是边界笔误。
	"regexp/no-zero-quantifier": "error",
	// 使用严格模式检查容易产生歧义或跨引擎差异的正则结构。
	"regexp/strict": "error",
} satisfies RuleOptions;
