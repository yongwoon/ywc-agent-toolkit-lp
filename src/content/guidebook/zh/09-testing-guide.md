[Back to table of contents](./README.md)

# 09. 编写和运行测试

## 何时使用此流程

在功能实现完成后使用此方法，并且你需要验证它是否真正按照预期工作。验证分为两个不同的分支：自动化代码测试和需要人工判断的手动验证。

## 整体流程

```
1. write test cases -> 2. run test sheet (code test + e2e test) -> 3. if results differ from expectations, fix and rerun
```

| 步骤 | 会发生什么 |
|---|---|
| 1. 编写测试用例 | 使用 `ywc-gen-testcase` 创建 PR / Task / 基于差异的手动验证测试表给开发人员和 QA |
| 2a. 代码测试 | 使用项目现有的测试运行器运行单元/集成测试 |
| 2b. 端到端测试 | 运行由 `ywc-e2e-test-strategy` 生成的流程 - 参见 [10. E2E Test automation strategy](./10-e2e-test-strategy.md) |
| 3. 重新运行 | 修复与预期不符的结果，然后只重新运行相关测试 |

## `ywc-gen-testcase` 示例

**从 PR 号码创建开发+QA 测试表**
```
ywc-gen-testcase 250
```

**使用当前的差异，仅限QA受众，日文输出**
```
ywc-gen-testcase --from-diff --audience qa --lang ja
```

**基于Task的，包括回归项目**
```
ywc-gen-testcase 000020-010 --include-regression
```

## 人工验证与自动化：何时使用哪种

| 验证目标 | 方法 |
|---|---|
| 视觉/像素精度，探索性用户体验判断 | `ywc-gen-testcase`（手动）- 需要人工判断的领域 |
| 一次性迁移、第三方 OAuth 流程、邮箱/短信验证 | `ywc-gen-testcase`（手动）- 对于其价值来说通常自动化成本太高 |
| 登录/注销，核心功能正常流程，伴随重复回归的流程 | `ywc-e2e-test-strategy`（自动）- 参见 [10](./10-e2e-test-strategy.md) |
| 函数/模块级逻辑 | 该项目现有的单元/集成测试运行器 |

这两种方法不是替代品；它们**互为补充**。对于自动化无法发现的用户体验判断，请在每次发布时补充使用来自 `ywc-gen-testcase` 的手动 QA 清单。

---

[Previous: 08. Entering an existing Repo for the first time](./08-onboarding-existing-repo.md) - [Next: 10. E2E Test automation strategy](./10-e2e-test-strategy.md)
