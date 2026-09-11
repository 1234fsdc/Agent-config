---
name: result
description: >
  通过运行 ID 获取已完成研究任务的结果。Get completed research task result by run ID
user-invocable: true
argument-hint: <run_id>
allowed-tools: Bash(parallel-cli:*)
metadata:
  author: parallel
---

# Get Research Result

## Run ID: $ARGUMENTS

```bash
parallel-cli research poll "$ARGUMENTS" --json
```

Present results in a clear, organized format.

If CLI not found, tell user to run `/parallel:parallel-cli-setup`.
