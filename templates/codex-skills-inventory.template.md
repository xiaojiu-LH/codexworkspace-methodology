# Codex Skills Inventory

最后更新时间：YYYY-MM-DD

维护范围：当前 Codex 可用 skills 的轻量索引。完整明细由本地 HTML/JSON 台账承载，避免默认加载大量 skill 明细。

## 总览

- 总计：N 个
- 本地台账：`shared\ledgers\skill-automation-ledger\latest.html`
- 机器可读明细：`shared\ledgers\skill-automation-ledger\latest.json`
- 刷新方式：按你的自动化或脚本定期刷新

## 来源分组摘要

| 分组 | 数量 | 说明 |
|---|---:|---|
| 示例分组 | N | 替换为真实来源分组 |

## 关键自定义 Skills

| 目录名 | Skill 名称 | 用途 | 详情来源 |
|---|---|---|---|
| `example-skill` | example-skill | 示例用途 | `latest.html/json` |

## 维护规则

- 添加、安装、删除、重命名或调整 Codex skill 后，更新本文件摘要并刷新 ledger。
- 完整 skill 明细不再写入本 Markdown；需要查单个 skill 时，先查 `latest.html` 或 `latest.json`，再按需读取对应 `SKILL.md`。
- skill 安装、删除、重命名、调整属于全局 Codex 配置变更；工作区外路径需要用户明确同意。
- 来源应记录真实来源：GitHub 仓库、插件名称、系统来源或用户说明；安装目录只代表本机生效位置。
- 不在本文件记录密钥、token、App Secret、完整飞书群 ID 或 GitHub 个人访问令牌。
