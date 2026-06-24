# CodexWorkspace 控制台

最后更新时间：YYYY-MM-DD

> 本文件是短导航入口。默认与 `AGENTS.md` 一起读取；细节按 `governance\routing.md` 渐进式披露。

## 工作区定位

`<WORKSPACE_ROOT>` 是 Codex 项目、治理文件、自动化台账和共享资产的唯一工作区根目录。

## 默认入口

- 强规则 bootloader：[AGENTS.md](AGENTS.md)
- 任务路由表：[governance\routing.md](governance/routing.md)
- 目录与命名：[workspace-architecture-and-naming.md](workspace-architecture-and-naming.md)
- 新建/迁移项目：[new-project-sop.md](new-project-sop.md)
- 项目台账：[projects-index.md](projects-index.md)

## 目录地图

```text
<WORKSPACE_ROOT>
├── AGENTS.md
├── codexworkspace-console.md
├── governance\
│   ├── routing.md
│   ├── playbooks\
│   ├── automation-scenarios\
│   └── reviews\
├── automation-index.md
├── codex-issue-log.md
├── codex-skills-inventory.md
├── projects\
├── shared\
├── archives\
└── temp\
```

## 按任务读取

- 普通代码/文档修改：只读项目相关文件。
- 外部投递：读 `governance\playbooks\external-delivery-checklist.md`。
- Windows/helper/编码问题：读 sandbox 和 Windows safe editing playbook。
- skill 变更：读 `codex-skills-inventory.md` 和 multi-surface sync playbook。
- 自动化变更：读 `automation-index.md` 和对应 scenario。
- 复盘整理：读 `codex-issue-log.md` 的问题簇索引和 `governance\reviews-index.md`。

完整路由以 [governance\routing.md](governance/routing.md) 为准。

## 轻量台账

- 自动化总览：[automation-index.md](automation-index.md)，详情在 `governance\automation-scenarios\`。
- issue log：[codex-issue-log.md](codex-issue-log.md)，只保留问题簇索引、历史摘要和近期短记录。
- skills 索引：[codex-skills-inventory.md](codex-skills-inventory.md)，完整明细看 `shared\ledgers\skill-automation-ledger\latest.html` / `latest.json`。
- 治理复盘总览：[governance\reviews-index.md](governance/reviews-index.md)。
