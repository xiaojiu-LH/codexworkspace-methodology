# 文件系统设计

工作区应该有一个固定根目录，所有 Codex 项目都在这里完成。

示例中统一使用 `<WORKSPACE_ROOT>` 代表你的实际工作区根目录。

## 推荐结构

```text
<WORKSPACE_ROOT>
├── AGENTS.md
├── codexworkspace-console.md
├── workspace-architecture-and-naming.md
├── new-project-sop.md
├── projects-index.md
├── automation-index.md
├── codex-issue-log.md
├── codex-skills-inventory.md
├── projects/
├── shared/
├── archives/
└── temp/
```

## 目录职责

- `projects/`：正式项目和迁移后的外部项目。
- `shared/`：跨项目共享资料、模板、脚本和参考材料。
- `archives/`：已完成、暂停或停止维护的项目。
- `temp/`：短期实验和一次性验证。

## 项目命名

推荐正式项目使用：

```text
Project_三位编号_项目名称
```

示例：

```text
Project_001_CodexWorkspace方法论
Project_002_客户研究仪表盘
Project_003_AI写作工具
```

编号应递增，不因为归档而复用。项目名称可以使用中文，但应避免空格和路径高风险字符。

## 根目录规则

根目录只放全局规则、索引、台账和一级工作目录。正式项目不要直接放在根目录。
