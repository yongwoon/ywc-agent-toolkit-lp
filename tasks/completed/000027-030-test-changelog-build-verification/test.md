# 000027-030-test-changelog-build-verification — Manual Test Plan

## Preconditions

- [ ] `000027-020-ui-changelog-section` is merged
- [ ] `npm install` has completed and the fixture/cache is present

## Test Scenarios

### Scenario 1: Network fallback

**Steps:**

1. Run the generator with the fetch mocked to fail.
2. Compare `src/data/toolkit-changelog.json` before and after the run.

**Expected Result:**

- Build-time generation exits successfully and preserves the last committed entries.

### Scenario 2: Five locale static output

**Steps:**

1. Run `npm run build`.
2. Inspect `/en/`, `/ja/`, `/ko/`, `/zh/`, `/es/` output.

**Expected Result:**

- Each locale contains the section between Social Proof and FAQ, with matching entry count and exact GitHub links.

### Scenario 3: Accessibility and responsive behavior

**Steps:**

1. Check the section at 320, 768, 1024, and 1440px.
2. Navigate its links using keyboard only and enable reduced motion.

**Expected Result:**

- No horizontal overflow or clipped content occurs; focus is visible; no required content depends on animation.

### Scenario 4: Budget and parity gates

**Steps:**

1. Run `node scripts/check-message-keys.mjs`.
2. Run `npm run verify:bundle`.

**Expected Result:**

- All locale leaf keys match and the existing JS bundle budget passes without regression.
