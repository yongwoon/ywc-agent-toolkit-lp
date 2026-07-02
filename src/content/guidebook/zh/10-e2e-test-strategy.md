[Back to table of contents](./README.md)

# 10. E2E 测试自动化策略

## 何时使用此流程

当项目还没有基于Playwright的E2E测试，或现有覆盖分散且不清楚“应该先自动化哪个流程”时，请使用`ywc-e2e-test-strategy`。目标是以最低成本重复自动化关键流程的回归测试，例如登录或结账。

## 初始设置 (`--init`)

```
ywc-e2e-test-strategy --init
```

如果 `playwright.config.*` 不存在，此模式会自动启动。顺序如下：

1. 首先确认3-5个关键流程（在确认之前不要进行下一步）。默认候选流程：登录/登出、核心功能的正常路径、错误状态处理
2. 运行 `npx playwright install --with-deps chromium`
3. `baseURL` 必须始终引用 `process.env.BASE_URL` - 不得硬编码
4. 自动创建 `.github/workflows/e2e.yml`（如果已有工作流，则添加一个作业，而不是创建新文件）

## 运行它

**一次添加一个流程**
```
ywc-e2e-test-strategy --flow "checkout happy path"
```
你越清楚地说明入口 URL、操作顺序和预期的最终状态，结果质量就越好。

**审查现有保障**
```
ywc-e2e-test-strategy --audit
```
如果存在 `playwright.config.*` 且未提供其他标志，则此模式会自动启动。没有 `waitForTimeout` / CSS 类选择器 (`.btn-*`) / `expect()` 的测试会被标记为脆弱，缺口会根据优先矩阵（收入影响 x 失败频率）进行评分。只有评分为 5 或更高的项目才会被提议进行自动化。

**在写入文件之前预览计划**
```
ywc-e2e-test-strategy --dry-run
```

## 流程选择标准（前5项，按最高投资回报率排序）

1. 认证（登录/登出）
2. 核心功能顺利流程
3. 表单验证 + 错误状态
4. 导航 / 路由
5. API 错误处理

从 5-8 个流程开始，并在测量不稳定性时逐步扩展。“测试所有内容”只会增加维护负担。最好将其余部分留给 `ywc-gen-testcase` 在 [09. Writing and running Tests](./09-testing-guide.md) 中处理。

## 什么需要保留为手动验证（`ywc-gen-testcase`）而不是自动化

视觉/像素精度、探索性用户体验、一-time迁移、第三方OAuth流程、电子邮件/短信验证——这些项目相对于自动化成本价值较低。

## 代码编写规则

- 选择器优先级：`data-testid` > ARIA 角色 > 可见文本 > CSS（最后手段）
- 不要 `waitForTimeout(N)` - 用 `locator.waitFor()` / `waitForURL()` / `waitForResponse()` 替换（行动前侦察：检查状态 -> 行动 -> 检查结果）
- 对于每个关键流程至少包含一个负面案例（错误路径）
- 使用 `beforeEach` 重置状态 - 测试之间没有顺序依赖

## CI 基础

- 仅在 CI 中使用 Chromium（Safari/Firefox 的成本价值较低）
- `retries: 2`, `workers: 1`（在共享开发服务器时避免竞争条件）
- 失败时始终上传追踪/截图工件
- Playwright 浏览器缓存（`package-lock.json` 哈希键）- 避免每次运行时重新下载约 300 MB
- `timeout-minutes: 30`（这样挂起的作业不会阻塞队列）

## 完成清单

- [ ] `playwright.config.ts` `baseURL` 引用环境
- [ ] 每个生成的规格至少有一个 `expect()`
- [ ] 无 `waitForTimeout()`
- [ ] GitHub 动作会同时触发 `push(main)` 和 `pull_request`

## 后续整合

对于自动化无法捕捉的用户体验判断，例如设计不合理或文案错误，请在发布的手动 QA 清单中补充 `ywc-gen-testcase`。

---

[Previous: 09. Writing and running Tests](./09-testing-guide.md) - [Next: 11. Reviewing and improving design](./11-design-review.md)
