# 心情

## 状态

文件：`feiyu-mood/state.json`

```json
{
  "mood": 70,
  "dims": {
    "happy": 0,
    "calm": 0,
    "sweet": 0,
    "heartache": 0,
    "worry": 0,
    "sad": 0,
    "jealous": 0
  },
  "updatedAt": 1792909854297
}
```

- `mood`：0~100，基线 70
- 七个维度：0~100
- 随时间衰减

## 影响

写长期记忆时：

```text
情绪强度 = 0.55 × |mood - 70| / 70
         + 0.45 × 最高情绪维度 / 100
```

- `importance` 最多增加 `0.2 × 情绪强度`
- `emotion` 写入情绪强度
- 召回时 `emotion` 参与排序

## 隔离

心情按 session 保存，群聊和私聊不共享。
