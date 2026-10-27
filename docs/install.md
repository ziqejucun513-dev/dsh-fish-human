# 安装

## 前置

- DeepSeek Harness >= 0.2.1
- Node.js >= 20
- 可选：QQ 桥接 + SnowLuma

## 本地 link 安装

```bash
dsh plugin --profile web add link:/path/to/dsh-fish-human
```

确认 profile：

```bash
cat "$DSH_HOME/profiles/web/package.json"
```

应该包含：

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

重启 DSH：

```bash
systemctl restart dsh-web
```

## 卸载

```bash
dsh plugin --profile web remove dsh-fish-human
```

然后从 profile 的 `dsh.profile.bundles` 中移除：

```json
"dsh-fish-human"
```

## 数据

插件不会自动创建示例记忆。首次运行后生成：

```text
$DSH_HOME/fish-memory/
$DSH_HOME/feiyu-mood/
```

不要把这些目录提交到仓库。

## 安全

- QQ 会话不暴露文件和命令工具
- 记忆写入有锁、原子替换、备份和 journal
- 不要把 `.credentials.yaml`、vault、会话文件放进仓库
