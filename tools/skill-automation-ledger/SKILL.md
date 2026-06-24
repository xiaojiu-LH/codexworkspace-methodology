---
name: skill-automation-ledger
description: Generate and refresh a local HTML/JSON ledger dashboard for Codex skills and automation tasks. Use when Codex needs to inventory installed skills, classify skills by capability then source, summarize automation-index.md tasks, compare the latest snapshot with previous state, or refresh <WORKSPACE_ROOT>\shared\ledgers\skill-automation-ledger after skill or automation changes.
---

# Skill Automation Ledger

## Overview

Create or refresh a private local ledger for Codex skills and automation tasks. The script reads the workspace's authoritative ledgers, scans installed skill directories, writes a searchable HTML dashboard, writes a JSON snapshot, and compares the snapshot with the previous state.

## Quick Start

Run the bundled script from any shell that has Node.js:

```bash
node scripts/build_ledger_dashboard.js --workspace <WORKSPACE_ROOT>
```

Default outputs:

- `<WORKSPACE_ROOT>\shared\ledgers\skill-automation-ledger\latest.html`
- `<WORKSPACE_ROOT>\shared\ledgers\skill-automation-ledger\latest.json`
- `<WORKSPACE_ROOT>\shared\ledgers\skill-automation-ledger\state.json`

Use `--check` for the daily automation path. It only rewrites outputs when the source hash changed:

```bash
node scripts/build_ledger_dashboard.js --workspace <WORKSPACE_ROOT> --check
```

For fixture tests, point the scanner at temporary roots:

```bash
node scripts/build_ledger_dashboard.js --workspace <FIXTURE_ROOT> --codex-skills <FIXTURE_ROOT>\codex-skills --agents-skills <FIXTURE_ROOT>\agents-skills --automation-config-dir <FIXTURE_ROOT>\automations --output-dir <FIXTURE_ROOT>\out --json
```

## Workflow

1. Read `codex-skills-inventory.md` and `automation-index.md` as the human-maintained authority.
2. Scan installed skill directories under the current user's `.codex\skills` and `.agents\skills` roots, unless overridden by CLI flags.
3. Classify skills by capability first, then source. Read `references/category-overrides.json` before `references/category-rules.json`.
4. Generate `latest.json`, `latest.html`, and `state.json`.
5. Report the output paths and the counts for skills, automations, enabled automations, unclassified skills, and changes.

## Classification

Capability category wins over source category in the UI.

- First apply exact overrides from `references/category-overrides.json` by directory name or skill name.
- Then score rules from `references/category-rules.json` against skill name, directory, description, source group, and path.
- If no rule matches, set the capability to `未分类`.

When the dashboard shows too many `未分类` skills, update `category-overrides.json` instead of changing the script.

## Safety

- Do not read `.env`, cookies, secrets, tokens, App Secret, private keys, or browser credentials.
- Do not send the generated ledger outside the local machine unless the user explicitly approves the disclosure target and scope.
- Treat `codex-skills-inventory.md` and `automation-index.md` as the source of truth for names and notes; directory scans only fill in presence, timestamps, and resource flags.

## Automation

Use this skill in two situations:

- Immediately after installing, deleting, renaming, or adjusting a Codex skill.
- Immediately after creating, updating, pausing, restoring, or deleting a Codex automation.

A daily Codex automation can run the script with `--check` as a fallback so the ledger stays fresh even if a manual closeout forgets to refresh it.