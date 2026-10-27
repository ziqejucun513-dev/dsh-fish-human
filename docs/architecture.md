# 架构

## 分层

```text
QQ
→ SnowLuma（OneBot）
→ qq-bridge
→ DSH Web
→ dsh-fish-human
→ 模型
```

`dsh-fish-human` 在 DSH 内运行，负责：

- 上下文注入
- 长期/短期记忆
- 心情
- 社交记忆
- 自我叙事
- 说说记忆
- 元认知

`qq-bridge` 在 DSH 外运行，负责：

- QQ 消息收发
- 短期缓冲写入
- 显著性计算
- 批量巩固
- 说说记录
- 白名单和权限

## 每轮注入

```text
【当前状态】
【社交记忆】
【短期共享摘要】
【最近的故事】
【我最近发过的说说】
【最近对话】最近 3 轮
【你记得的事】长期事实
```

## 长期记忆

- `factKey = value` 是主结构
- `text` 是原文，保留用于审计
- `scope` 区分群聊/私聊/共享
- `status` + `validTo` 处理过期和冲突

## 短期记忆

- `short-term.json` 保存最近 50 条
- 每条含 `salience`、`mood`、`scope`
- 默认只注入最近 3 轮

## 文件安全

长期文件写入：

```text
加锁 → 读 → 合并 → 写临时文件 → fsync → 原子替换 → journal → 释放锁
```

## 边界

- QQ 会话不暴露文件/命令工具
- 只允许 QQ MCP + `remember` + `todo_write` + `ask_user_question`
- 记忆只能通过受控工具写
