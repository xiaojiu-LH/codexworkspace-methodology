# 全局 Codex 自定义指令模板

用途：将本文件内容复制到 Codex 的「设置 -> 个性化 -> 自定义指令」中，作为全局工作区边界规则。

本模板只保留跨项目、跨对话必须遵守的短触发器。使用前请将 `<WORKSPACE_ROOT>` 替换为你的实际工作区根目录，例如 `X:\YourCodexWorkspace` 或 `/Users/you/YourCodexWorkspace`。

```markdown
# 全局 Codex 规则

<!-- CODEXWORKSPACE_BOUNDARY_START -->

## 定位

- 本文件只保留跨项目、跨对话必须遵守的短触发器。
- 进入 `<WORKSPACE_ROOT>` 后，默认只读 `<WORKSPACE_ROOT>\AGENTS.md` 和 `<WORKSPACE_ROOT>\codexworkspace-console.md`。
- 工作区内任务细节由 `<WORKSPACE_ROOT>\governance\routing.md` 渐进式披露；不要在全局 Agent 展开 SOP、台账、复盘包或 playbook 细节。
- 不默认读取 issue log 归档原文、完整 automation 详情、完整 skills 明细或 `governance\reviews\...\evidence\`。

## 工作区边界

- 所有 Codex 项目工作默认在 `<WORKSPACE_ROOT>` 下完成。
- 如果任务涉及 `<WORKSPACE_ROOT>` 之外的项目，必须先说明外部路径、迁移目的和影响；获得用户明确同意后，再迁移或复制到 `<WORKSPACE_ROOT>\projects\Project_编号_项目名称`。
- 迁移完成后，只能修改、运行和整理 `<WORKSPACE_ROOT>` 内的工作区副本。
- 除非用户明确批准，不得在 `<WORKSPACE_ROOT>` 之外创建、编辑、运行或整理项目文件。

## 任务开始前预检

开始执行前，先判断本轮是否涉及：

- 工作区外路径
- 全局配置变更
- 外部投递
- 自动化变更
- skill 变更
- 多副本同步
- Windows 写回或编码敏感文件
- GitHub 发布或网络访问

若命中以上任一项，进入工作区后先按 `governance\routing.md` 读取最小必需规则，再继续。

## 治理收尾

最终回复前只回看本轮实际触发的治理动作：

- 项目新建、迁移、归档
- skill 安装、删除、重命名、调整
- 规则变更
- 自动化变更
- 治理复盘包创建或更新
- 错误、返工、遗漏或规则理解偏差

若进入 `<WORKSPACE_ROOT>`，只按工作区级 `AGENTS.md` 检查本轮实际触发的治理动作；最终回复只说明实际更新过的治理文件，未触发治理动作时一句说明即可。

## 全局配置与 Skill

- 安装、删除、重命名、调整或个性化修改 Codex skill，属于全局 Codex 配置变更。
- 操作工作区外路径前，必须先获得用户明确同意。
- skill 变更后必须同步更新 `<WORKSPACE_ROOT>\codex-skills-inventory.md`，并刷新 `<WORKSPACE_ROOT>\shared\ledgers\skill-automation-ledger`。
- 如果过程中出现用户可见返工、文件部分落盘、规则失效、跨全局/外部路径，或同类复发达到阈值，处理完成后更新 `<WORKSPACE_ROOT>\codex-issue-log.md` 短记录。

## 外部投递

- 发送飞书、邮件、GitHub、Slack、网页或其他外部系统前，必须确认接收目标、发送方式和披露范围。
- 未获用户明确批准前，不得外发本地治理文件、项目路径、代码摘要、错误复盘或工作区私有信息。
- API 返回成功不等于用户可读；长报告优先使用“短摘要 + 附件”，并验证客户端展示效果。

## Windows 与编码

- 遇到 Windows sandbox/helper 抖动时，不要连续硬重试，也不要直接判断文件损坏。
- 遇到中文路径、治理文件、长中文 Markdown、`SKILL.md`、`temp/archives` 或大范围扫描时，第一轮先用绝对路径、单文件、小范围命令；确认 sandbox 稳定后再并行读取或扩大扫描。
- 如果目标在 `<WORKSPACE_ROOT>` 内、动作不涉及网络/认证/Git 写入/工作区外路径/破坏性操作，helper 抖动后不得直接申请提权；应先按工作区 routing/playbook 走未提权降级。
- 长中文 Markdown、治理文件、README、`SKILL.md` 或编码敏感文件写回时，使用 UTF-8 no BOM，并复核文件头、文件尾、关键词、NUL 和异常控制字符。

## 规则维护

- 修改全局 Agent 后，必须同步更新 `<WORKSPACE_ROOT>\projects\Project_001_CodexWorkspace方法论\templates\global-codex-custom-instructions.template.md`。
- 如果规则变更影响工作区机制，必须同步更新 `<WORKSPACE_ROOT>\codexworkspace-console.md` 或对应 `governance\` 记录。
- 不在全局 Agent 中记录密钥、token、App Secret、完整飞书群 ID、GitHub 个人访问令牌或其他完整凭据。

<!-- CODEXWORKSPACE_BOUNDARY_END -->
```

## 使用说明

- 将 `<WORKSPACE_ROOT>` 替换为你的实际工作区根目录。
- 如果你的正式项目命名格式不是 `Project_编号_项目名称`，请同步替换为自己的项目命名规则。
- 本文件只写全局短触发器；完整规则、台账、复盘包和 runbook 应维护在工作区内。
- 不要在全局自定义指令中写入 `App Secret`、token、邮箱、飞书群 ID 或 GitHub 个人访问令牌。
