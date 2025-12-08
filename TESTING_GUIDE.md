# Testing Guide for Junie Workflows

This guide explains how to test each workflow from the Cookbook.

## Prerequisites

1. Push this repository to GitHub
2. Add `JUNIE_API_KEY` to repository secrets
3. Enable GitHub Actions in repository settings

## Testing Each Workflow

### 1. Basic Interactive Setup (`junie.yml`)

**Status:** ✅ Ready to test

**How to test:**
1. Create an issue with `@junie-agent implement a hello world function in JavaScript`
2. Or comment `@junie-agent` on any existing issue
3. Junie should respond and create a PR

**Expected result:**
- Junie analyzes the issue
- Creates a new branch
- Opens a PR with the implementation
- Comments on the issue with PR link

---

### 2. Automated Code Review (`code-review.yml`)

**Status:** ✅ Ready to test

**How to test:**
1. Create a new branch: `git checkout -b test-review`
2. Edit `src/example.js` (or create a new file)
3. Push and open a PR
4. Code review should trigger automatically

**Expected result:**
- Junie posts a structured review comment
- Reviews security, performance, and code quality
- Provides specific suggestions with file:line references

**Test with intentional issues:**
The existing `src/example.js` has intentional issues:
- `eval()` usage (security)
- SQL injection risk
- N+1 query pattern

---

### 3. Sync Documentation (`sync-docs.yml`)

**Status:** ✅ Ready to test

**How to test:**
1. Create a new branch: `git checkout -b update-api`
2. Modify `src/routes/users.ts` (add new endpoint or change existing)
3. Open PR to `main`
4. Merge the PR
5. Workflow triggers after merge

**Expected result:**
- Junie checks if `docs/API.md` needs updates
- If needed, creates a new PR with documentation updates
- If not needed, skips silently

---

### 4. Fix CI Failures (`fix-ci.yml`)

**Status:** ⚠️ Requires CI workflow

**Setup:**
1. First, create a CI workflow (`.github/workflows/ci.yml`):
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

**How to test:**
1. Make the CI fail (e.g., edit package.json script to `exit 1`)
2. Push to a branch
3. Wait for CI to fail
4. `fix-ci.yml` should trigger automatically

**Expected result:**
- Junie fetches error logs using MCP
- Provides detailed failure analysis
- Suggests fixes or applies simple fixes

**Note:** Update line 250 in `fix-ci.yml` to match your CI workflow name.

---

### 5. Security Audit (`secret-audit.yml`)

**Status:** ✅ Ready to test

**How to test - Safe method:**
1. Create a new branch
2. Add a fake secret to any file:
   ```js
   const API_KEY = "AKIAIOSFODNN7EXAMPLE";
   ```
3. Commit and push
4. Workflow runs automatically

**Expected result:**
- Junie scans the diff
- Reports "SECRETS_FOUND" if fake secret detected
- CI fails with error message
- Shows detailed report in job summary

**Test with clean commit:**
1. Push normal code changes
2. Should report "CLEAN" status
3. CI passes

---

### 6. Dependency Review (`dependency-review.yml`)

**Status:** ✅ Ready to test

**How to test - Manual:**
1. Create a new branch
2. Edit `package.json`, update a dependency version:
   ```json
   "express": "^4.19.0"  // change to newer version
   ```
3. Open PR
4. Workflow triggers if PR title/author matches conditions

**How to test - With Dependabot:**
1. Enable Dependabot in repository settings
2. Wait for Dependabot to create a PR
3. Workflow triggers automatically

**Expected result:**
- Junie reads changelog of updated package
- Identifies breaking changes
- Searches codebase for affected usage
- Provides migration guidance or applies fixes

**Note about `pull_request_target`:**
- This workflow uses `pull_request_target` instead of `pull_request`
- This allows Dependabot PRs to access secrets (required for `JUNIE_API_KEY`)
- Safe because Junie Action validates permissions and checks out specific PR SHA

---

### 7. API Documentation (`api-docs.yml`)

**Status:** ✅ Ready to test

**How to test:**
1. Push changes to `main` branch that affect:
   - `src/routes/**`
   - `src/controllers/**`
   - `src/api/**`
2. For example, add a new endpoint to `src/routes/users.ts`

**Expected result:**
- Junie scans route files
- Extracts endpoint metadata
- Updates `docs/API.md` and `docs/openapi.yaml`
- Creates PR with documentation updates

**Note:** Create `docs/openapi.yaml` file first if needed.

---

## Common Testing Scenarios

### Test @junie-agent in PR Comments
1. Open any PR
2. Add a review comment: `@junie-agent can you add error handling here?`
3. Junie should implement the requested change

### Test @junie-agent in PR Reviews
1. Open a PR
2. Submit a review with `@junie-agent` mentioned
3. Junie should address the review feedback

### Test Label Trigger
1. Create an issue
2. Add the `junie` label (or custom label if configured)
3. Junie should process the issue

## Debugging

If a workflow doesn't trigger:
1. Check Actions tab for workflow runs
2. Review workflow `if:` conditions
3. Verify secrets are configured
4. Check permissions in workflow file

If Junie fails:
1. Check job logs in Actions tab
2. Download "junie-working-directory" artifact
3. Review error messages
4. Verify API key is valid

## Cleanup

After testing:
1. Close/delete test PRs and branches
2. Review and close any issues
3. Check Actions usage if needed

## Notes

- Most workflows use `use_single_comment: true` to avoid spam
- Some workflows are disabled by default (check `on:` conditions)
- Enable/disable workflows as needed by modifying workflow files
- All workflows use `@v0` version for stability
