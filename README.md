# CodexWorkspace Methodology

CodexWorkspace Methodology 是一套面向 Codex/AI coding agent 的本地工作区管理方法论。它用一组 Markdown 模板，把项目迁移、目录命名、执行规则、SOP、skills 清单、项目台账、自动化台账、治理档案和问题复盘放进同一个可维护的工作区。

它适合想把 AI 辅助开发从临时对话变成长期工作系统的人。

## 解决什么问题

- 项目散落在不同目录，路径和上下文容易混乱。
- 外部项目迁移进来时，没有统一放置和命名方式。
- 新建、迁移、归档项目靠临时约定。
- Codex 出错、返工或踩坑后，没有沉淀为下次可复用的规则。
- skills、项目状态和入口信息靠记忆维护。
- 自动化、外部通知和报告投递缺少安全边界，容易出现“API 成功但实际不可读”或未经确认的信息外发。
- `codex-issue-log.md` 长期积累后，缺少定期归纳相似错误、生成防复发待办并投递给人的机制。
- 完整复盘、整改行为和证据材料如果都塞进 issue log，长期会变成难以维护的巨型文件。

## 核心思路

- 只保留一个工作区根目录：`<WORKSPACE_ROOT>`。
- 所有正式项目进入 `projects/` 后再处理。
- 正式项目使用统一命名：`Project_三位编号_项目名称`。
- 强执行规则、控制台、命名细则、SOP、项目台账、问题日志和 skills 清单分文件维护。
- 高频变化的信息进入专门台账，不塞进总控文件。
- 完整治理复盘进入 `governance/`，`codex-issue-log.md` 只保留短记录和复盘包链接。

## 复盘系统重构

本项目将 Codex 复盘机制拆成分层系统，避免 `codex-issue-log.md` 变成越来越难维护的长流水账：

- `codex-issue-log.md` 只保留短记录、入口索引、复发标注和复盘包链接。
- `governance/reviews-index.md` 作为完整复盘包总台账，记录状态、复发次数、最近发生、整改状态和最后验证时间。
- `governance/reviews/...` 承载完整复盘、整改动作和证据材料，证据放入具体复盘包的 `evidence/`。
- A001 定时复盘先读取问题簇索引；已治理问题只统计复发和是否突破现有规则，不重复生成长复盘。
- `governance/playbooks/` 承载可复用 checklist/runbook，让任务预检、外部投递、Windows 写入、sandbox 分流、多副本同步和 canonical artifact 检查有统一入口。

## 渐进式披露

CodexWorkspace 默认只让 Codex 读取极薄的 `AGENTS.md` 和 `codexworkspace-console.md`，再由 `governance/routing.md` 按任务信号路由到对应 playbook、SOP、台账或复盘包。

这样普通代码修改不会默认加载 issue log、自动化详情或完整 skills 清单；只有外部投递、skill 变更、Windows 写回、自动化维护、复盘整理等特定任务，才读取对应细则。

`governance/context-budget.md` 进一步定义默认启动层、中等任务和复杂治理任务的读取边界，防止规则和台账在长期使用中重新膨胀。

## 推荐工作区结构

```text
<WORKSPACE_ROOT>
├── AGENTS.md
├── codexworkspace-console.md
├── workspace-architecture-and-naming.md
├── new-project-sop.md
├── projects-index.md
├── automation-index.md
├── governance/
├── codex-issue-log.md
├── codex-skills-inventory.md
├── projects/
├── shared/
├── archives/
└── temp/
```

## 模板

`templates/` 是本项目唯一的可复制源。

| 模板 | 用途 |
|---|---|
| `AGENTS.template.md` | Codex 强执行规则 |
| `global-codex-custom-instructions.template.md` | Codex 设置中“个性化 -> 自定义指令”的全局规则模板 |
| `codexworkspace-console.template.md` | 工作区总控入口 |
| `workspace-architecture-and-naming.template.md` | 目录架构与项目命名细则 |
| `new-project-sop.template.md` | 新建项目与迁移外部项目流程 |
| `projects-index.template.md` | 正式项目台账 |
| `automation-index.template.md` | 定时自动化、提醒、巡检和外部投递台账 |
| `codex-issue-log.template.md` | 错误、不满意点、返工和踩坑复盘 |
| `codex-skills-inventory.template.md` | Codex skills 清单 |
| `governance/` | 治理档案馆模板，包含 context budget、routing、playbooks、automation scenarios、复盘包索引、复盘正文、整改记录和证据目录 |

模板中的 `<WORKSPACE_ROOT>`、`YYYY-MM-DD`、示例项目名和示例编号都需要按自己的工作区替换。

## 文档导览

- [方法论概览](docs/01-methodology.md)
- [文件系统设计](docs/02-file-system.md)
- [Codex 执行规则](docs/03-agent-rules.md)
- [项目生命周期](docs/04-project-lifecycle.md)
- [维护机制](docs/05-maintenance.md)
- [自动化与外部投递](docs/06-automation-and-external-delivery.md)
- [治理档案馆](docs/07-governance-archive.md)

典型自动化案例：每周读取 `codex-issue-log.md` 和 `AGENTS.md`，整理相似错误、复发模式和防复发待办，生成报告文件后通过飞书等协作工具发送短摘要和附件。

## 快速开始

1. 选择一个固定工作区目录，用它替换模板里的 `<WORKSPACE_ROOT>`。
2. 将 `templates/` 中的模板复制到工作区根目录，并去掉 `.template` 后缀。
3. 按自己的命名规则、项目类型和 skills 来源调整模板内容。
4. 将 `templates/global-codex-custom-instructions.template.md` 中的占位符替换为自己的工作区信息后，写入 Codex 的「设置 -> 个性化 -> 自定义指令」。
5. 在全局 Codex 规则中要求外部项目先迁移到该工作区。
6. 新建或迁移项目时，按 `new-project-sop.md` 执行。
7. 项目状态变化、skills 变化、自动化变化或问题复盘后，更新对应文档。
8. 创建定时自动化或外部通知前，先完成真实链路验证、信息披露确认和展示效果验证，并更新 `automation-index.md`。
9. 重复问题、重要返工或需要证据留存的复盘，创建 `governance/` 复盘包，并在 `codex-issue-log.md` 中保留短记录和链接。

## 适配方式

你可以按自己的工作习惯调整：

- 工作区根目录。
- 项目命名格式。
- 项目类型枚举。
- README 字段。
- skills 来源分组方式。
- 问题复盘字段。

## 贡献

欢迎贡献更清晰的模板、真实使用案例、工作区规则和文档改进。请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 关于作者

**xinghe（星禾）**  
AI 内容自动化实践者 / AI 工具链开发者 / AI Workflow Builder

GitHub: [https://github.com/xinghe-AGI](https://github.com/xinghe-AGI)  
微信公众号: 小星禾AI  
小红书: 小星禾AI  
微信号: xinghe_AGI

---
## License

MIT License. See [LICENSE](LICENSE).
