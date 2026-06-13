# CodexWorkspace 全局控制台

最后更新时间：YYYY-MM-DD

> 这是 `<WORKSPACE_ROOT>` 的总入口文件。Codex 进入本工作区后，应先阅读本文件，找到对应规则、流程、台账和复盘文件。
> 本文件需要根据用户的最新需求、工作区规则变化和项目管理方式持续更新。

## 01 工作区定位

`<WORKSPACE_ROOT>` 是所有 Codex 工作和项目处理的唯一根目录。

核心原则：

- 所有 Codex 项目工作都以 `<WORKSPACE_ROOT>` 为唯一工作根目录。
- 外部项目先按 [new-project-sop.md](new-project-sop.md) 迁移，再在工作区副本上继续。
- 强执行规则见 [AGENTS.md](AGENTS.md)，目录和命名细则见 [workspace-architecture-and-naming.md](workspace-architecture-and-naming.md)。

## 02 Codex 行为规则

Codex 的强执行规则集中维护在 [AGENTS.md](AGENTS.md)。

本控制台只做索引，不重复维护执行细则。

安装、删除、重命名、调整或个性化修改 Codex skill 属于全局 Codex 配置变更，也受 [AGENTS.md](AGENTS.md) 管理；执行后必须同步维护 [codex-skills-inventory.md](codex-skills-inventory.md)，如有流程偏差必须记录到 [codex-issue-log.md](codex-issue-log.md)。

## 03 目录地图

推荐的工作区结构如下：

```text
<WORKSPACE_ROOT>
├── codexworkspace-console.md
├── AGENTS.md
├── codex-issue-log.md
├── codex-skills-inventory.md
├── workspace-architecture-and-naming.md
├── new-project-sop.md
├── projects-index.md
├── projects\
├── shared\
├── archives\
└── temp\
```

目录和文件职责：

- `codexworkspace-console.md`：全局控制台，总入口，总说明书。
- `AGENTS.md`：Codex 可读取的强约束规则，用于让后续任务自动遵守工作区规范。
- `codex-issue-log.md`：记录 Codex 使用过程中的踩坑、不满意点、错误和处理复盘。
- `codex-skills-inventory.md`：记录当前 Codex 可用的 skills、来源、用途和添加时间。
- `workspace-architecture-and-naming.md`：记录工作区架构、目录职责和项目命名规则。
- `new-project-sop.md`：记录新建项目、迁移外部项目、初始化项目的标准流程。
- `projects-index.md`：记录正式项目编号、类型、状态、路径、使用入口和最后更新时间。
- `projects\`、`shared\`、`archives\`、`temp\`：一级工作目录，详细职责见 [workspace-architecture-and-naming.md](workspace-architecture-and-naming.md)。

## 04 项目生命周期

本工作区内的项目默认经历：新建或迁移、初始化、使用与维护、问题复盘、归档。

新建项目、迁移外部项目、项目 README 初始化和完成后检查的详细流程见：[new-project-sop.md](new-project-sop.md)

## 05 命名与架构原则

项目命名默认使用：

```text
Project_三位编号_项目名称
```

完整的目录职责、编号分配、中文项目名、外部项目迁移命名和归档规则见：[workspace-architecture-and-naming.md](workspace-architecture-and-naming.md)

## 06 问题复盘机制

错误、不满意结果、返工、踩坑和规则理解偏差统一记录在 [codex-issue-log.md](codex-issue-log.md)。

处理完成后再记录复盘，避免写未确认的临时判断。

## 07 后续扩展区

后续可以逐步补充以下控制台入口：

- 项目索引：[projects-index.md](projects-index.md) 记录正式项目、状态、路径和使用入口。
- 常用命令：沉淀跨项目常用的运行、测试、检查命令。
- 环境说明：记录本机开发环境、语言版本、包管理器和工具约定。
- 技能清单：[codex-skills-inventory.md](codex-skills-inventory.md) 记录当前 Codex 可用的 skills、来源和适用场景。
- 模板库：沉淀项目 README、日志条目、SOP、复盘模板。

本文件负责提供全局方向。具体规则应尽量拆分到职责清晰的细分文档中，避免控制台变成难以维护的超长文件。
