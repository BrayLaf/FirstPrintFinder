#!/bin/bash
# Blocks `git commit` when src/ changes are staged without README.md or CLAUDE.md,
# so Claude reviews both docs first. Bypass once with DOCS_CHECKED=1 git commit ...
cmd=$(jq -r '.tool_input.command // ""')
case "$cmd" in *"git commit"*) ;; *) exit 0 ;; esac
case "$cmd" in *DOCS_CHECKED=1*) exit 0 ;; esac
staged=$(git diff --cached --name-only 2>/dev/null)
echo "$staged" | grep -q '^src/' || exit 0
echo "$staged" | grep -qE '^(README|CLAUDE)\.md$' && exit 0
echo "Docs check: src/ is staged but README.md and CLAUDE.md are not. Review both against this change (binder rules, behavior, file map, non-obvious notes, known gaps), update and stage whatever is stale, then commit again. If neither needs changes, rerun as: DOCS_CHECKED=1 git commit ..." >&2
exit 2
