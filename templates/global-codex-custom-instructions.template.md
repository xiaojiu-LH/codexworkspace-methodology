# 全局 Codex 自定义指令模板

用途：将本文件内容复制到 Codex 的「设置 -> 个性化 -> 自定义指令」中，作为全局工作区边界规则。

本模板只保留全局规则中必要的工作区边界、最终回复前检查和全局 skill 配置变更约束。使用前请将 `<WORKSPACE_ROOT>` 替换为你的实际工作区根目录，例如 `X:\YourCodexWorkspace` 或 `/Users/you/YourCodexWorkspace`。

```markdown
# 全局 Codex 规则

<!-- CODEXWORKSPACE_BOUNDARY_START -->

## CodexWorkspace 工作区边界

- 所有 Codex 项目工作必须在 `<WORKSPACE_ROOT>` 下完成。
- 如果当前对话或任务打开了 `<WORKSPACE_ROOT>` 之外的项目，必须先说明外部路径、迁移目的和影响；获得用户明确同意后，再迁移或复制到 `<WORKSPACE_ROOT>\projects\Project_编号_项目名称`。
- 迁移完成后，只能修改、运行和整理 `<WORKSPACE_ROOT>` 内的工作区副本。
- 除非用户明确批准具体例外，不得在 `<WORKSPACE_ROOT>` 之外创建、编辑、运行或整理项目文件。
- 进入 `<WORKSPACE_ROOT>` 后，以 `<WORKSPACE_ROOT>\AGENTS.md` 作为工作区级规则来源，并优先读取和遵守它。
- 进入 `<WORKSPACE_ROOT>` 后，最终回复前必须按工作区级 `AGENTS.md` 的“最终回复前检查”确认治理动作已完成。

## 最终回复前检查

- 最终回复前必须回看本轮是否触发治理动作：项目新建/迁移/归档、skill 安装/删除/重命名/调整、规则变更、错误/返工/遗漏。
- 如果触发 skill 变更，必须先确认 `<WORKSPACE_ROOT>\codex-skills-inventory.md` 已同步更新；如果未更新，不得先发送完成回复。
- 如果触发规则变更，必须先确认 `<WORKSPACE_ROOT>\codexworkspace-console.md` 已同步更新最后更新时间或相关索引说明。
- 如果触发定时自动化、提醒、巡检或外部投递任务的创建、更新、暂停、恢复或删除，必须先确认 `<WORKSPACE_ROOT>\automation-index.md` 已同步更新。
- 如果出现错误、不满意结果、返工、规则理解偏差或遗漏清单维护，必须先确认 `<WORKSPACE_ROOT>\codex-issue-log.md` 已记录处理完成后的复盘。
- 最终回复中要明确说明这些治理文件是否已更新，不能只说明业务文件或安装动作完成。

## Codex Skills 全局配置变更

- 安装、删除、重命名、调整或个性化修改 Codex skill，属于全局 Codex 配置变更。
- 执行前必须说明 skill 来源、目标安装路径、是否位于 `<WORKSPACE_ROOT>` 之外、影响范围，以及是否需要重启 Codex 生效。
- 如果操作路径在 `<WORKSPACE_ROOT>` 之外，必须先获得用户明确同意。
- 执行后必须同步更新 `<WORKSPACE_ROOT>\codex-skills-inventory.md`，记录目录名、Skill 名称、中文作用、真实来源、添加或调整时间和备注。
- 执行后必须做“三点收尾”：校验 skill 有效；更新 skills 清单；最终回复前复核清单中能搜索到该 skill。
- 如果安装、删除或修改过程中出现返工、不满意、规则理解偏差或遗漏清单维护，处理完成后必须更新 `<WORKSPACE_ROOT>\codex-issue-log.md`。
- 除非用户明确要求，不得把工作区外的 skill 目录当作项目目录进行整理、迁移或批量修改。

<!-- CODEXWORKSPACE_BOUNDARY_END -->
```

## 使用说明

- 将 `<WORKSPACE_ROOT>` 替换为你的实际工作区根目录。
- 如果你的正式项目命名格式不是 `Project_编号_项目名称`，请同步替换为自己的项目命名规则。
- 不要在全局自定义指令中写入 `App Secret`、token、邮箱、飞书群 ID 或 GitHub 个人访问令牌。
