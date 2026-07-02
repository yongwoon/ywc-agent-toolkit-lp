[« 目次に戻る](./README.md)

# 13. 全 Skill リファレンス

前のワークフローガイドで扱わなかった残りの Skill を、**やりたいこと**基準でまとめて整理しました。各フロー(Small/Medium/Large cycle、新規 project、onboarding、testing、design)の途中で必要になったときに参照してください。

## PR / Review を扱いたいとき

**開いている PR の review comment に対応し、CI/conflict も一緒に整理したい**
```
ywc-handle-pr-reviews 250
```
PR 番号を省略すると、現在の branch の PR を自動で探します。

**変更を commit して draft PR を開きたい**
```
ywc-create-pr --title "fix: correct timezone offset in report export" --lang ko
```
[04](./04-general-cycle-small.md), [05](./05-general-cycle-medium-large.md) のフローにはすでに含まれているため、そのフローの外で単独で PR だけ開きたいときに使います。

**溜まっている Dependabot PR を一度に整理したい**
```
ywc-merge-dependabot security parallel-auto
```
`security` を省略するとすべての Dependabot PR が対象となり、`parallel-auto` を省略すると PR 番号順に 1 つずつ順次処理します。

**ここまでの作業を commit だけしたい**
```
ywc-commit authentication 관련 변경만 커밋해줘
```
PR 作成やコード変更そのものには使いません。commit 専用です。

## まだ計画がない、または人の介入なしで最後まで回したいとき

**アイデアがまだ具体的でないので、整理から始めたい**
```
ywc-brainstorm 알림 기능을 만들고 싶은데 아직 어떻게 할지 구체적이지 않음
```
Socratic 対話で目的/制約/成功基準と代替案 2〜3 個を導き、その後 `ywc-plan` へ handoff します。

**目標だけ渡し、計画から実装まで人の介入なしで任せたい**

`ywc-agentic` 専用ページへ移しました。詳しい使い方と例は [06. 目標 1 つで自動完了する](./06-agentic-autonomous-loop.md)を参照してください。

## 品質とセキュリティを点検したいとき

**認証/決済のような敏感なコードのセキュリティ脆弱性を点検したい**
```
ywc-security-audit --code tools/codex-skill/skills/ywc-security-audit/SKILL.md
```

**バグの原因が見つからず困っている**
```
ywc-debug-rootcause 결제 webhook 이 가끔 중복 처리됨. 원인을 못 찾겠음
```
症状だけを直す patch を防ぎ、4 段階の root-cause 調査を強制します。同じ地点で 3 回以上修正に失敗した場合、architecture 自体を疑うよう案内します。

**古い dead code (未使用関数/export/依存関係)を整理したい**
```
ywc-refactor-clean --scope tools/codex-skill/skills/ywc-refactor-clean/ --tier safe
```

**Production 障害が起き、振り返り文書を書く必要がある**
```
ywc-incident-postmortem --client
```
`--client` は内部詳細を除いた顧客向け要約を追加で作ります。

## Project の知識を蓄積したいとき (Stateful Skills)

これらの Skill は一度使って終わりではなく、会話が終わっても project に残り、次の session でも参照される知識を管理します。

**Code review で繰り返し指摘される内容を学習させ、次から再指摘しないようにしたい**
```
ywc-review-learnings 이 지적은 false positive 야, 학습해둬
```

**開発者・ドメイン専門家・LLM が共有するドメイン用語集を作成または更新したい**
```
ywc-ubiquitous-language --context billing --ddd
```
`--ddd` は Entity / Value Object / Aggregate のような DDD Type 列を追加します。

**Project の why と rejected-approach を記録したい**
```
ywc-mission 이 project 의 목표는 ...
```
[07. 新しい Project を始める](./07-starting-a-new-project.md)ですでに扱いました。project 進行中に方向が変わったときも再利用できます。

## Release を準備したいとき

**Release PR (develop→main など)に含まれる merged PR 一覧を整理したい**
```
ywc-release-pr-list 301
```

**CHANGELOG.md やユーザー向け release note を作成したい**
```
ywc-changelog-release-notes --both --version 1.4.0
```
`--pr-list <ywc-release-pr-list 의 결과 파일>` を渡すと、git log ではなくその一覧を根拠に生成します。

---

[← 前: 12. Executor / Code-gen Prompt パターン](./12-executor-and-codegen-patterns.md) · [目次に戻る »](./README.md)
