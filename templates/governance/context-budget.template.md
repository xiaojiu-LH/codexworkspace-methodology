# CodexWorkspace Context Budget

最后更新时间：YYYY-MM-DD

本文件定义 CodexWorkspace 的上下文读取预算。目标是让 Codex 先用最小文件集合开始工作，再按任务信号逐步读取细则，避免为了保险一次性加载所有治理文档。

## 预算层级

| 层级 | 适用场景 | 默认读取 | 允许追加 | 默认不读 |
|---|---|---|---|---|
| 默认启动层 | 任何任务开始 | `AGENTS.md`、`codexworkspace-console.md` | 无 | routing、issue log、automation、skills、reviews、evidence |
| 中等任务 | 普通代码/文档修改、单项目配置、单一外部流程预检 | `AGENTS.md`、`codexworkspace-console.md`、项目相关文件、`governance\routing.md` 对应行 | 最多 1 个相关 playbook 或台账 | 无关项目、完整 issue log 归档、完整 ledger JSON、无关 scenario |
| 复杂治理任务 | 规则变更、自动化变更、skill 变更、复盘整理、GitHub 发布、多副本同步 | routing、相关台账、相关 playbook、必要治理包 | 只读取完成任务必需的 review/actions；evidence 按证据需求读取 | 全量 evidence、旧归档原文、无关源码、无关自动化详情 |

## 升级读取规则

- 从默认启动层升级到中等任务时，必须能说清命中的任务信号和要读的项目文件。
- 从中等任务升级到复杂治理任务时，必须能说清要读的治理文件类型、用途和收尾动作。
- 同一任务命中多个信号时，先按 `governance\routing.md` 取交集最小集合，不自动叠加全部文件。
- 读取 evidence、历史归档、完整 JSON 或无关项目源码前，必须有明确问题、验证或追溯需求。
- 如果读取预算明显超出当前任务，先停下说明原因，再继续。

## 不默认读取清单

- `codex-issue-log.md` 的归档原文和完整历史长记录。
- `governance\reviews\...\evidence\` 下的截图、报告、命令输出和附件。
- `shared\ledgers\skill-automation-ledger\latest.json` 的完整 JSON。
- 与当前任务无关的项目源码、README、配置和构建产物。
- 与当前任务无关的 `governance\automation-scenarios\Axxx-*.md`。
- 已治理问题簇的完整复盘包，除非任务要验证治理是否失效。

## 执行口径

- `AGENTS.md` 决定强规则和收尾触发器。
- `codexworkspace-console.md` 只做短导航和预算入口。
- `governance\routing.md` 决定任务命中后读哪些文件。
- 本文件决定每一层最多读到什么程度。