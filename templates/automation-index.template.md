# 自动化台账

最后更新时间：YYYY-MM-DD

> 本文件只保留自动化总览。场景详情按需读取 `governance\automation-scenarios\Axxx-*.md`，避免默认加载长步骤。
> 不要在本文件中记录 App Secret、token、邮箱密码、GitHub 个人访问令牌或其他完整凭据。

## 维护规则

- 创建、更新、暂停、恢复或删除自动化后，同步更新本总览和对应场景文件。
- 每个自动化必须有唯一编号，例如 `A001`、`A002`。
- 只有任务涉及某个自动化时，才读取对应场景详情。
- 自动化涉及外部投递时，只记录接收方类型和必要标识，不记录任何密钥或 token。

## 状态说明

- `启用`：自动化按计划运行。
- `暂停`：自动化保留但暂不运行。
- `停用`：自动化不再使用，仅保留历史记录。

## 自动化总览

| 编号 | 场景 | 状态 | 触发方式 | 运行时间 | 面向人的产出 | 外部投递 | 最后验证 | 详情 |
|---|---|---|---|---|---|---|---|---|
| A001 | Codex 错误复盘周报 | 启用 | 定时 | 每周一 21:00，Asia/Shanghai | 新增重复分组、已治理问题复发统计、治理包建议 | 飞书群：`<FEISHU_CHAT_NAME_OR_ID>`；短摘要 + 附件 | YYYY-MM-DD | [A001](governance/automation-scenarios/A001-codex-error-review-weekly.md) |

## 新增自动化流程

1. 先在本文件新增总览行。
2. 再创建 `governance\automation-scenarios\Axxx-slug.md`。
3. 外部投递类自动化必须先读 `governance\playbooks\external-delivery-checklist.md`。
4. 创建、更新、暂停、恢复或删除后，在变更记录中登记。

## 变更记录

| 日期 | 自动化编号 | 变更内容 | 操作人/来源 | 备注 |
|---|---|---|---|---|
| YYYY-MM-DD | A001 | 初始化自动化台账示例 | Codex | 替换为真实记录后保留或删除 |
