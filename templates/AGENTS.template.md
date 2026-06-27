# <WORKSPACE_ROOT> 的 Codex 执行规则

最后更新时间：YYYY-MM-DD

本文件是工作区 bootloader，只保留跨任务必须执行的短规则。默认启动读取本文件和 `codexworkspace-console.md`；读取范围先受 `governance\context-budget.md` 约束，再按 `governance\routing.md` 渐进式披露。

## 默认读取策略

- 默认只读：`AGENTS.md`、`codexworkspace-console.md`。
- 上下文预算：先按 `governance\context-budget.md` 判断默认启动层、中等任务或复杂治理任务。
- 命中任务信号后再读：`governance\routing.md` 指向的 SOP、playbook、台账或复盘包。
- 不默认读：`codex-issue-log.md` 归档原文、完整 automation 详情、完整 skills 明细、`governance\reviews\...\evidence\`。

## 工作区边界

- 所有 Codex 工作默认只在 `<WORKSPACE_ROOT>` 内完成。
- 工作区外项目必须先说明路径、迁移目的和影响，经用户同意后迁入 `projects\Project_编号_项目名称`。
- 除用户明确批准，不在 `<WORKSPACE_ROOT>` 之外创建、编辑、运行或整理项目文件。

## 任务路由

- 开始执行前先判断是否命中：工作区外路径、全局配置、外部投递、自动化、skill、多副本同步、Windows 写回、复盘整理、GitHub 发布。
- 命中特殊信号时，先读 `governance\routing.md` 的对应行，再读必需文件。
- 普通代码或文档小改只读项目相关文件，不读 issue log、automation、skills 全量台账。

## 安全底线

- 不执行破坏性操作，除非用户明确要求并确认影响。
- 不使用 `git reset --hard`、强制删除、批量移动等高风险操作，除非用户明确要求。
- 发送飞书、邮件、GitHub、Slack、网页或其他外部系统前，必须确认接收目标、发送方式和披露范围。
- 不记录密钥、token、App Secret、完整飞书群 ID、GitHub 个人访问令牌或其他完整凭据。

## Windows 与提权

- Windows helper 抖动、中文 Markdown 写回或编码问题，先读 `governance\playbooks\sandbox-and-escalation-decision-tree.md` 和 `windows-safe-editing.md`。
- 如果目标在 `<WORKSPACE_ROOT>` 内，且不涉及网络/认证/Git 写入/工作区外路径/破坏性操作，helper 抖动后不得直接申请提权；先用未提权的绝对路径、单命令、受控写回或更小范围命令继续。
- Git 写入、push/pull/fetch、网络/API、外部系统、全局配置或工作区外路径需要按权限流程确认。

## 治理收尾

最终回复前只检查本轮实际触发的治理动作：

- 项目新建、迁移、归档：更新 `projects-index.md`。
- skill 变更：更新 `codex-skills-inventory.md`，刷新 skills/automation ledger。
- 自动化变更：更新 `automation-index.md` 和对应 `governance\automation-scenarios\Axxx-*.md`。
- 规则或目录结构变更：更新 `codexworkspace-console.md`，必要时同步方法论模板。
- 治理复盘包创建或更新：更新 `governance\reviews-index.md`。
- 错误、返工、遗漏或规则理解偏差：在 `codex-issue-log.md` 写短记录；已治理问题簇只统计复发。

最终回复必须说明相关治理文件是否已更新；未触发的治理文件不用读取和更新。
