[Back to table of contents](./README.md)

# 13. 完整 Skill 参考

本页面将之前工作流程指南中未涵盖的剩余技能按**你想做的事情**进行分组。在每个流程（小/中/大周期、新项目、入职、测试或设计）中需要时使用它。

## 当您想处理 PR / 审查时

**回应开放 PR 的审查意见，并清理 CI/冲突**
```
ywc-handle-pr-reviews 250
```
如果你省略 PR 号码，它会自动为当前分支找到 PR。

**提交更改并打开草稿 PR**
```
ywc-create-pr --title "fix: correct timezone offset in report export" --lang ko
```
这已经包含在来自 [04](./04-general-cycle-small.md) 和 [05](./05-general-cycle-medium-large.md) 的流程中，因此当你想在这些流程之外仅打开独立的 PR 时使用它。

**一次性清理累积的 Dependabot PR**
```
ywc-merge-dependabot security parallel-auto
```
如果省略 `security`，它将针对所有 Dependabot PR。如果省略 `parallel-auto`，它将按 PR 编号依次处理 PR。

**只提交目前完成的工作**
```
ywc-commit authentication 관련 변경만 커밋해줘
```
这不是为了 PR 的创建或代码更改本身。它只是提交用的。

## 当你还没有计划，或者希望它在没有人工干预的情况下完成

**你的想法还不具体，你想先把它弄清楚**
```
ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음
```
通过苏格拉底式对话，它推导出目标/约束条件/成功标准以及2-3个备选方案，然后交给`ywc-plan`。

**你想设定一个目标，然后让整个从规划到执行的过程在无人干预下运行**

这已移至专用的 `ywc-agentic` 页面。用法和示例请参见 [06. Finish automatically from one goal](./06-agentic-autonomous-loop.md)。

## 当你想要检查质量和安全时

**检查敏感代码中的安全漏洞，例如认证/支付**
```
ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md
```

**你被卡住了，因为你找不到错误的原因**
```
ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음
```
这可以防止仅解决症状的补丁，并强制进行四步根本原因调查。如果修复在同一点失败三次或更多次，它会引导你质疑架构本身。

**清理旧的无用代码（未使用的函数/导出/依赖）**
```
ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe
```

**为生产事故撰写事后分析报告**
```
ywc-incident-postmortem --client
```
`--client` 另外会创建一个面向客户的摘要，省略内部细节。

## 当你想积累项目知识（有状态技能）

这些技能不是一次性的工具。它们管理在对话结束后仍保留在项目中的知识，并且可以在以后的会话中被引用。

**教系统关于重复代码审查反馈的内容，这样它就不会再次提出相同的误报**
```
ywc-review-learnings 이 지적은 false positive 야, 학습해둬
```

**创建或更新由开发人员、领域专家和大型语言模型共享的领域词汇表**
```
ywc-ubiquitous-language --context billing --ddd
```
`--ddd` 添加了 DDD 类型列，例如实体 / 值对象 / 聚合。

**记录项目的原因和被拒绝的方法**
```
ywc-mission 이 project 의 목표는 ...
```
这已经在 [07. Starting a new Project](./07-starting-a-new-project.md) 中涵盖，并且当项目方向发生变化时也可以重复使用。

## 当你想要准备一个发布版本时

**总结包含在发布版本 PR（develop->main 等）中的已合并 PR 列表**
```
ywc-release-pr-list 301
```

**编写 CHANGELOG.md 或面向用户的版本说明**
```
ywc-changelog-release-notes --both --version 1.4.0
```
如果你传递 `--pr-list <result file from ywc-release-pr-list>`，它会使用该列表作为来源，而不是 git log。

---

[Previous: 12. Executor / Code-gen Prompt patterns](./12-executor-and-codegen-patterns.md) - [Back to table of contents](./README.md)
