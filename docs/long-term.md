# 记忆：长期记忆

## 目标

长期记忆只保留稳定、可复用的事实，不保留流水账。

## 结构

```json
{
  "id": "fact_xxx",
  "text": "用户喜欢吃海鲜和烤串",
  "factKey": "用户.饮食偏好",
  "value": "海鲜、烤串",
  "kind": "semantic",
  "scope": "private:1726733060",
  "status": "active",
  "confidence": 0.9,
  "importance": 0.84,
  "salience": 0.69,
  "emotion": 0,
  "validTo": null,
  "supersededBy": null,
  "recallCount": 0,
  "lastRecalled": null
}
```

## 注入

只注入短值：

```text
用户.饮食偏好 = 海鲜、烤串
```

不注入 `text` 原文，节省 token。

## 什么时候写

- 用户明确说“记住”
- 高显著性短期记录
- 批量巩固出的稳定事实
- 鱼主动调用 `remember`

## 什么时候合并

- 同一个 `factKey`
- 文本相似度 ≥ 0.82

合并时保留更高的 `importance`、`salience`、`confidence`，并增加 `reinforceCount`。

## 什么时候过期

- 同一 `factKey` 出现新值
- 旧条 `validTo = now`
- 旧条 `supersededBy = 新id`
- 旧条不再正常召回，但保留可追溯

## 召回

```text
P = C × (0.55 + 0.25A + 0.15I + 0.05E)
```

- `C`：相关度，低于 0.35 不选
- `A`：鲜活度，基础半衰期 30 天
- `I`：重要度
- `E`：情绪强度，半衰期 7 天

每次最多注入 6 条 / 800 字。

召回后更新：

```json
{
  "recallCount": 1,
  "lastRecalled": "时间",
  "activation0": 0.82
}
```
