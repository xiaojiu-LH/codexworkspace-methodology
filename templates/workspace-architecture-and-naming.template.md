# Workspace Architecture and Naming

最后更新时间：YYYY-MM-DD

维护范围：`<WORKSPACE_ROOT>` 的目录架构、项目放置规则和命名规则。

## 01 文件职责

本文件负责定义工作区架构和命名细则。

- `codexworkspace-console.md` 是工作区总控入口。
- `AGENTS.md` 是 Codex 执行规则。
- 本文件负责把目录职责、项目放置和命名规则写成可执行细则。
- 本文件不记录项目状态、入口命令或运行方式；这些内容由 `projects-index.md` 或项目 README 维护。

## 02 根目录结构

根目录只放全局说明、规则、日志、清单、SOP、台账和一级工作目录。

推荐结构：

```text
<WORKSPACE_ROOT>
├── AGENTS.md
├── codexworkspace-console.md
├── codex-issue-log.md
├── codex-skills-inventory.md
├── workspace-architecture-and-naming.md
├── new-project-sop.md
├── projects-index.md
├── automation-index.md
├── projects\
├── shared\
├── archives\
└── temp\
```

根目录不得直接放正式项目代码。正式项目必须进入 `projects\`。

## 03 标准目录职责

- `projects\`：正式项目目录，所有新建项目和迁移后的外部项目默认放在这里。
- `shared\`：跨项目共享资料、模板、参考材料和可复用脚本，不占项目编号。
- `archives\`：已完成、暂停或历史项目归档位置，归档项目保留原编号和项目名。
- `temp\`：短期实验、一次性验证、临时文件，不占正式项目编号。

如果某个内容会持续维护、运行或迭代，应放入 `projects\`；如果只是临时验证，应放入 `temp\`。

## 04 项目命名规则

正式项目统一使用：

```text
Project_三位编号_项目名称
```

完整路径格式：

```text
<WORKSPACE_ROOT>\projects\Project_001_项目名称
```

示例：

```text
projects\Project_001_Codex全局控制台
projects\Project_002_客户研究仪表盘
projects\Project_003_AI写作工具
```

基本规则：

- 固定前缀使用 `Project_`。
- 编号使用三位数字，例如 `001`、`002`、`003`。
- 编号后使用下划线连接项目名称。
- 项目名称应表达项目用途，而不是临时描述。
- 项目名称重名时，优先使用新的递增编号区分。

## 05 编号分配规则

新项目编号按以下规则分配：

1. 查看 `projects\` 下所有符合 `Project_三位编号_项目名称` 的目录。
2. 找出当前最大编号。
3. 新项目编号使用最大编号 + 1。
4. 如果 `projects\` 下还没有正式项目，从 `001` 开始。

编号规则：

- 编号固定三位，不使用两位或四位。
- 编号不跳号重用。
- 项目归档到 `archives\` 后，原编号仍不复用。
- 临时实验和共享材料不占正式项目编号。

## 06 中文项目名规则

项目名称可以使用中文，也可以使用英文、数字和必要的短横线。

允许示例：

```text
Project_004_销售线索分析
Project_005_AI-writing-tool
Project_006_客户研究-dashboard
```

禁止或避免：

- 不使用空格。
- 不使用路径分隔符：`\`、`/`。
- 不使用 Windows 高风险路径字符：`:`、`*`、`?`、`"`、`<`、`>`、`|`。
- 不使用只表达临时状态的名称，例如 `test`、`new`、`demo2`。
- 不使用过长名称；项目名称应短、清楚、可识别。

## 07 外部项目迁移命名

无论从哪里打开外部项目，都必须先迁移或复制到 `<WORKSPACE_ROOT>` 后再继续工作。

迁移命名规则：

- 迁移目标目录必须在 `projects\` 下。
- 迁移后的目录名必须符合 `Project_三位编号_项目名称`。
- 项目名称可以参考外部项目原名，但需要整理成清晰、可长期识别的名称。
- 迁移完成后，只操作 `<WORKSPACE_ROOT>` 内的副本。
- 不直接修改外部原项目，除非用户明确要求并批准。

示例：

```text
外部项目：<EXTERNAL_PROJECT_PATH>
迁移后：<WORKSPACE_ROOT>\projects\Project_007_我的应用
```

## 08 根目录文件清单

根目录全局文件职责以 [codexworkspace-console.md](codexworkspace-console.md) 为准。

本文件只维护目录架构与命名规则；项目状态和使用入口由 [projects-index.md](projects-index.md) 或项目 README 维护，自动化状态由 [automation-index.md](automation-index.md) 维护。
