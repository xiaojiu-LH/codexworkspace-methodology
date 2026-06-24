# Multi-Surface Sync Matrix

最后更新时间：YYYY-MM-DD

本矩阵适用于 skill、文档、资产和多副本同步任务，避免只修一面。

## 同步面清单

| 同步面 | 什么时候要查 | 常见对象 |
|---|---|---|
| 运行副本 | 当前任务真正执行的副本 | 项目内源码、当前使用中的 skill 副本 |
| 发布副本 | 需要推送或公开展示时 | GitHub 发布目录、公开 README |
| 全局副本 | 涉及全局安装或本机默认入口时 | `<USER_HOME>\.codex\skills\...` |
| README/索引 | 对外入口或导航会受影响时 | `README.md`、`reference-images.md`、目录索引 |
| examples/reference/QA | 示例图、参考图、提示词或 QA 规则被修改时 | `assets\examples`、`references\`、`qa-checklist.md` |
| 治理文件 | 任务触发工作区治理动作时 | `codex-issue-log.md`、`codexworkspace-console.md` 等 |

## 开始前先列影响面

至少回答：

- 这次改动的权威源头是哪一份。
- 哪个副本是真正运行中的副本。
- 哪些 README、索引、examples、reference 会被用户直接看到。
- 是否会同步到全局安装目录或公开仓库。

## 完成前逐面复核

- 运行副本已生效。
- 发布副本没有漏同步。
- 全局副本只在用户明确要求时同步。
- README/索引已反映新增能力、示例或范围变化。
- examples/reference/QA 没有残留旧词、旧范围或错误资源。
- 治理文件按触发条件补齐。

## 高风险场景

- 目录级复制到已存在目标目录。
- 只更新了 `assets/examples`，没更新 README 或 references。
- 只改了项目副本，忘了发布副本或全局副本。
- 清理旧品牌残留时误删 README、LICENSE、NOTICE 或归因说明。