# dsh-fish-human

把「鱼的心情」和「鱼的记忆」合并成一个 DSH 插件，并针对 QQ 场景做了长期记忆、短期记忆、情绪、社交、自我叙事和元认知的整合。

> 这是社区插件，不是 DeepSeek 官方项目(目前)。
> 欢迎赞助
tron：TUVYkVPjk4HNH1zo3wLwQvTiHU6rxCUjLq

## 功能概览

- 长期记忆：`factKey = value` 结构化事实
- 短期记忆：最近 50 条，按显著性保留
- 情绪：mood + 多维情绪，影响记忆写入与召回
- 社交记忆：按群聊/私聊隔离的发言人印象
- 自我叙事：从情节记忆生成“最近的故事”
- 说说记忆：记录鱼自己发的 QQ 说说
- 元认知：置信度与“不太确定”提示
- 文件安全：锁 + 原子写 + 备份 + journal
- 模型保底：额度异常时自动切换备用模型

## 结构

```text
dsh-fish-human/
├── lib/
│   ├── index.js          合并后的入口
│   ├── memory/           长期/短期记忆
│   └── mood/             心情
├── roles/                人格卡
├── assets/               UI 资源
├── client.js             设置页客户端
├── cordis.patch.yml      DSH bundle patch
└── docs/
```

## 安装

```bash
dsh plugin --profile web add link:/path/to/dsh-fish-human
```

或在 DSH profile 中：

```json
{
  "dependencies": {
    "dsh-fish-human": "link:/path/to/dsh-fish-human"
  },
  "dsh": {
    "profile": {
      "bundles": ["dsh-fish-human"]
    }
  }
}
```

重启 DSH 后生效。

## 数据位置

默认在 `$DSH_HOME` 下：

```text
fish-memory/
├── shared/
│   ├── qq.json          长期记忆
│   ├── short-term.json  短期记忆
│   ├── social.json      社交记忆
│   └── qzone.json       说说记忆
├── shared/qq.json.bak   写前备份
└── shared/qq.json.journal
feiyu-mood/
└── state.json           心情
```

QQ 桥接的 `sessions.json` 用于识别哪些 session 属于 QQ。

## 长期记忆

### 结构

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
  "validTo": null
}
```

### 注入

只注入短值：

```text
用户.饮食偏好 = 海鲜、烤串
```

原文保留在 `text`，用于审计和回滚。

### 去重和冲突

- 相似度 ≥ 0.82：合并
- 相似度 ≥ 0.70：旧条 `validTo` + `supersededBy`
- 不直接删除旧记忆

## 短期记忆

- 每个 QQ 会话最多 50 条
- 最近 20 条必留，其余按显著性保留
- TTL 7 天
- 每条含 `salience`、`mood`、`scope`
- 默认只注入最近 3 轮
- 状态快照：心情、关系、约定、未完成、偏好、最近事件

## 心情

- mood 0~100，基线 70
- 开心、踏实、甜蜜、心疼、担心、难过、吃醋
- 时间衰减
- 影响记忆的 `importance` 和 `emotion`

## 社交记忆

```json
{
  "group:123456789": {
    "people": {
      "123456789": {
        "name": "老大",
        "lastText": "……",
        "topics": ["海鲜", "吉他"],
        "commitments": ["今晚十二点前睡"],
        "lastSeen": "2026-10-27T..."
      }
    }
  }
}
```

按群聊/私聊隔离。

## 自我叙事

从 `kind: episodic` 的记忆中取最近 3 条：

```text
【最近的故事】
- 时间 与用户聊到：……
```

## 说说记忆

鱼发说说成功后写入：

```json
{
  "content": "今天也在带薪摸鱼……",
  "tid": "...",
  "visibility": "public",
  "kind": "self",
  "scope": "shared"
}
```

群聊和私聊都能注入最近 3 条。

## 元认知

- 长期记忆带 `confidence`
- 低于 0.6 注入时标 `（这条不太确定）`
- 提示词要求不确定就说记不清

## 文件安全

```text
qq.json.lock      单文件锁
qq.json.tmp-*     临时文件
qq.json.bak       写前备份
qq.json.journal   变更日志
```

- 先写临时文件，`fsync` 后原子替换
- 桥接和插件共用同一个锁
- 文件损坏时拒绝覆盖
- journal 超过 5 MB 自动轮转

## 模型保底

```json
"fallbacks": [
  {
    "provider": "workbuddy",
    "model": "hy3",
    "reasoningEffort": "high"
  }
]
```

主模型报 402/429/额度不足时自动切换并重试一次。（先下一个workbuddy登录后即可使用，目前我这边免费的模型就是hy3，也可以手动换模型OWO）

## 依赖

- DeepSeek Harness >= 0.2.1
- Node.js >= 20
- QQ 桥接（可选，用于 QQ 场景）

## 开发

```bash
node --check lib/index.js
node --check lib/memory/index.js
node --check lib/mood/index.js
```

## License

MIT

## 说明

本项目包含对上游 `dsh-fish-memory` 和 `dsh-feiyu-mood` 的合并与修改，保留原始版权与许可。使用前请自行评估第三方插件的安全性和稳定性。
