# 方法论概览

CodexWorkspace Methodology 的核心是：把 Codex 的工作从“对话驱动”升级为“工作区驱动”。

普通使用方式往往依赖上下文记忆：今天告诉 Codex 规则，明天换一个项目后规则就可能丢失。这个方法论把规则写成文件，让 Codex 每次进入工作区都能读取同一套约束、流程和台账。

## 八个核心文件

- `AGENTS.md`：强执行规则。它告诉 Codex 什么能做、什么不能做。
- `codexworkspace-console.md`：总控入口。它告诉人和 Codex 应该去哪里找规则。
- `workspace-architecture-and-naming.md`：目录架构与命名细则。
- `new-project-sop.md`：新建项目与迁移外部项目的流程。
- `projects-index.md`：正式项目台账。
- `automation-index.md`：定时自动化、提醒、巡检和外部投递台账。
- `codex-issue-log.md`：问题、踩坑和不满意点复盘。
- `codex-skills-inventory.md`：skills 清单。

## 设计原则

- 单一职责：每个文件只维护一类规则。
- 可执行：规则必须能指导 Codex 下一步怎么做。
- 可维护：高频变化的信息放到专门台账，不塞进总控文件。
- 可复盘：错误和返工要沉淀为下次可避免的规则。
- 可迁移：外部项目先复制到工作区，再在副本上处理。

## 为什么要拆文件

如果所有规则都放进一个 Markdown 文件，短期方便，长期会变成难以维护的规则堆。拆分后：

- 总控文件只做导航。
- 执行规则只放硬约束。
- SOP 只管流程。
- 台账只管状态。
- 复盘只管经验。

这样 Codex 不需要在一大段说明里猜重点。
