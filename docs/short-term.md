# 记忆：短期记忆

短期记忆负责“最近发生了什么”，不负责永久事实。

## 存储

`fish-memory/shared/short-term.json`

```json
{
  "maxTurns": 50,
  "ttlDays": 7,
  "injectTurns": 8,
  "maxChars": 6000,
  "managedByBridge": true,
  "conversations": {
    "private:1726733060": [
      {
        "at": "2026-10-27T12:00:00+08:00",
        "user": "我好累",
        "assistant": "那就早点睡",
        "salience": 0.67,
        "mood": 0.4,
        "scope": "private:1726733060",
        "consolidated": false
      }
    ]
  }
}
```

## 保留规则

- 每个 QQ 会话最多 50 条
- 最近 20 条必留
- 其余 30 个位置按 `salience` 保留
- 超过 7 天自动清理

## 显著性

```text
salience =
  0.20 基础
+ 0.30 情绪强度
+ 0.20 新颖度
+ 0.20 承诺/约定关键词
+ 0.10 与用户相关
+ 0.05 长消息
```

## 注入

默认只注入最近 3 轮：

```text
【最近对话】
用户：……
用户：……
用户：……
```

同时生成状态快照：

```text
【当前状态】
心情：偏低，累
关系：正常
约定：今晚十二点前睡
未完成：论文
偏好：海鲜、烤串
最近的事：……
```

## 批量巩固

每 20 条未巩固记录生成一条情节摘要：

```json
{
  "kind": "episodic",
  "text": "【巩固】2026/10/27 与用户聊到：……",
  "source": "短期缓冲批量巩固"
}
```

处理过的记录标记：

```json
"consolidated": true
```

## 与长期记忆的关系

- 短期只负责“最近”
- 稳定事实晋升长期
- 长期已有的事实，短期不再重复注入
