[Back to table of contents](./README.md)

# 10. E2E Test automation strategy

## When to use this flow

Use `ywc-e2e-test-strategy` when the project does not yet have Playwright-based E2E tests, or when existing coverage is scattered and it is unclear "which flow should be automated first." The goal is to automate repeatedly regressing critical flows, such as login or checkout, at minimum cost.

## Initial setup (`--init`)

```
ywc-e2e-test-strategy --init
```

If `playwright.config.*` does not exist, this mode starts automatically. The sequence:

1. First confirm 3-5 Critical flows (do not proceed to the next step until they are confirmed). Default candidates: login/logout, core feature happy path, error state handling
2. Run `npx playwright install --with-deps chromium`
3. `baseURL` must always reference `process.env.BASE_URL` - no hardcoding
4. Automatically create `.github/workflows/e2e.yml` (if an existing workflow exists, add a job instead of creating a new file)

## Running it

**Add one Flow at a time**
```
ywc-e2e-test-strategy --flow "checkout happy path"
```
The clearer you make the entry URL, ordered actions, and expected final state, the better the result quality.

**Audit existing coverage**
```
ywc-e2e-test-strategy --audit
```
If `playwright.config.*` exists and no other flag is provided, this mode starts automatically. Tests without `waitForTimeout` / CSS class selectors (`.btn-*`) / `expect()` are marked fragile, and gaps are scored by a priority matrix (revenue impact x failure frequency). Only items scoring 5 or higher are proposed for automation.

**Preview the plan before writing files**
```
ywc-e2e-test-strategy --dry-run
```

## Flow selection criteria (first 5, highest ROI first)

1. Authentication (login/logout)
2. Core feature happy path
3. Form validation + error state
4. Navigation / routing
5. API error handling

Start with 5-8 flows and expand while measuring flakiness. "Let's test everything" only increases maintenance burden. It is better to leave the rest to `ywc-gen-testcase` in [09. Writing and running Tests](./09-testing-guide.md).

## What to leave as manual verification (`ywc-gen-testcase`) instead of automation

Visual/pixel accuracy, exploratory UX, one-time migrations, 3rd-party OAuth flows, email/SMS verification - these items have low value relative to automation cost.

## Code writing rules

- Selector priority: `data-testid` > ARIA role > visible text > CSS (last resort)
- No `waitForTimeout(N)` - replace with `locator.waitFor()` / `waitForURL()` / `waitForResponse()` (Reconnaissance Before Action: check state -> act -> check result)
- Include at least one negative case (error path) for each critical flow
- Reset state with `beforeEach` - no order dependency between tests

## CI essentials

- Chromium only in CI (Safari/Firefox have low value for the cost)
- `retries: 2`, `workers: 1` (avoid race conditions when sharing a dev server)
- Always upload trace/screenshot artifacts on failure
- Playwright browser cache (`package-lock.json` hash key) - avoid re-downloading about 300 MB on every run
- `timeout-minutes: 30` (so hung jobs do not block the queue)

## Completion checklist

- [ ] `playwright.config.ts` `baseURL` references env
- [ ] Every generated spec has at least one `expect()`
- [ ] No `waitForTimeout()`
- [ ] GitHub Actions triggers on both `push(main)` and `pull_request`

## Follow-up integration

For UX judgments automation cannot catch, such as awkward design or copy errors, supplement the release's manual QA checklist with `ywc-gen-testcase`.

---

[Previous: 09. Writing and running Tests](./09-testing-guide.md) - [Next: 11. Reviewing and improving design](./11-design-review.md)
