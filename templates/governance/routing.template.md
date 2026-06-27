# CodexWorkspace Task Routing

最后更新时间：YYYY-MM-DD

本文件是 CodexWorkspace 的渐进式披露路由表。默认只读 `AGENTS.md` 和 `codexworkspace-console.md`；读取层级先看 `governance\context-budget.md`，命中特定任务信号后，再读取本文件指向的 SOP、playbook 或台账详情。

## 读取原则

- 先判断任务类型，再读取对应文件。
- 先遵守 `governance\context-budget.md` 的默认启动层、中等任务和复杂治理任务边界。
- 不因普通代码修改默认读取 `codex-issue-log.md`、`automation-index.md`、`codex-skills-inventory.md` 全量内容。
- 已归档证据、完整 skill 明细、自动化详情和长复盘只在命中任务时读取。
- 如果任务同时命中多个信号，只读取完成任务所需的最小集合。

## 任务路由表

| 任务信号 | 必读 | 按需读 | 默认不读 | 收尾动作 |
|---|---|---|---|---|
| 普通代码修改、文档小改 | 项目 README、项目配置、相关源码 | `governance\playbooks\canonical-artifact-check.md` | issue log、automation、skills 全量台账 | 运行必要验证；通常不更新治理文件 |
| 新建或迁移项目 | `new-project-sop.md`、`workspace-architecture-and-naming.md`、`projects-index.md` | `governance\playbooks\task-intake-and-closeout-checklist.md` | skills 全量台账、旧 issue log 归档 | 更新 `projects-index.md`，必要时更新 console |
| skill 安装、删除、重命名、调整 | `codex-skills-inventory.md`、`governance\playbooks\multi-surface-sync-matrix.md` | skills/automation ledger | automation 详情、旧 issue log 归档 | 更新 skills 清单，刷新 ledger，必要时写短 issue log |
| 外部投递 | `governance\playbooks\external-delivery-checklist.md` | 对应项目 README、`automation-index.md` | skills 全量台账、旧 issue log 归档 | 发送前确认目标和披露范围 |
| 自动化变更 | `automation-index.md`、对应 `governance\automation-scenarios\Axxx-*.md` | external-delivery checklist | skills 全量台账、旧 issue log 归档 | 更新自动化总览和场景详情 |
| Windows helper 抖动、编码问题 | sandbox 和 Windows safe editing playbook | G002 复盘包 | 自动化详情、skills 全量台账 | 工作区内先未提权降级 |
| 复盘整理 | `codex-issue-log.md`、`governance\reviews-index.md` | 对应治理包 | 项目源码、skills 全量台账 | 更新 reviews-index；长证据进 evidence |
| GitHub 发布 | 当前仓库状态、README、变更 diff | external-delivery checklist、G005 候选 | skills 全量台账、旧 issue log 归档 | push 前验证；网络/Git 写入需确认 |

## 不默认读取的内容

- `governance\reviews\...\evidence\` 中的完整证据。
- `codex-issue-log.md` 的归档原文。
- skills ledger 的完整 JSON。
- 自动化场景详情，除非任务涉及对应自动化。
