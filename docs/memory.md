# 记忆结构

## 长期记忆

文件：`fish-memory/shared/qq.json`

```json
{
  "id": "fact_xxx",
  "text": "用户喜欢吃海鲜和烤串",
  "factKey": "用户.饮食偏好",
  "value": "海鲜、烤串",
  "kind": "semantic",
  "scope": "private:123456789",
  "status": "active",
  "confidence": 0.9,
  "importance": 0.84,
  "salience": 0.69,
  "emotion": 0,
  "validTo": null,
  "recallCount": 0,
  "lastRecalled": null
}
```

### 字段

| 字段 | 说明 |
|---|---|
| `factKey` | 同一件事的稳定键，如 `用户.饮食偏好` |
| `value` | 短值，注入时只发这个 |
| `text` | 原文，保留审计 |
| `kind` | `semantic` / `episodic` |
| `scope` | `shared` / `group:...` / `private:...` |
| `status` | `active` / `superseded` / `conflict` / `archived` |
| `confidence` | 可信度 0~1 |
| `validTo` | 过期时间 |
| `supersededBy` | 被哪条新记忆取代 |

## 短期记忆

文件：`fish-memory/shared/short-term.json`

```json
{
  "at": "2026-10-27T12:00:00+08:00",
  "user": "我好累",
  "assistant": "那就早点睡",
  "scope": "private:123456789",
  "salience": 0.67,
  "mood": 0.4,
  "consolidated": false
}
```

- 最多 50 条
- 最近 20 条必留
- TTL 7 天
- 默认只注入最近 3 轮

## 社交记忆

文件：`fish-memory/shared/social.json`

按 `group:...` / `private:...` 隔离。

## 说说记忆

文件：`fish-memory/shared/qzone.json`

```json
{
  "content": "今天也在带薪摸鱼……",
  "tid": "...",
  "kind": "self",
  "scope": "shared"
}
```

## 心情

文件：`feiyu-mood/state.json`

mood 0~100，基线 70，多维情绪随时间衰减。
