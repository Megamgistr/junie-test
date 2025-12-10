# Junie Test Repository

This repository contains test workflows extracted from the [Junie GitHub Action Cookbook](https://github.com/JetBrains/junie-github-action/blob/main/COOKBOOK.md).

## Setup

1. **Add Junie API Key to secrets:**
   - Go to **Settings → Secrets and variables → Actions**
   - Create `JUNIE_API_KEY` with your key from [junie.labs.jb.gg](https://junie.labs.jb.gg/)

2. **Test workflows included:**
   - `junie.yml` - Basic interactive Junie setup
   - `code-review.yml` - Automated PR code reviews
   - `sync-docs.yml` - Sync documentation after merges
   - `fix-ci.yml` - Analyze and fix CI failures
   - `secret-audit.yml` - Scan for accidentally committed secrets
   - `dependency-review.yml` - Review dependency updates

## Testing

### Basic Interactive Setup
Comment `@junie-agent` in any issue or PR to trigger Junie.

### Code Review
Open a PR and it will be automatically reviewed.

### Sync Documentation
Merge a PR to main and documentation will be checked for updates.

### Security Audit
Push code or open a PR - commits will be scanned for secrets.

### Dependency Updates
Create a PR with dependency changes (or let Dependabot do it).

## Sample Files

The repository includes sample files to test various workflows:
- `src/` - Sample source code
- `docs/` - Sample documentation
- Test files to trigger different workflows

## Notes

- Most workflows are disabled by default (see comments in workflow files)
- Enable specific workflows as needed for testing
- Some workflows require specific triggers (like CI failures or Dependabot PRs)

It is a test phrase
