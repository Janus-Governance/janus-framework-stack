#!/usr/bin/env bash
# ============================================================
# Janus Artifact Boundary Guard
# dev/guards/artifact-boundary-check.sh
#
# Inspects the git staging area and blocks commits that contain
# runtime artifacts or ephemeral files that must never be tracked.
#
# Usage:
#   Called automatically by .git/hooks/pre-commit
#   Can also be run manually: bash dev/guards/artifact-boundary-check.sh
#
# Exit codes:
#   0 — all clear
#   1 — forbidden artifact detected in staged files
# ============================================================

set -euo pipefail

# ── Forbidden path patterns (matched against staged file paths) ──────────────
FORBIDDEN_PATTERNS=(
  "node_modules/"
  "demos/visual-evidence/output/"
  "\.log$"
  "\.tmp$"
  "\.swp$"
  "\.aux$"
  "\.fls$"
  "\.fdb_latexmk$"
)

# ── Janus-style output helpers ───────────────────────────────────────────────
BOLD="\033[1m"
RED="\033[0;31m"
YELLOW="\033[0;33m"
RESET="\033[0m"

janus_error() {
  echo -e "${BOLD}${RED}[JANUS GUARD] ✗ ARTIFACT BOUNDARY VIOLATION${RESET}" >&2
  echo -e "${RED}$1${RESET}" >&2
}

janus_warn() {
  echo -e "${YELLOW}[JANUS GUARD] ⚠  $1${RESET}" >&2
}

janus_ok() {
  echo -e "[JANUS GUARD] ✓  $1"
}

# ── Collect staged file list ─────────────────────────────────────────────────
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)

if [ -z "$STAGED_FILES" ]; then
  janus_ok "No staged files. Nothing to check."
  exit 0
fi

# ── Run boundary checks ──────────────────────────────────────────────────────
VIOLATIONS=()

while IFS= read -r file; do
  for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
    if echo "$file" | grep -qE "$pattern"; then
      VIOLATIONS+=("  → $file  (matches: $pattern)")
      break
    fi
  done
done <<< "$STAGED_FILES"

# ── Report ───────────────────────────────────────────────────────────────────
if [ ${#VIOLATIONS[@]} -gt 0 ]; then
  janus_error "The following staged files violate the Janus artifact boundary:"
  echo "" >&2
  for v in "${VIOLATIONS[@]}"; do
    echo -e "${RED}${v}${RESET}" >&2
  done
  echo "" >&2
  echo -e "${BOLD}These files must not be committed to the repository.${RESET}" >&2
  echo -e "To remove them from the index without deleting from disk:" >&2
  echo -e "  git rm --cached <file>" >&2
  echo -e "Then add the path to .gitignore to prevent future violations." >&2
  echo "" >&2
  exit 1
fi

STAGED_COUNT=$(echo "$STAGED_FILES" | wc -l | tr -d ' ')
janus_ok "Artifact boundary check passed. ${STAGED_COUNT} staged file(s) clean."
exit 0
