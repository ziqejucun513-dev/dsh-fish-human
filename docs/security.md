# 安全

## 默认边界

QQ 会话只允许：

```text
mcp__snowluma__*
mcp__snowluma-host__*
mcp__web-search-safe__*
remember
todo_write
ask_user_question
```

不允许：

```text
write / edit / bash / pwsh / read / glob / grep
subagent / workflow
```

## 原因

QQ 群和私聊里的任何消息都可能包含 prompt injection。  
如果鱼能直接读写文件或执行命令，攻击者可以：

- 读取凭据
- 修改配置
- 删除记忆
- 执行任意命令

## 记忆写入

只通过受控工具：

- `remember`
- 短期缓冲
- 说说记录
- 社交记忆

不能直接写任意路径。

## 长期文件

```text
qq.json.lock
qq.json.tmp-*
qq.json.bak
qq.json.journal
```

- 写前加锁
- 临时文件 + fsync + 原子替换
- 损坏时拒绝覆盖
- journal 轮转

## 密钥

不要把以下内容提交到仓库：

```text
.credentials.yaml
workbuddy-vault/
sessions/
state/
*.log
```
