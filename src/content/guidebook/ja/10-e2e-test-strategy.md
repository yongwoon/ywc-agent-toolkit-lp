[« 目次に戻る](./README.md)

# 10. E2E Test 自動化戦略

## いつこのフローを使うか

プロジェクトに Playwright ベースの E2E test がまだない、またはあってもカバレッジが散らばっていて「どの flow から自動化すべきか」が不明確なときに `ywc-e2e-test-strategy` を使います。繰り返し回帰が発生する核心 flow(ログイン、決済など)を最小コストで自動化することが目的です。

## 初期設定 (`--init`)

```
ywc-e2e-test-strategy --init
```

`playwright.config.*` がなければ自動的にこのモードへ入ります。進行順序:

1. Critical flow 3〜5 個を先に確定します (未確定なら次の段階へ進まない)。基本候補: ログイン/ログアウト、核心機能 happy path、error state 処理
2. `npx playwright install --with-deps chromium` を実行
3. `baseURL` は常に `process.env.BASE_URL` を参照 — ハードコード禁止
4. `.github/workflows/e2e.yml` を自動生成 (既存 workflow があれば新規ファイルの代わりに job を追加)

## 実行

**Flow を 1 つずつ追加生成**
```
ywc-e2e-test-strategy --flow "checkout happy path"
```
entry URL、順番通りの action、期待する最終状態を明確に指定するほど結果品質が上がります。

**既存カバレッジを点検**
```
ywc-e2e-test-strategy --audit
```
`playwright.config.*` があり、他の flag がなければ自動的にこのモードへ入ります。`waitForTimeout` / CSS class selector(`.btn-*`) / `expect()` のない test は fragile と表示され、priority matrix(revenue impact × failure frequency)で gap を採点し、合計 5 点以上のみ自動化対象として提案します。

**ファイル作成前に計画だけ確認**
```
ywc-e2e-test-strategy --dry-run
```

## Flow 選定基準 (最初の 5 個、ROI が高い順)

1. Authentication (login/logout)
2. Core feature happy path
3. Form validation + error state
4. Navigation / routing
5. API error handling

5〜8 個から始め、flakiness を測定しながら拡張してください。「全部テストしよう」は保守負担だけを増やします。カバーしない残りは、[09. Test を作成して実行する](./09-testing-guide.md)の `ywc-gen-testcase` に残しておく方がよいです。

## 自動化せず手動検証(`ywc-gen-testcase`)に残すもの

Visual/pixel 精度、探索的 UX、1 回限りの migration、3rd-party OAuth flow、email/SMS 認証 — これらは自動化コストに対する効果が低い項目です。

## コード作成ルール

- selector 優先順位: `data-testid` > ARIA role > visible text > CSS(最後の手段)
- `waitForTimeout(N)` 禁止 — `locator.waitFor()` / `waitForURL()` / `waitForResponse()` に置き換える (Reconnaissance Before Action: 状態確認 → アクション → 結果確認)
- critical flow ごとに negative case(エラー経路)を最低 1 つ含める
- `beforeEach` で state を初期化 — test 間の順序依存を禁止

## CI 設定の要点

- CI では Chromium only (Safari/Firefox は費用対効果が低い)
- `retries: 2`, `workers: 1` (dev server 共有時の race condition 防止)
- 失敗時は必ず trace/screenshot artifact をアップロード
- Playwright ブラウザ cache (`package-lock.json` ハッシュキー) — run ごとの ~300MB 再ダウンロードを防ぐ
- `timeout-minutes: 30` (hung job がキューを塞がないように)

## 完了条件チェックリスト

- [ ] `playwright.config.ts` の `baseURL` が env 参照か
- [ ] 生成された spec ごとに `expect()` が最低 1 つあるか
- [ ] `waitForTimeout()` がないか
- [ ] GitHub Actions が `push(main)` + `pull_request` の両方でトリガーされるか

## 以後の連携

自動化で拾えない UX 判断(デザインの違和感、文言ミス)は、`ywc-gen-testcase` でそのリリースの手動 QA チェックリストを補完してください。

---

[← 前: 09. Test を作成して実行する](./09-testing-guide.md) · [次: 11. デザインをレビューして改善する →](./11-design-review.md)
