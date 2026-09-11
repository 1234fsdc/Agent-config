---
name: status
description: >
  通过运行 ID 查询正在执行的研究任务状态。Check running research task status by run ID
user-invocable: true
argument-hint: <run_id>
allowed-tools: Bash(parallel-cli:*)
metadata:
  author: parallel
---

# Check Research Status

## Run ID: $ARGUMENTS

```bash
parallel-cli research status "$ARGUMENTS" --json
```

If CLI not found, tell user to run `/parallel:parallel-cli-setup`.
