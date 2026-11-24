# CivicFix Team Log

A running record of real team-workflow situations on this project:
what happened, why, how it was fixed, and what we learned.

- **Dev A** = Windows laptop (cmd)
- **Dev B** = Ubuntu laptop (bash)

Newest entries go at the **bottom**.

<!--
  HOW TO ADD AN ENTRY
  This block is an HTML comment: GitHub does NOT show it on the page.
  Copy the template below, paste it at the end of the file, and fill it in.

  ## YYYY-MM-DD — Short title
  **Who:** Dev A / Dev B · **Related:** #issue or #PR
  **What happened:** what you saw (paste the key error line in backticks).
  **Why:** the cause, in one or two sentences.
  **Fix:** the commands or steps that solved it.
  **Lesson:** one sentence to remember.
-->

---

## 2026-10-28 — SSH to GitHub timed out on port 22

**Who:** Dev B, then Dev A · **Related:** setup
**What happened:** `ssh: connect to host github.com port 22: Connection timed out`
**Why:** The network blocks port 22. The SSH key itself was fine.
**Fix:** Added `~/.ssh/config` so SSH uses `ssh.github.com` on port 443.
**Lesson:** When a connection times out, suspect the network before the key.

## 2026-10-28 — Windows npm stayed at the old version

**Who:** Dev A · **Related:** setup
**What happened:** After updating Node.js, `npm -v` still showed 11.18.0.
**Why:** An older global npm in `AppData\Roaming\npm` took priority over the new one.
**Fix:** `npm install -g npm@11.19.1`, so both laptops use the same npm.
**Lesson:** `where npm` (Windows) or `which -a npm` (Linux) shows which copy actually runs.

## 2026-10-29 — Direct push to main was rejected

**Who:** Dev B · **Related:** `protect-main` ruleset
**What happened:** `GH013: Repository rule violations found ... Changes must be made through a pull request.`
**Why:** `main` is protected on purpose. This was a test.
**Fix:** `git reset --hard origin/main` to drop the throwaway commit.
**Lesson:** Every change to `main` goes through a PR, even for the repo owner.

## 2026-10-29 — "CRLF will be replaced by LF" warnings

**Who:** Dev A · **Related:** #1, #2
**What happened:** Git warned about CRLF while staging the setup files on Windows.
**Why:** Windows saves CRLF line endings; `.gitattributes` tells Git to store LF.
**Fix:** Nothing needed. `git ls-files --eol` showed `i/lf` for every file, and `w/lf` on Ubuntu.
**Lesson:** One `.gitattributes` file keeps Windows and Linux from fighting over line endings.

## 2026-10-30 — Squash merge and branch deletion

**Who:** Dev B · **Related:** #4
**What happened:** After squash-merging PR #4, `git branch -d feat/3-scaffold` warned the branch was "not yet merged to HEAD".
**Why:** Squash creates one new commit, so the branch's original commits are not on `main`.
**Fix:** Deleted the branch (use `git branch -D` once GitHub shows the PR as merged).
**Lesson:** After a squash merge, `-D` is expected. Also check the squash commit message box: the title got doubled with the branch name.

## 2026-10-30 — Git log got "stuck" on Windows

**Who:** Dev A · **Related:** —
**What happened:** `git log` showed `~` lines and `(END)`, and the next pasted commands created a stray file called `tall`.
**Why:** Git opened the output in the `less` pager. Pasted letters became pager commands (`s` = save to file).
**Fix:** Pressed `q` to quit, deleted `tall`. Now using `git --no-pager log` on Windows.
**Lesson:** If the terminal shows `(END)`, press `q`.

## 2026-11-24 — Required CI check blocked a broken PR

**Who:** Dev B · **Related:** #5, #6, #7
**What happened:** PR #7 had a deliberate type error. CI failed with `TS2345` and the merge button was disabled.
**Why:** The `Lint and Build` check is required by the `protect-main` ruleset.
**Fix:** Closed PR #7 without merging and deleted the branch.
**Lesson:** Lint passed but Build failed: ESLint does not check types, TypeScript does. That is why CI runs both.