# Governance Archive

最后更新时间：YYYY-MM-DD

`governance\` 是 `<WORKSPACE_ROOT>` 的治理档案馆，用于保存可复用的治理执行模板，以及较完整的复盘包、整改记录和证据材料。

## 职责边界

- `codex-issue-log.md`：记录短复盘、入口索引、复发标注和指向复盘包的链接；顶部索引用于告诉 A001 哪些问题簇已治理、哪些仍是候选。
- `governance\routing.md`：任务路由表，用于按任务信号渐进式读取 SOP、playbook、台账或复盘包。
- `governance\context-budget.md`：上下文预算器，用于定义默认启动层、中等任务和复杂治理任务的读取边界。
- `governance\playbooks\`：保存可重复执行的 checklist 和 runbook，覆盖任务分型、外部投递、Windows 写入、sandbox 分流、多副本同步和 canonical artifact 检查。
- `governance\automation-scenarios\`：保存每个自动化的详细目标、读取范围、执行步骤、权限和失败处理。
- `governance\reviews-index.md`：记录治理复盘包和候选问题簇的总览、状态、复发次数、最近发生、A001 是否跳过长复盘和最后验证时间。
- `governance\reviews\`：按年份保存完整复盘包。
- `evidence\`：只存在于具体复盘包内，保存截图、报告、命令输出和附件，不把大段证据塞进正文。

## 目录结构

```text
governance\
├── README.md
├── routing.md
├── context-budget.md
├── automation-scenarios\
│   └── Axxx-slug.md
├── playbooks\
│   ├── task-intake-and-closeout-checklist.md
│   ├── external-delivery-checklist.md
│   ├── windows-safe-editing.md
│   ├── sandbox-and-escalation-decision-tree.md
│   ├── multi-surface-sync-matrix.md
│   └── canonical-artifact-check.md
├── reviews-index.md
└── reviews\
    └── YYYY\
        └── YYYY-MM-DD_slug\
            ├── review.md
            ├── actions.md
            └── evidence\
```

## 何时先查 playbook

- 任务开始前，需要判断工作区边界、全局 skill、外部投递、多副本同步或编码敏感风险。
- 任务执行中，Windows/PowerShell 写入、sandbox 错误、外部发送和多副本同步容易返工。
- 任务结束前，需要显式完成收尾检查，而不是靠记忆判断。

## 何时进入治理档案馆

- 同类问题重复出现，需要合并复盘。
- 一次返工影响多个规则、自动化或模板。
- 需要长期追踪整改行为、验证状态或证据。
- 涉及跨项目、跨工作区或全局 Codex 规则调整。
- 自动化报告发现某个问题需要长期观察或归档。

普通小错误仍可只写入 `codex-issue-log.md`，不必创建复盘包。候选问题簇可先进入 `reviews-index.md`，等 A001 或实际任务确认高频且需要证据留存后，再创建完整复盘包。

## 复盘包结构

```text
governance\reviews\YYYY\YYYY-MM-DD_slug\
├── review.md
├── actions.md
└── evidence\
```

## 命名规则

- 年份目录：`YYYY`。
- 复盘包目录：`YYYY-MM-DD_slug`。
- `slug` 使用小写英文、数字和短横线，表达问题主题。
- 不在路径中写入密钥、账号、飞书群 ID、客户名或其他敏感信息。
